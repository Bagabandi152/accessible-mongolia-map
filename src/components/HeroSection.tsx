import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Globe,
  Sparkles,
  TrendingUp,
  CheckCircle,
  Eye,
  Plus,
} from "lucide-react";
import { useState, useEffect } from "react";
import ReportForm from "./ReportForm";
// import Map from "./Map";
import Functions from "@/constants/Functions";
import { useToast } from "@/hooks/use-toast";
import { uploadFile } from "@/services/UploadFileService";
import {
  useReportContext,
  Report,
  ReportDocName,
} from "@/contexts/ReportContext";
import MapModal from "./MapModal";
import MapLocation from "./MapLocation";
import ReportStats from "./ReportStats";

const HeroSection = () => {
  const { toast } = useToast();
  const { reports, getReports } = useReportContext();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Load reports from localStorage on component mount
  useEffect(() => {
    // const savedReports = localStorage.getItem("accessibility_reports");
    // if (savedReports) {
    //   setReports(JSON.parse(savedReports));
    // }
    getReports();
  }, []);

  const handleReportSubmit = (newReport: Report) => {
    // const updatedReports = [newReport, ...reports];
    // setReports(updatedReports);
    // localStorage.setItem(
    //   "accessibility_reports",
    //   JSON.stringify(updatedReports)
    // );
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

  const handleViewMap = () => {
    // alert("Газрын зураг удахгүй нээгдэнэ!");
    setIsOpenMap(true);
  };

  useEffect(() => {
    if (selectedPoint) {
      setIsFormOpen(true);
    }
  }, [selectedPoint]);

  // Calculate statistics
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const weeklyReports = reports.filter(
    (report) => new Date(report.timestamp) >= oneWeekAgo
  ).length;
  const monthlyReports = reports.filter(
    (report) => new Date(report.timestamp) >= oneMonthAgo
  ).length;
  const totalReports = reports.length;

  return (
    <section className="relative min-h-screen flex items-center justify-center px-0 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-cyan-50 to-violet-100 animate-pulse opacity-60"></div>

      {/* Floating Elements - hidden on mobile for better performance */}
      <div className="hidden sm:block absolute top-20 left-10 w-12 h-12 sm:w-20 sm:h-20 bg-green-200 rounded-full blur-xl opacity-30 animate-bounce"></div>
      <div className="hidden sm:block absolute bottom-32 right-16 w-20 h-20 sm:w-32 sm:h-32 bg-blue-200 rounded-full blur-2xl opacity-20 animate-pulse"></div>
      <div
        className="hidden lg:block absolute top-1/3 right-1/4 w-16 h-16 bg-purple-200 rounded-full blur-lg opacity-25 animate-bounce"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="container mx-auto text-center relative z-10 max-w-6xl">
        {/* Logo Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-8 animate-fade-in">
          <div className="relative mb-4 sm:mb-0">
            <Globe
              className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-600 sm:mr-4 animate-spin"
              style={{ animationDuration: "8s" }}
            />
            <Sparkles className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-4 w-4 sm:h-6 sm:w-6 text-yellow-500 animate-pulse" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            inclusivedata.mn
          </h1>
        </div>

        <div
          className="space-y-6 sm:space-y-8 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight px-4">
            Хүртээмжийг <span className="text-emerald-600">Хамтдаа</span> Бүтээе
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium italic max-w-4xl mx-auto px-4">
            "Саадыг харж, өгөгдөл болгож, өөрчлөлтийг эхлүүлье."
          </p>
        </div>

        {/* Statistics Cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mt-8 sm:mt-12 animate-scale-in mx-auto"
          style={{ animationDelay: "0.6s" }}
        >
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
                {weeklyReports}
              </div>
              <p className="text-gray-600 text-sm">Сүүлийн 7 хоног</p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mb-3">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
                {monthlyReports}
              </div>
              <p className="text-gray-600 text-sm">Сүүлийн сар</p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mb-3">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">
                {totalReports}
              </div>
              <p className="text-gray-600 text-sm">Нийт мэдээлэл</p>
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        <div
          className="mt-8 sm:mt-12 animate-scale-in"
          style={{ animationDelay: "0.9s" }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Мэдээлсэн байршлууд
          </h3>
          {/* <Map reports={reports} /> */}
          <MapLocation selectedMarkers={reports
            .map((report) => {
              const [latStr, lngStr] = report.location.split(",");
              const lat = parseFloat(latStr);
              const lng = parseFloat(lngStr);
              if (isNaN(lat) || isNaN(lng)) return null;
              return { coords: { lat, lng }, title: report.description };
            })
            .filter((marker): marker is { coords: { lat: number; lng: number }, title: "string" } => marker !== null)} />
        </div>

        {/* Report Statistics */}
        <div
          className="bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl p-0 max-w-5xl mx-auto border border-white/20 mt-8 sm:mt-12 animate-scale-in"
          style={{ animationDelay: "1.2s" }}
        >
          <ReportStats weeklyReports={weeklyReports} monthlyReports={monthlyReports} totalReports={totalReports} reports={reports} />
        </div>

        {/* Main Content Card */}
        <div
          className="bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 max-w-5xl mx-auto shadow-2xl border border-white/20 mt-8 sm:mt-12 animate-scale-in"
          style={{ animationDelay: "1.2s" }}
        >
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              Таны нэг алхам –{" "}
              <span className="text-emerald-600">Нэг өөрчлөлт</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
              <div className="space-y-3 sm:space-y-4">
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  Өдөр тутам өнгөрөх явган зам, шат, булан тойрох хаалт… Энэ
                  бүхэн{" "}
                  <span className="font-semibold text-emerald-600">
                    хүн бүрд
                  </span>{" "}
                  тулгардаг асуудал.
                </p>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-600">
                      Хөгжлийн бэрхшээлтэй иргэд
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-600">
                      Өндөр настай хүмүүс
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-600">
                      Та бид бүгд
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  <span className="text-emerald-600 font-bold text-lg sm:text-xl">
                    Inclusivedata.mn
                  </span>{" "}
                  бол эдгээр саадыг мэдээлэл болгон хувиргаж, нийгмийн
                  хүртээмжийн нээлттэй өгөгдлийн систем юм.
                </p>
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-emerald-100">
                  <p className="text-emerald-800 font-semibold text-center text-sm sm:text-base">
                    🌟 Таны нэг удаагийн үйлдэл олон хүнийг гэрээсээ гаргахад
                    тусална.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-8 sm:mt-12 animate-fade-in px-4 mb-4"
          style={{ animationDelay: "1.2s" }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl font-semibold rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            onClick={() => setIsFormOpen(true)}
          >
            <Plus className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
            <span className="truncate">Мэдээлэл илгээх</span>
            <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            onClick={handleViewMap}
          >
            <span className="truncate">Газрын зураг үзэх</span>
          </Button>
        </div>
        {/* Report Form Modal */}
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
      </div>
    </section>
  );
};

export default HeroSection;
