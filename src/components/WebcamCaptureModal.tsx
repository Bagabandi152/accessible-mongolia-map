import React, { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface WebcamCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageFile: File) => void;
}

const WebcamCaptureModal: React.FC<WebcamCaptureModalProps> = ({
  isOpen,
  onClose,
  onCapture,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        streamRef.current = stream;
      } catch (error: any) {
        console.error("Camera error:", error.name, error.message);
        toast({
          title: "Алдаа",
          description:
            error.name === "NotFoundError"
              ? "Камер олдсонгүй. Та төхөөрөмжийнхөө камерын тохиргоог шалгана уу."
              : error.name === "NotAllowedError"
              ? "Камерт хандалт олгогдоогүй байна. Та зөвшөөрөл олгоно уу."
              : "Камерт холбогдох үед алдаа гарлаа.",
          variant: "destructive",
        });
        onClose();
      }
    };

    if (isOpen) {
      startCamera();
    }

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [isOpen]);

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
          onCapture(file);
          onClose();
        }
      },
      "image/jpeg",
      0.8
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="z-[105] w-max-lg h-[95vh] my-auto p-0 bg-background flex flex-col">
        <div className="p-4">
          <DialogTitle>Зураг авах</DialogTitle>
          <DialogDescription className="mt-2">
            Та доорх камерын харагдаж буй хэсгээс зураг авч хадгалах боломжтой.
          </DialogDescription>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4 pb-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-contain rounded-md"
          />
          <div className="flex justify-between w-full gap-4 mt-4">
            <Button variant="outline" className="w-full" onClick={onClose}>
              Цуцлах
            </Button>
            <Button className="w-full" onClick={handleCapture}>
              Зураг авах
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WebcamCaptureModal;
