
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Computer, Eye, Users, Zap, Target } from "lucide-react";

const HowItWorksSection = () => {
  const handlePhoneReport = () => {
    alert("Утаснаасаа мэдээлэх хэсэг удахгүй нээгдэнэ! Та гар утаснаасаа саад бэрхшээлийн талаар мэдээлэл илгээх боломжтой болно.");
  };

  const handleComputerReport = () => {
    alert("Компьютерээсээ мэдээлэх хэсэг удахгүй нээгдэнэ! Та компьютерээсээ дэлгэрэнгүй мэдээлэл, баримт бичиг нэмэх боломжтой болно.");
  };

  return (
    <section id="how-it-works" className="py-24 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523000000%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22m36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse opacity-30"></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-emerald-200 rounded-full blur-2xl opacity-20 animate-bounce"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-6 text-emerald-600 border-emerald-300 bg-emerald-50 px-8 py-3 text-lg font-semibold rounded-full shadow-lg">
            📱 Хаанаас ч мэдээллээрэй
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            <span className="text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text">Хялбар</span>, 
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text"> хүртээмжтэй</span>, 
            <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text"> үр дүнтэй</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Та хүссэн газраасаа, хүссэн цагтаа саад бэрхшээлийн талаар мэдээлж болно
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
          <Card 
            className="group bg-white/80 backdrop-blur-lg shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer border-2 border-white/20 hover:border-blue-200 transform hover:scale-105 rounded-3xl overflow-hidden"
            onClick={handlePhoneReport}
          >
            <CardContent className="p-12 text-center relative">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-28 h-28 mx-auto rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-8 shadow-2xl group-hover:shadow-3xl transition-shadow duration-300 group-hover:scale-110 transform">
                  <Phone className="h-14 w-14 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors">
                  Утаснаасаа
                </h3>
                <p className="text-gray-600 text-xl leading-relaxed mb-6">
                  Гар утсны нүдээр харсан саадыг хурдан улдээж болно
                </p>
                <div className="flex items-center justify-center space-x-2 text-blue-500">
                  <Zap className="h-5 w-5" />
                  <span className="font-semibold">Хурдан & Хялбар</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="group bg-white/80 backdrop-blur-lg shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer border-2 border-white/20 hover:border-emerald-200 transform hover:scale-105 rounded-3xl overflow-hidden"
            onClick={handleComputerReport}
          >
            <CardContent className="p-12 text-center relative">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-28 h-28 mx-auto rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center mb-8 shadow-2xl group-hover:shadow-3xl transition-shadow duration-300 group-hover:scale-110 transform">
                  <Computer className="h-14 w-14 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-emerald-600 transition-colors">
                  Компьютерээсээ
                </h3>
                <p className="text-gray-600 text-xl leading-relaxed mb-6">
                  Дэлгэрэнгүй мэдээлэл, баримт бичиг нэмэх
                </p>
                <div className="flex items-center justify-center space-x-2 text-emerald-500">
                  <Target className="h-5 w-5" />
                  <span className="font-semibold">Дэлгэрэнгүй & Нарийвчилсан</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Section */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-12 md:p-16 max-w-5xl mx-auto shadow-2xl border-2 border-white/20 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/3 to-blue-500/3"></div>
          
          <div className="text-center mb-12 relative z-10">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-8 shadow-2xl animate-pulse">
              <Eye className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Нэг удаа мэдээлэхийн <span className="text-emerald-600">ач тус</span>
            </h3>
            <p className="text-gray-700 text-xl mb-8 leading-relaxed max-w-3xl mx-auto">
              Та нэг удаа мэдээлэхэд, олон хүн дахин саадтай нүүр тулахгүй байж болно.
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 shadow-inner border border-emerald-100 relative z-10">
            <div className="flex items-center justify-center space-x-4 flex-wrap">
              <Users className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl md:text-3xl font-bold text-gray-800">
                1 мэдээлэл → 
              </span>
              <span className="text-3xl md:text-4xl font-extrabold text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text">
                ∞ хүмүүст туслах
              </span>
            </div>
            <p className="text-center text-gray-600 mt-6 text-lg">
              Таны хувь нэмэр нийгмийн том өөрчлөлтийн эхлэл
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
