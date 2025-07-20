import React, { useState } from 'react';
import { useEffect } from 'react';
import { ResumeData } from './types/Resume';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { ResumePreviewColorful } from './components/ResumePreviewColorful';
import { SectorSelection } from './components/SectorSelection';
import { FileText, Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    jobRole: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: ''
  },
  workExperience: [],
  education: [],
  projects: [],
  skills: [],
  summary: '',
  sector: undefined
};

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedSector, setSelectedSector] = useState<'IT' | 'Other' | null>(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeBuilderData');
    const savedSector = localStorage.getItem('resumeBuilderSector') as 'IT' | 'Other' | null;
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setResumeData(parsedData);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
    if (savedSector) {
      setSelectedSector(savedSector);
    }
  }, []);

  // Save data to localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData));
  }, [resumeData]);

  // Save sector to localStorage whenever selectedSector changes
  useEffect(() => {
    if (selectedSector) {
      localStorage.setItem('resumeBuilderSector', selectedSector);
    }
  }, [selectedSector]);

  const updateResumeData = (updates: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...updates }));
  };

  const handleSectorSelect = (sector: 'IT' | 'Other') => {
    setSelectedSector(sector);
    setResumeData(prev => ({ ...prev, sector }));
  };

  const handleBackToSectorSelection = () => {
    setSelectedSector(null);
    localStorage.removeItem('resumeBuilderSector');
    localStorage.removeItem('resumeBuilderData');
    setResumeData(initialResumeData);
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    
    try {
      const element = document.getElementById('resume-preview');
      if (!element) {
        throw new Error('Resume preview element not found');
      }

      const opt = {
        margin: 0.3,
        filename: `${resumeData.personalInfo.fullName || 'Resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          backgroundColor: '#ffffff'
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait' 
        }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Show sector selection if no sector is selected
  if (!selectedSector) {
    return <SectorSelection onSectorSelect={handleSectorSelect} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b print:hidden no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
                <p className="text-sm text-gray-600">{selectedSector} Sector</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToSectorSelection}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Change Sector
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isDownloading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download size={18} className="mr-2" />
                    Download PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="order-2 lg:order-1 no-print">
            <div className="sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 no-print">Build Your Resume</h2>
              <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-4">
                <ResumeForm resumeData={resumeData} updateResumeData={updateResumeData} />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="order-1 lg:order-2 print:order-1">
            <div className="sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 print:hidden no-print">Live Preview</h2>
              <div className="print:shadow-none">
                {selectedSector === 'IT' ? (
                  <ResumePreview resumeData={resumeData} />
                ) : (
                  <ResumePreviewColorful resumeData={resumeData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;