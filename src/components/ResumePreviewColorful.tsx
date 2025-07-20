import React from 'react';
import { ResumeData } from '../types/Resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ResumePreviewColorfulProps {
  resumeData: ResumeData;
}

export const ResumePreviewColorful: React.FC<ResumePreviewColorfulProps> = ({ resumeData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Split skills into two columns
  const skillsColumn1 = resumeData.skills.slice(0, Math.ceil(resumeData.skills.length / 2));
  const skillsColumn2 = resumeData.skills.slice(Math.ceil(resumeData.skills.length / 2));

  return (
    <div id="resume-preview" className="bg-white shadow-2xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none">
      <div className="p-3 max-w-none print:p-2">
        {/* Header - Name and Contact with Gradient Background */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white p-2 rounded-xl mb-2 -mx-1">
          <h1 className="text-xl font-bold mb-0.5 text-center leading-tight">
            {resumeData.personalInfo.fullName || 'Your Name'}
          </h1>
          {resumeData.personalInfo.jobRole && (
            <h2 className="text-sm font-medium mb-1 text-center opacity-90 leading-tight">
              {resumeData.personalInfo.jobRole}
            </h2>
          )}
          <div className="flex flex-wrap justify-center gap-2 text-xs leading-tight">
            {resumeData.personalInfo.email && (
              <div className="bg-white/20 px-1.5 py-0.5 rounded-full">
                <span className="text-sm">{resumeData.personalInfo.email}</span>
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="bg-white/20 px-1.5 py-0.5 rounded-full">
                <span className="text-sm">{resumeData.personalInfo.phone}</span>
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="bg-white/20 px-1.5 py-0.5 rounded-full">
                <span className="text-sm">{resumeData.personalInfo.location}</span>
              </div>
            )}
            {resumeData.personalInfo.website && (
              <div className="bg-white/20 px-1.5 py-0.5 rounded-full">
                <span className="text-sm">
                  {resumeData.personalInfo.website.replace(/^https?:\/\//, '')}
                </span>
              </div>
            )}
            {resumeData.personalInfo.linkedin && (
              <div className="bg-white/20 px-1.5 py-0.5 rounded-full">
                <span className="text-sm">
                  {resumeData.personalInfo.linkedin.replace(/^https?:\/\//, '')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {resumeData.summary && (
          <div className="mb-2">
            <h2 className="text-base font-bold text-purple-600 print:text-black mb-1.5 pb-1 border-b-2 border-purple-300 print:border-black leading-tight">
              Professional Summary
            </h2>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-2 rounded-lg">
              <p className="text-gray-800 leading-snug text-sm font-medium">{resumeData.summary}</p>
            </div>
          </div>
        )}

        {/* Skills - Two Column Layout with Colors */}
        {resumeData.skills.length > 0 && (
          <div className="mb-2">
            <h2 className="text-base font-bold text-teal-600 print:text-black mb-1.5 pb-1 border-b-2 border-teal-300 print:border-black leading-tight">
              Core Skills
            </h2>
            <div className="bg-gradient-to-r from-teal-50 to-green-50 p-2 rounded-lg">
              <div className="grid grid-cols-2 gap-1">
                <div>
                  {skillsColumn1.map((skill, index) => (
                    <div key={index} className="flex items-center mb-0.5">
                      <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-green-500 rounded-full mr-3"></div>
                      <span className="text-gray-800 text-sm font-medium leading-tight">{skill}</span>
                    </div>
                  ))}
                </div>
                <div>
                  {skillsColumn2.map((skill, index) => (
                    <div key={index} className="flex items-center mb-0.5">
                      <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-green-500 rounded-full mr-3"></div>
                      <span className="text-gray-800 text-sm font-medium leading-tight">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Work Experience */}
        {resumeData.workExperience.length > 0 && (
          <div className="mb-2">
            <h2 className="text-base font-bold text-orange-600 print:text-black mb-1.5 pb-1 border-b-2 border-orange-300 print:border-black leading-tight">
              Professional Experience
            </h2>
            <div className="space-y-1">
              {resumeData.workExperience.map((experience, index) => (
                <div key={experience.id} className="bg-gradient-to-r from-orange-50 to-red-50 p-2 rounded-lg border-l-4 border-orange-400">
                  <div className="flex justify-between items-start mb-0">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight">
                      {experience.position || 'Position Title'}
                    </h3>
                    <span className="text-sm text-orange-600 font-bold bg-orange-100 px-1.5 py-0.5 rounded-full leading-tight">
                      {formatDate(experience.startDate)} - {
                        experience.isCurrentJob ? 'Present' : formatDate(experience.endDate)
                      }
                    </span>
                  </div>
                  <p className="font-bold text-orange-700 mb-0.5 text-sm leading-tight">
                    {experience.company || 'Company Name'}
                  </p>
                  {experience.description && (
                    <p className="text-gray-700 leading-snug text-sm mb-0">
                      {experience.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <div className="mb-2">
            <h2 className="text-base font-bold text-blue-600 print:text-black mb-1.5 pb-1 border-b-2 border-blue-300 print:border-black leading-tight">
              Projects
            </h2>
            <div className="space-y-1">
              {resumeData.projects.map((project) => (
                <div key={project.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-lg border-l-4 border-blue-400">
                  <div className="flex justify-between items-start mb-0">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight">
                      {project.title || 'Project Title'}
                    </h3>
                    <span className="text-sm text-blue-600 font-bold bg-blue-100 px-1.5 py-0.5 rounded-full leading-tight">
                      {project.role || 'Role'}
                    </span>
                  </div>
                  {project.techStack && (
                    <p className="font-bold text-blue-700 mb-0.5 text-sm leading-tight">
                      Tech Stack: {project.techStack}
                    </p>
                  )}
                  {project.description && (
                    <p className="text-gray-700 leading-snug text-sm mb-0">
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-2">
            <h2 className="text-base font-bold text-indigo-600 print:text-black mb-1.5 pb-1 border-b-2 border-indigo-300 print:border-black leading-tight">
              Education
            </h2>
            <div className="space-y-1">
              {resumeData.education.map((education) => (
                <div key={education.id} className="bg-gradient-to-r from-indigo-50 to-purple-50 p-2 rounded-lg border-l-4 border-indigo-400">
                  <div className="flex justify-between items-start mb-0">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight">
                      {education.degree || 'Degree'} {education.field && `in ${education.field}`}
                    </h3>
                    <span className="text-sm text-indigo-600 font-bold bg-indigo-100 px-1.5 py-0.5 rounded-full leading-tight">
                      {formatDate(education.graduationDate)}
                    </span>
                  </div>
                  <p className="font-bold text-indigo-700 mb-0 text-sm leading-tight">
                    {education.institution || 'Institution Name'}
                  </p>
                  {education.gpa && (
                    <p className="text-sm text-gray-700 font-medium leading-tight">GPA: {education.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};