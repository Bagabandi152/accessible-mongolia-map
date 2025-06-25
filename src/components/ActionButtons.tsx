import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Globe, Database, ArrowRight } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import ReportForm from "./ReportForm";
import { useEffect, useState } from "react";
import { uploadFile } from "@/services/UploadFileService";
import {
  Report,
  ReportDocName,
  useReportContext,
} from "@/contexts/ReportContext";
import Functions from "@/constants/Functions";
import { useToast } from "@/hooks/use-toast";
import MapModal from "./MapModal";

const ActionButtons = () => {
  const { toast } = useToast();
  const { getReports } = useReportContext();
  const actions = [
    {
      icon: AlertTriangle,
      title: "Саадтай орчныг мэдээлэх",
      description: "Хүртээмжгүй орчны мэдээллийг илгээх",
      variant: "default" as const,
      gradient: "from-red-600 to-red-700",
      isReport: true,
    },
    {
      icon: Globe,
      title: "Газрын зураг үзэх",
      description: "Интерактив газрын зураг дээр саадыг харах",
      variant: "outline" as const,
      gradient: "from-blue-600 to-blue-700",
    },
    {
      icon: Database,
      title: "Өгөгдөл татах / дата харах",
      description: "Нээлттэй өгөгдлийг татаж авах",
      variant: "outline" as const,
      gradient: "from-purple-600 to-purple-700",
    },
  ];

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (selectedPoint) {
      setIsFormOpen(true);
    }
  }, [selectedPoint]);

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

  const handleActionClick = (title: string) => {
    // console.log(`${title} товчлуур дарагдлаа`);
    switch (title) {
      case "Саадтай орчныг мэдээлэх": {
        // alert(
        //   "Саадын тухай мэдээлэл илгээх хэсэг удахгүй нээгдэнэ! Та энд саад бэрхшээлийн талаар мэдээлэл үлдээх боломжтой болно."
        // );
        setIsFormOpen(true);
        break;
      }
      case "Газрын зураг үзэх": {
        // alert(
        //   "Интерактив газрын зураг удахгүй нээгдэнэ! Энд та саад бэрхшээлүүдийг газрын зураг дээр харах боломжтой болно."
        // );
        setIsOpenMap(true);
        break;
      }
      case "Өгөгдөл татах / дата харах":
        alert(
          "Нээлттэй өгөгдлийн хэсэг удахгүй нээгдэнэ! Та энд бүх мэдээллийг татаж авах боломжтой болно."
        );
        break;
      default:
        break;
    }
  };

  return (
    <section
      id="action-buttons"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <Badge
            variant="outline"
            className="mb-3 sm:mb-4 text-green-600 border-green-600 px-4 py-2 text-sm sm:text-base"
          >
            ✨ Хамтдаа хүртээмжтэй хотыг бүтээе
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
            "Харж буйгаа үлдээ. Шийдэл нь эхэлнэ."
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            👉 Одоо эхлээрэй:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12 sm:mb-16">
          {actions.map((action, index) => (
            <Card
              key={index}
              className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer ${
                action.isReport ? "ring-2 ring-red-100" : ""
              }`}
            >
              <CardContent className="p-6 sm:p-8 text-center">
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-to-r ${
                    action.gradient
                  } flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 ${
                    action.isReport ? "animate-pulse" : ""
                  }`}
                >
                  <action.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3
                  className={`text-lg sm:text-xl font-semibold mb-2 sm:mb-3 ${
                    action.isReport ? "text-red-700" : "text-gray-900"
                  }`}
                >
                  {action.title}
                </h3>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                  {action.description}
                </p>
                <Button
                  variant={action.variant}
                  className={
                    action.variant === "default"
                      ? `bg-gradient-to-r ${action.gradient} hover:opacity-90 w-full sm:w-auto`
                      : `border-2 hover:bg-gradient-to-r ${action.gradient} hover:text-white hover:border-transparent w-full sm:w-auto`
                  }
                  size="lg"
                  onClick={() => handleActionClick(action.title)}
                >
                  <span className="truncate">
                    {action.isReport ? "Мэдээлэх" : "Эхлэх"}
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4 flex-shrink-0" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="text-gray-700 font-medium text-sm sm:text-base text-center">
                Хувийн мэдээлэл хамгаалагдсан
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Globe className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="text-gray-700 font-medium text-sm sm:text-base text-center">
                Нээлттэй өгөгдөл
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Database className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="text-gray-700 font-medium text-sm sm:text-base text-center">
                Нээлттэй эх
              </span>
            </div>
          </div>
        </div>
      </div>
      {isFormOpen && (
        <ReportForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleReportSubmit}
          initialLocation={
            selectedPoint ? `${selectedPoint.lat}, ${selectedPoint.lng}` : ""
          }
        />
      )}
      {/* MAP Modal */}
      {isOpenMap && (
        <MapModal
          isOpen={isOpenMap}
          onClose={() => setIsOpenMap(false)}
          onSelect={(coords) => {
            setIsOpenMap(false);
            setSelectedPoint(coords);
          }}
        />
      )}
    </section>
  );
};

export default ActionButtons;
