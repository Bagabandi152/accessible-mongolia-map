import { useState } from "react";
import Functions from "@/constants/Functions";
import { Report } from "@/contexts/ReportContext";

interface ReportStatsProps {
  weeklyReports: number;
  monthlyReports: number;
  totalReports: number;
  reports: Report[];
}

const ReportStats = (props: ReportStatsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;

  const totalPages = Math.ceil(props.reports.length / reportsPerPage);
  const startIndex = (currentPage - 1) * reportsPerPage;

  const sortedReports = [...props.reports].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  const currentReports = sortedReports.slice(
    startIndex,
    startIndex + reportsPerPage
  );

  return (
    <div className="bg-white p-6 max-w-6xl mx-auto rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: How to report a problem */}
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            Хэрхэн мэдээлэх вэ
          </h2>
          <ol className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
            <li className="flex justify-start text-left align-middle">
              <strong className="text-3xl">1</strong>
              <span className="ml-2">
                Байршил эсвэл саадтай байгаа газрын хаягийг оруулна уу
              </span>
            </li>
            <li className="text-left align-middle">
              <strong className="text-3xl">2</strong>
              <span className="ml-2">
                Саадын зургийг камераар авч оруулна уу
              </span>
            </li>
            <li className="text-left align-middle">
              <strong className="text-3xl">3</strong>
              <span className="ml-2">
                Шат, хаалга, зам гэх мэт төрлийг сонгоно уу
              </span>
            </li>
            <li className="text-left align-middle">
              <strong className="text-3xl">4</strong>
              <span className="ml-2">
                Саадын талаар дэлгэрэнгүй мэдээлэл бичнэ үү
              </span>
            </li>
            <li className="text-left align-middle">
              <strong className="text-3xl">5</strong>
              <span className="ml-2">
                Бид үүнийг холбогдох байгууллагад хүргэнэ
              </span>
            </li>
          </ol>

          <div className="border-t border-yellow-400 border-4 my-6"></div>

          <div className="flex space-x-6 text-center text-gray-900">
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                {(props.weeklyReports ?? 0).toLocaleString("en-UK")}
              </div>
              <div className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Сүүлийн 7 хоног
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                {(props.monthlyReports ?? 0).toLocaleString("en-UK")}
              </div>
              <div className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Сүүлийн сар
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                {(props.totalReports ?? 0).toLocaleString("en-UK")}
              </div>
              <div className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Нийт мэдээлэл
              </div>
            </div>
          </div>
        </div>

        {/* Right: Recently reported problems with pagination */}
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            Саяхан илгээсэн мэдээллүүд
          </h2>
          <ul className="space-y-4">
            {currentReports.map((problem, index) => (
              <li
                key={index}
                className="flex justify-between items-start space-x-4"
              >
                <div className="text-left">
                  <div className="text-gray-800 text-lg sm:text-xl leading-relaxed font-semibold">
                    {problem.description}
                  </div>
                  <div className="text-xs text-gray-500 sm:text-lg leading-relaxed italic">
                    {Functions.formatTimestamp(problem.timestamp)}
                  </div>
                </div>
                <img
                  src={problem.imageUrl}
                  alt={problem.description}
                  className="w-16 h-16 object-cover rounded"
                />
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center items-center space-x-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Өмнөх
              </button>
              <span className="text-sm text-gray-700">
                Хуудас {currentPage} / {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Дараах
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportStats;
