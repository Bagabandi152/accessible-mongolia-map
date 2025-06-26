import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Navigation, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import ReportForm from "./ReportForm";
import ReportsList from "./ReportsList";
import { uploadFile } from "../services/UploadFileService";
import Functions from "../constants/Functions";
import { useToast } from "@/hooks/use-toast";
import {
  useReportContext,
  Report,
  ReportDocName,
} from "@/contexts/ReportContext";

interface ReportSectionProps {
  triggerFormOpen?: boolean;
  onFormOpenHandled?: () => void;
}

const ReportSection = ({
  triggerFormOpen,
  onFormOpenHandled,
}: ReportSectionProps) => {
  const { toast } = useToast();
  const { reports, getReports } = useReportContext();

  const [location, setLocation] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Handle external trigger to open form
  useEffect(() => {
    if (triggerFormOpen) {
      setIsFormOpen(true);
      if (onFormOpenHandled) {
        onFormOpenHandled();
      }
    }
  }, [triggerFormOpen, onFormOpenHandled]);

  // Load reports from localStorage on component mount
  useEffect(() => {
    // const savedReports = localStorage.getItem("accessibility_reports");
    // if (savedReports) {
    //   setReports(JSON.parse(savedReports));
    // }
    getReports();
  }, []);

  // Save reports to localStorage whenever reports change
  useEffect(() => {
    localStorage.setItem("accessibility_reports", JSON.stringify(reports));
  }, [reports]);

  const handleLocationSearch = () => {
    if (location.trim()) {
      setIsFormOpen(true);
    } else {
      alert("Байршил оруулна уу!");
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationString = `${latitude.toFixed(6)}, ${longitude.toFixed(
            6
          )}`;
          setLocation(locationString);
        },
        (error) => {
          alert("Байршил авахад алдаа гарлаа. Гар аар байршил оруулна уу.");
        }
      );
    } else {
      alert("Таны хөтөч байршил авах боломжийг дэмжихгүй байна.");
    }
  };

  const handleDirectReport = () => {
    setIsFormOpen(true);
  };

  const handleReportSubmit = (newReport: Report) => {
    // setReports((prev) => [newReport, ...prev]);
    uploadFile({
      file: newReport.image,
      path: `${ReportDocName}_file/`,
      // onProgress: (percent) => {},
      onFinish: (url) => {
        newReport.image = null;
        newReport.imageUrl = url;
        Functions.store(ReportDocName, newReport)
          .then((res) => {
            toast({
              title: "Амжилттай",
              description: "Таны мэдээлэл амжилттай илгээгдлээ",
            });
            getReports();
          })
          .catch((err) => {
            console.error(err);
          });
      },
    });
  };

  const recentReports = reports.slice(0, 3);

  return (
    <section className="py-16 sm:py-20 px-4 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Саадтай орчныг мэдээлэх
          </h2>
          <p className="text-xl text-white/90 mb-2">
            (явган зам, шат, хаалга, гэрэлтүүлэг гэх мэт)
          </p>
        </div>

        {/* Location Input Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2 text-lg">
              Ойр орчмын хаяг эсвэл байршлыг оруулна уу:
            </label>
            <p className="text-white/80 mb-4">
              жишээ нь: "Улаанбаатар хот, 1-р хороо" эсвэл "Сүхбаатарын талбай"
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Хаяг эсвэл байршил оруулах..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-12 text-lg bg-white border-2 border-white/20 focus:border-white"
              />
            </div>
            <Button
              onClick={handleLocationSearch}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 h-12 text-lg font-semibold"
            >
              <Search className="mr-2 h-5 w-5" />
              Мэдээлэх
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleCurrentLocation}
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-yellow-600 px-6 py-3 h-12 text-lg font-semibold text-sm sm:text-sm md:text-base"
            >
              <Navigation className="mr-2 h-5 w-5" />
              Миний одоогийн байршлыг ашиглах
            </Button>

            <Button
              onClick={handleDirectReport}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 h-12 text-lg font-semibold"
            >
              <Plus className="mr-2 h-5 w-5" />
              Шууд мэдээлэх
            </Button>
          </div>
        </div>

        {/* How to Report Steps and Recent Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Хэрхэн мэдээлэх вэ
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Байршил оруулах
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Саадтай байгаа газрын хаягийг оруулна уу
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Зураг авах
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Саадын зургийг камераар авч оруулна уу
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Саадын төрлийг сонгох
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Шат, хаалга, зам гэх мэт төрлийг сонгоно уу
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Дэлгэрэнгүй тайлбар
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Саадын талаар дэлгэрэнгүй мэдээлэл бичнэ үү
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Илгээх</h4>
                    <p className="text-gray-600 text-sm">
                      Бид үүнийг холбогдох байгууллагад хүргэнэ
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Саяхан илгээсэн мэдээллүүд
                </h3>
                <Badge
                  variant="outline"
                  className="text-yellow-600 border-yellow-600"
                >
                  {reports.length} нийт
                </Badge>
              </div>

              <ReportsList reports={recentReports} />

              {reports.length > 3 && (
                <div className="mt-4 text-center">
                  <Badge variant="secondary">
                    +{reports.length - 3} илүү мэдээлэл бий
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Report Form Modal */}
        {isFormOpen && (
          <ReportForm
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSubmit={handleReportSubmit}
            initialLocation={location}
          />
        )}
      </div>
    </section>
  );
};

export default ReportSection;
