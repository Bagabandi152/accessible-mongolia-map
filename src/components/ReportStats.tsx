import Functions from "@/constants/Functions";
import { Report } from "@/contexts/ReportContext";

interface ReportStatsRrops {
  weeklyReports: number,
  monthlyReports: number,
  totalReports: number,
  reports: Report[]
}

const ReportStats = (props: ReportStatsRrops) => {
  return (
    <div className="bg-white p-6 max-w-6xl mx-auto rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: How to report a problem */}
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Хэрхэн мэдээлэх вэ</h2>
          <ol className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
            <li className="flex justify-start text-left align-middle">
              <strong className="text-3xl">1</strong><span className="ml-2">Байршил эсвэл саадтай байгаа газрын хаягийг оруулна уу</span>
            </li>
            <li className="text-left align-middle">
              <strong className="text-3xl">2</strong><span className="ml-2">Саадын зургийг камераар авч оруулна уу</span>
            </li>
            <li className="text-left align-middle">
              <strong className="text-3xl">3</strong><span className="ml-2">Шат, хаалга, зам гэх мэт төрлийг сонгоно уу</span>
            </li>
            <li className="text-left align-middle">
              <strong className="text-3xl">4</strong><span className="ml-2">Саадын талаар дэлгэрэнгүй мэдээлэл бичнэ үү</span>
            </li>
            <li className="text-left align-middle">
              <strong className="text-3xl">5</strong><span className="ml-2">Бид үүнийг холбогдох байгууллагад хүргэнэ</span>
            </li>
          </ol>

          <div className="border-t border-yellow-400 border-4 my-6"></div>

          <div className="flex space-x-6 text-center text-gray-900">
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-4">{(props.weeklyReports ?? 0).toLocaleString("en-UK")}</div>
              <div className="text-gray-700 text-base sm:text-lg leading-relaxed">Сүүлийн 7 хоног</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-4">{(props.monthlyReports ?? 0).toLocaleString("en-UK")}</div>
              <div className="text-gray-700 text-base sm:text-lg leading-relaxed">Сүүлийн сар</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-4">{(props.totalReports ?? 0).toLocaleString("en-UK")}</div>
              <div className="text-gray-700 text-base sm:text-lg leading-relaxed">Нийт мэдээлэл</div>
            </div>
          </div>
        </div>

        {/* Right: Recently reported problems */}
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Саяхан илгээсэн мэдээллүүд</h2>
          <ul className="space-y-4">
            {props.reports?.map((problem, index) => (
              <li key={index} className="flex justify-between items-start space-x-4">
                <div className="text-left">
                  <div className="text-gray-800 text-lg sm:text-xl leading-relaxed font-semibold">
                    {problem.description}
                  </div>
                  <div className="text-xs text-gray-500 sm:text-lg leading-relaxed italic">{Functions.formatTimestamp(problem.timestamp)}</div>
                </div>
                <img
                  src={problem.imageUrl}
                  alt={problem.description}
                  className="w-16 h-16 object-cover rounded"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportStats;
