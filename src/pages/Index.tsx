
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Upload, Eye, BarChart3, Users, Building, GraduationCap, Camera, Map, Database, Shield, Cloud, Code } from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ReportSection from "@/components/ReportSection";
import StatsSection from "@/components/StatsSection";
import ActionButtons from "@/components/ActionButtons";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";

const Index = () => {
  const handleReportClick = () => {
    // Just scroll to report section, don't trigger form opening
    const reportSection = document.getElementById('report-section');
    if (reportSection) {
      reportSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavigationHeader onReportClick={handleReportClick} />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <div id="report-section">
        <ReportSection />
      </div>
      <StatsSection />
      <ActionButtons />
      <Footer />
      
      {/* Floating AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default Index;
