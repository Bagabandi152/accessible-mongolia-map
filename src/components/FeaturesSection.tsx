
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Building, GraduationCap, BarChart3, ArrowRight, Heart } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Users,
      title: "Иргэн бүр",
      description: "хүртээмжгүй орчныг 📸 зурагтай, 🗺 байршилтай мэдээлнэ.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Building,
      title: "Төрийн байгууллага",
      description: "шинээр хүлээж авч буй барилга, орчныг 🧾 үнэлгээ хэлбэрээр бүртгэнэ.",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    {
      icon: GraduationCap,
      title: "ТББ-ууд",
      description: "хийсэн судалгаа, аудит, тайлангаа илгээж 📂 дата болгоно.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: BarChart3,
      title: "Судлаачид",
      description: "нээлттэй өгөгдөлд суурилан 📊 бодит дүн шинжилгээ хийж, нийгмийн төлөвлөлтөд хувь нэмэр оруулна.",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
      {/* Background Elements - hidden on mobile */}
      <div className="hidden sm:block absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-100 to-transparent rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="hidden sm:block absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-100 to-transparent rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <Badge variant="outline" className="mb-4 sm:mb-6 text-emerald-700 border-emerald-300 bg-emerald-50 px-4 sm:px-6 py-2 text-sm sm:text-base font-medium rounded-full">
            🧭 Юу хийдэг вэ?
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight px-4">
            Хүртээмжийн мэдээллийн 
            <span className="block text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text">
              систем
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Хүн бүрийн хүртээмжийг хамгаалах нээлттэй өгөгдлийн платформ
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`group p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 border-2 ${feature.borderColor} ${feature.bgColor} hover:scale-105 cursor-pointer relative overflow-hidden`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-3 sm:mb-4 group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>
                
                {/* Hover arrow */}
                <div className="mt-4 sm:mt-6 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-xl border border-white/20 mx-0 sm:mx-0">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 mb-2 sm:mb-0 sm:mr-3 animate-pulse" />
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center">
              Хамтдаа хүртээмжтэй орчин бүтээе
            </h3>
          </div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Таны нэг мэдээлэл олон хүний амьдралыг өөрчилж чадна
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
