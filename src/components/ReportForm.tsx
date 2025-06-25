import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, X, Camera, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (report: any) => void;
  initialLocation?: string;
}

const ReportForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialLocation = "",
}: ReportFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    location: initialLocation,
    type: "",
    description: "",
    contactInfo: "",
    image: null as File | null,
  });
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleImageCapture = async () => {
    try {
      setIsCapturing(true);

      // Get location permission first
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setFormData((prev) => ({
              ...prev,
              location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            }));
          },
          (error) => {
            console.warn("Location permission denied:", error);
          }
        );
      }

      // Capture image
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();

      video.onloadedmetadata = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(video, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], "photo.jpg", {
                type: "image/jpeg",
              });
              setFormData((prev) => ({ ...prev, image: file }));
              setImagePreview(URL.createObjectURL(file));
            }
          },
          "image/jpeg",
          0.8
        );

        // Stop camera
        stream.getTracks().forEach((track) => track.stop());
        setIsCapturing(false);
      };
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Алдаа",
        description: "Камер ашиглахад алдаа гарлаа",
        variant: "destructive",
      });
      setIsCapturing(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.location ||
      !formData.type ||
      !formData.description
    ) {
      toast({
        title: "Алдаа",
        description: "Заавал бөглөх талбаруудыг бөглөнө үү",
        variant: "destructive",
      });
      return;
    }

    const newReport = {
      id: Date.now().toString(),
      ...formData,
      timestamp: new Date().toISOString(),
      status: "шинэ",
      imageUrl: imagePreview, // In a real app, you'd upload to a server
    };

    onSubmit(newReport);
    setFormData({
      title: "",
      location: "",
      type: "",
      description: "",
      contactInfo: "",
      image: null,
    });
    setImagePreview(null);
    onClose();

    toast({
      title: "Амжилттай",
      description: "Таны мэдээлэл амжилттай илгээгдлээ",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <CardTitle className="text-xl font-bold">
            Саадтай орчныг мэдээлэх
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Гарчиг *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="жишээ: Шатанд тусгай хэрэгцээт хүнд зориулсан налуу байхгүй"
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Байршил * </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="жишээ: Сүхбаатарын талбай, 1-р хороо"
                required
              />
            </div>

            <div>
              <Label htmlFor="type">Саадын төрөл *</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                required
              >
                <option value="">Сонгоно уу</option>
                <option value="шат">Шат</option>
                <option value="хаалга">Хаалга</option>
                <option value="зам">Зам</option>
                <option value="гэрэлтүүлэг">Гэрэлтүүлэг</option>
                <option value="тэмдэг_тэмдэглэгээ">Тэмдэг тэмдэглэгээ</option>
                <option value="бусад">Бусад</option>
              </select>
            </div>

            {/* Image Section */}
            <div>
              <Label>Зураг</Label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleImageCapture}
                    disabled={isCapturing}
                    className="flex-1"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    {isCapturing ? "Зураг авч байна..." : "Зураг авах"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById("image-upload")?.click()
                    }
                    className="flex-1"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Зураг оруулах
                  </Button>
                </div>

                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-md border"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={removeImage}
                      className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="description">Дэлгэрэнгүй тайлбар *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Саадын талаар дэлгэрэнгүй мэдээлэл оруулна уу..."
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="contactInfo">Холбоо барих мэдээлэл</Label>
              <Input
                id="contactInfo"
                value={formData.contactInfo}
                onChange={(e) =>
                  setFormData({ ...formData, contactInfo: e.target.value })
                }
                placeholder="Утасны дугаар эсвэл имэйл (заавал биш)"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Цуцлах
              </Button>
              <Button type="submit" className="flex-1">
                <Send className="mr-2 h-4 w-4" />
                Илгээх
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportForm;
