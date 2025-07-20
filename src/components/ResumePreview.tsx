import React from 'react';
import { ResumeData } from '../types/Resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Split skills into two columns
  const skillsColumn1 = resumeData.skills.slice(0, Math.ceil(resumeData.skills.length / 2));
  const skillsColumn2 = resumeData.skills.slice(Math.ceil(resumeData.skills.length / 2));

  return (
    <div id="resume-preview" className="bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none">
      <div className="p-3 max-w-none print:p-2">
        {/* Header - Name and Contact */}
        <div className="text-center mb-2 pb-1 border-b-2 border-black">
          <h1 className="text-xl font-bold text-black mb-0.5 leading-tight">
            {resumeData.personalInfo.fullName || 'Your Name'}
          </h1>
          {resumeData.personalInfo.jobRole && (
            <h2 className="text-sm text-black font-medium mb-1 leading-tight">
              {resumeData.personalInfo.jobRole}
            </h2>
          )}
          <div className="flex flex-wrap justify-center items-center gap-3 text-xs text-black leading-tight">
            {resumeData.personalInfo.email && (
              <span className="text-sm">{resumeData.personalInfo.email}</span>
            )}
            {resumeData.personalInfo.phone && (
              <span className="text-sm">{resumeData.personalInfo.phone}</span>
            )}
            {resumeData.personalInfo.location && (
              <span className="text-sm">{resumeData.personalInfo.location}</span>
            )}
            {resumeData.personalInfo.website && (
              <span className="text-sm text-black">
                  {resumeData.personalInfo.website.replace(/^https?:\/\//, '')}
              </span>
            )}
            {resumeData.personalInfo.linkedin && (
              <span className="text-sm text-black">
                  {resumeData.personalInfo.linkedin.replace(/^https?:\/\//, '')}
              </span>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {resumeData.summary && (
          <div className="mb-2">
            <h2 className="text-base font-bold text-black mb-1.5 border-b border-black pb-1 leading-tight">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-black leading-snug text-sm">{resumeData.summary}</p>
          </div>
        )}

        {/* Skills - Two Column Layout */}
        {resumeData.skills.length > 0 && (
          <div className="mb-2">
            <h2 className="text-base font-bold text-black mb-1.5 border-b border-black pb-1 leading-tight">
              SKILLS
            </h2>
            <div className="grid grid-cols-2 gap-1">
              <div>
                {skillsColumn1.map((skill, index) => (
                  <div key={index} className="flex items-center mb-0.5">
                    <span className="text-black mr-2">•</span>
                    <span className="text-black text-sm leading-tight">{skill}</span>
                  </div>
                ))}
              </div>
              <div>
                {skillsColumn2.map((skill, index) => (
                  <div key={index} className="flex items-center mb-0.5">
                    <span className="text-black mr-2">•</span>
                    <span className="text-black text-sm leading-tight">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Work Experience */}
        {resumeData.workExperience.length > 0 && (
          <div className="mb-2">
            <h2 className="text-base font-bold text-black mb-1.5 border-b border-black pb-1 leading-tight">
              EXPERIENCE
            </h2>
            <div className="space-y-1">
              {resumeData.workExperience.map((experience) => (
                <div key={experience.id}>
                  <div className="flex justify-between items-start mb-0">
                    <h3 className="font-bold text-black text-sm leading-tight">
                      {experience.position || 'Position Title'}
                    </h3>
                    <span className="text-sm text-black font-medium leading-tight">
                      {formatDate(experience.startDate)} - {
                        experience.isCurrentJob ? 'Present' : formatDate(experience.endDate)
                      }
                    </span>
                  </div>
                  <p className="font-bold text-black mb-0.5 text-sm leading-tight">
                    {experience.company || 'Company Name'}
                  </p>
                  {experience.description && (
                    <p className="text-black leading-snug text-sm mb-1">
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
            <h2 className="text-base font-bold text-black mb-1.5 border-b border-black pb-1 leading-tight">
              PROJECTS
            </h2>
            <div className="space-y-1">
              {resumeData.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start mb-0">
                    <h3 className="font-bold text-black text-sm leading-tight">
                      {project.title || 'Project Title'}
                    </h3>
                    <span className="text-sm text-black font-medium leading-tight">
                      {project.role || 'Role'}
                    </span>
                  </div>
                  {project.techStack && (
                    <p className="font-bold text-black mb-0.5 text-sm leading-tight">
                      Tech Stack: {project.techStack}
                    </p>
                  )}
                  {project.description && (
                    <p className="text-black leading-snug text-sm mb-1">
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
            <h2 className="text-base font-bold text-black mb-1.5 border-b border-black pb-1 leading-tight">
              EDUCATION
            </h2>
            <div className="space-y-1">
              {resumeData.education.map((education) => (
                <div key={education.id}>
                  <div className="flex justify-between items-start mb-0">
                    <h3 className="font-bold text-black text-sm leading-tight">
                      {education.degree || 'Degree'} {education.field && `in ${education.field}`}
                    </h3>
                    <span className="text-sm text-black font-medium leading-tight">
                      {formatDate(education.graduationDate)}
                    </span>
                  </div>
                  <p className="font-bold text-black mb-0 text-sm leading-tight">
                    {education.institution || 'Institution Name'}
                  </p>
                  {education.gpa && (
                    <p className="text-sm text-black leading-tight">GPA: {education.gpa}</p>
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