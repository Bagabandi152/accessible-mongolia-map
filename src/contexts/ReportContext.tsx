import Functions from "@/constants/Functions";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Report {
  id: string;
  location: string;
  type: string;
  description: string;
  contactInfo?: string;
  timestamp: string;
  status: string;
  image: File;
  imageUrl: string;
}

// 🔧 Add getReports to context type
interface ReportContextType {
  reports: Report[];
  setReports: React.Dispatch<React.SetStateAction<Report[]>>;
  getReports: () => void;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const ReportDocName = "aam_report";

export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [reports, setReports] = useState<Report[]>([]);

  const getReports = () => {
    Functions.index(ReportDocName)
      .then((res) => {
        const reportsTyped = res.map((d) => ({
          ...d,
        })) as Report[];
        setReports(reportsTyped);
      })
      .catch((err) => {
        console.error("Error fetching reports:", err);
      });
  };

  return (
    <ReportContext.Provider value={{ reports, setReports, getReports }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = (): ReportContextType => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReportContext must be used within a ReportProvider");
  }
  return context;
};
