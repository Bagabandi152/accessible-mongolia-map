
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, CheckCircle, Eye, Users } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      number: "1,256",
      label: "Сүүлийн 7 хоногт илгээсэн мэдээлэл",
      color: "from-blue-500 to-blue-600",
      icon: TrendingUp
    },
    {
      number: "3,847",
      label: "Сүүлийн сард шийдэгдсэн",
      color: "from-green-500 to-green-600", 
      icon: CheckCircle
    },
    {
      number: "847,658",
      label: "Нийт хяналт",
      color: "from-purple-500 to-purple-600",
      icon: Eye
    }
  ];

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-emerald-400 border-emerald-400 bg-emerald-400/10 px-6 py-2 text-lg">
            📊 Нийгмийн нөлөө
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Хамтдаа бүтээсэн үр дүн
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Та бүхний оролцоогоор хүртээмжтэй орчин бүтээхэд хүрсэн амжилт
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className={`text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.number}
                </div>
                <p className="text-gray-300 text-lg">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-2xl px-8 py-4">
            <Users className="h-8 w-8 text-emerald-400" />
            <div className="text-left">
              <div className="text-2xl font-bold text-white">
                Нэг мэдээлэл → <span className="text-emerald-400">Олон хүнд туслах</span>
              </div>
              <p className="text-gray-400">
                Таны хувь нэмэр нийгмийн том өөрчлөлтийн эхлэл
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
