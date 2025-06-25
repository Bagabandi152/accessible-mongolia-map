
import { Badge } from "@/components/ui/badge";
import { Heart, Globe, Users } from "lucide-react";

const Footer = () => {
  return (
    <footer id="about" className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements - simplified for mobile */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22m36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      <div className="hidden sm:block absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl"></div>
      <div className="hidden sm:block absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <Badge variant="outline" className="mb-6 sm:mb-8 text-emerald-400 border-emerald-400 bg-emerald-400/10 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold rounded-full backdrop-blur-sm">
            ✨ Хамтдаа хүртээмжтэй хотыг бүтээе
          </Badge>
          
          <div className="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-8">
            <Globe className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-400 mb-4 sm:mb-0 sm:mr-4 animate-spin" style={{animationDuration: '10s'}} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-0 bg-gradient-to-r from-white via-emerald-200 to-blue-200 bg-clip-text text-transparent leading-tight text-center">
              "Харж буйгаа үлдээ. Шийдэл нь эхэлнэ."
            </h2>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main content */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-12 mb-8 sm:mb-12 border border-white/10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4">
                  <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-red-400 animate-pulse flex-shrink-0" />
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center sm:text-left">
                    inclusivedata.mn
                  </h3>
                </div>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed text-center sm:text-left">
                  Хүн бүрийн хүртээмжийн эрхийг бодит өгөгдлөөр хамгаалах нээлттэй мэдээллийн систем.
                </p>
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400 flex-shrink-0" />
                  <span className="text-emerald-200 font-semibold text-center sm:text-left">
                    Хүн бүрийн асуудал - Хүн бүрийн шийдэл
                  </span>
                </div>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 text-center sm:text-left">
                  Хэнд зориулсан вэ?
                </h4>
                <div className="space-y-2 sm:space-y-3 text-gray-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base">Тэргэнцэртэй иргэд</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base">Өндөр настай хүмүүс</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base">Хүүхэд тэврэсэн эцэг эхчүүд</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base">Харааны бэрхшээлтэй иргэд</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base">Бүх иргэд</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom section */}
          <div className="border-t border-gray-700/50 pt-8 sm:pt-12">
            <div className="text-center">
              <p className="text-gray-400 text-base sm:text-lg mb-3 sm:mb-4">
                © 2025 Inclusivedata.mn
              </p>
              <p className="text-emerald-300 font-semibold text-lg sm:text-xl px-4">
                Хүн бүрийн хүртээмжийн эрхийг бодит өгөгдлөөр хамгаалъя
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
