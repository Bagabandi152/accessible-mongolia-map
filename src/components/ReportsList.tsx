
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";

interface Report {
  id: string;
  title?: string;
  location: string;
  type: string;
  description: string;
  contactInfo?: string;
  timestamp: string;
  status: string;
  imageUrl?: string;
}

interface ReportsListProps {
  reports: Report[];
}

const ReportsList = ({ reports }: ReportsListProps) => {
  if (reports.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Одоогоор мэдээлэл байхгүй байна</p>
      </div>
    );
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('mn-MN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'шинэ':
        return 'bg-blue-100 text-blue-800';
      case 'шийдэгдсэн':
        return 'bg-green-100 text-green-800';
      case 'хүлээгдэж_байна':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div key={report.id} className="border rounded-lg p-4 bg-white shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              {report.title && (
                <h4 className="font-semibold text-gray-800 mb-1">{report.title}</h4>
              )}
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="truncate">{report.location}</span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                <span>{formatDate(report.timestamp)}</span>
              </div>
            </div>
            <Badge className={getStatusColor(report.status)} variant="secondary">
              {report.status}
            </Badge>
          </div>
          
          {report.imageUrl && (
            <div className="mb-3">
              <img
                src={report.imageUrl}
                alt="Report"
                className="w-full h-32 object-cover rounded-md border"
              />
            </div>
          )}
          
          <div className="mb-2">
            <Badge variant="outline" className="text-xs">
              {report.type}
            </Badge>
          </div>
          
          <p className="text-sm text-gray-700 line-clamp-2">{report.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ReportsList;
