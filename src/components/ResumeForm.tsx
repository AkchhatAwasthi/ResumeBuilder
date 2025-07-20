import React from 'react';
import { Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { ResumeData, WorkExperience, Education, Project } from '../types/Resume';
import { FormSection } from './FormSection';
import { getSkillsFromAI, generateSummaryFromAI } from '../services/geminiApi';

interface ResumeFormProps {
  resumeData: ResumeData;
  updateResumeData: (data: Partial<ResumeData>) => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, updateResumeData }) => {
  const [isGeneratingSkills, setIsGeneratingSkills] = React.useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = React.useState(false);
  const [summaryKeyPoints, setSummaryKeyPoints] = React.useState('');
  const [skillsError, setSkillsError] = React.useState('');
  const [summaryError, setSummaryError] = React.useState('');

  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      description: ''
    };
    updateResumeData({
      workExperience: [...resumeData.workExperience, newExperience]
    });
  };

  const removeWorkExperience = (id: string) => {
    updateResumeData({
      workExperience: resumeData.workExperience.filter(exp => exp.id !== id)
    });
  };

  const updateWorkExperience = (id: string, updates: Partial<WorkExperience>) => {
    updateResumeData({
      workExperience: resumeData.workExperience.map(exp =>
        exp.id === id ? { ...exp, ...updates } : exp
      )
    });
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      graduationDate: '',
      gpa: ''
    };
    updateResumeData({
      education: [...resumeData.education, newEducation]
    });
  };

  const removeEducation = (id: string) => {
    updateResumeData({
      education: resumeData.education.filter(edu => edu.id !== id)
    });
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    updateResumeData({
      education: resumeData.education.map(edu =>
        edu.id === id ? { ...edu, ...updates } : edu
      )
    });
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      techStack: '',
      description: '',
      role: ''
    };
    updateResumeData({
      projects: [...resumeData.projects, newProject]
    });
  };

  const removeProject = (id: string) => {
    updateResumeData({
      projects: resumeData.projects.filter(project => project.id !== id)
    });
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    updateResumeData({
      projects: resumeData.projects.map(project =>
        project.id === id ? { ...project, ...updates } : project
      )
    });
  };

  const updateSkills = (skillsString: string) => {
    const skills = skillsString.split(',').map(skill => skill.trim()).filter(skill => skill);
    updateResumeData({ skills });
  };

  const handleGenerateSkills = async () => {
    if (!resumeData.personalInfo.jobRole.trim()) {
      setSkillsError('Please enter a job role first');
      return;
    }

    setIsGeneratingSkills(true);
    setSkillsError('');

    try {
      const aiSkills = await getSkillsFromAI(resumeData.personalInfo.jobRole);
      // Add AI skills to existing skills, avoiding duplicates
      const existingSkills = resumeData.skills;
      const newSkills = aiSkills.filter(skill => 
        !existingSkills.some(existing => 
          existing.toLowerCase() === skill.toLowerCase()
        )
      );
      const combinedSkills = [...existingSkills, ...newSkills];
      updateResumeData({ skills: combinedSkills });
    } catch (error) {
      setSkillsError(error instanceof Error ? error.message : 'Failed to generate skills');
    } finally {
      setIsGeneratingSkills(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (!summaryKeyPoints.trim()) {
      setSummaryError('Please enter some key points first');
      return;
    }

    setIsGeneratingSummary(true);
    setSummaryError('');

    try {
      const aiSummary = await generateSummaryFromAI(summaryKeyPoints);
      updateResumeData({ summary: aiSummary });
      setSummaryKeyPoints('');
    } catch (error) {
      setSummaryError(error instanceof Error ? error.message : 'Failed to generate summary');
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <FormSection title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={resumeData.personalInfo.fullName}
              onChange={(e) => updateResumeData({
                personalInfo: { ...resumeData.personalInfo, fullName: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
            <input
              type="text"
              value={resumeData.personalInfo.jobRole}
              onChange={(e) => updateResumeData({
                personalInfo: { ...resumeData.personalInfo, jobRole: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Software Developer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={resumeData.personalInfo.email}
              onChange={(e) => updateResumeData({
                personalInfo: { ...resumeData.personalInfo, email: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={resumeData.personalInfo.phone}
              onChange={(e) => updateResumeData({
                personalInfo: { ...resumeData.personalInfo, phone: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={resumeData.personalInfo.location}
              onChange={(e) => updateResumeData({
                personalInfo: { ...resumeData.personalInfo, location: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="New York, NY"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="url"
              value={resumeData.personalInfo.website || ''}
              onChange={(e) => updateResumeData({
                personalInfo: { ...resumeData.personalInfo, website: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://johndoe.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
            <input
              type="url"
              value={resumeData.personalInfo.linkedin || ''}
              onChange={(e) => updateResumeData({
                personalInfo: { ...resumeData.personalInfo, linkedin: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>
        </div>
      </FormSection>

      {/* Professional Summary */}
      <FormSection title="Professional Summary">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key Points for AI Generation
            </label>
            <textarea
              value={summaryKeyPoints}
              onChange={(e) => setSummaryKeyPoints(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter key points about yourself: name, education, experience, achievements, skills, etc."
            />
            <div className="flex items-center justify-between mt-2">
              <button
                onClick={handleGenerateSummary}
                disabled={isGeneratingSummary || !summaryKeyPoints.trim()}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium text-sm"
              >
                {isGeneratingSummary ? (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                ) : (
                  <Sparkles size={16} className="mr-2" />
                )}
                Generate with AI
              </button>
              {summaryError && (
                <span className="text-red-500 text-sm">{summaryError}</span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Professional Summary
            </label>
        <textarea
          value={resumeData.summary}
          onChange={(e) => updateResumeData({ summary: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Write a brief summary of your professional background and key achievements..."
        />
          </div>
        </div>
      </FormSection>

      {/* Work Experience */}
      <FormSection title="Work Experience">
        <div className="space-y-6">
          {resumeData.workExperience.map((experience) => (
            <div key={experience.id} className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-gray-900">Experience Entry</h4>
                <button
                  onClick={() => removeWorkExperience(experience.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={experience.company}
                    onChange={(e) => updateWorkExperience(experience.id, { company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    value={experience.position}
                    onChange={(e) => updateWorkExperience(experience.id, { position: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Job Title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateWorkExperience(experience.id, { startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateWorkExperience(experience.id, { endDate: e.target.value })}
                    disabled={experience.isCurrentJob}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  />
                  <div className="mt-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={experience.isCurrentJob}
                        onChange={(e) => updateWorkExperience(experience.id, { 
                          isCurrentJob: e.target.checked,
                          endDate: e.target.checked ? '' : experience.endDate
                        })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-600">Current Job</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={experience.description}
                  onChange={(e) => updateWorkExperience(experience.id, { description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>
            </div>
          ))}
          <button
            onClick={addWorkExperience}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <Plus size={16} className="mr-1" />
            Add Work Experience
          </button>
        </div>
      </FormSection>

      {/* Education */}
      <FormSection title="Education">
        <div className="space-y-6">
          {resumeData.education.map((education) => (
            <div key={education.id} className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-gray-900">Education Entry</h4>
                <button
                  onClick={() => removeEducation(education.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                  <input
                    type="text"
                    value={education.institution}
                    onChange={(e) => updateEducation(education.id, { institution: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="University Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                  <input
                    type="text"
                    value={education.degree}
                    onChange={(e) => updateEducation(education.id, { degree: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Bachelor of Science"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                  <input
                    type="text"
                    value={education.field}
                    onChange={(e) => updateEducation(education.id, { field: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Computer Science"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Date</label>
                  <input
                    type="month"
                    value={education.graduationDate}
                    onChange={(e) => updateEducation(education.id, { graduationDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">GPA (Optional)</label>
                <input
                  type="text"
                  value={education.gpa || ''}
                  onChange={(e) => updateEducation(education.id, { gpa: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3.8/4.0"
                />
              </div>
            </div>
          ))}
          <button
            onClick={addEducation}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <Plus size={16} className="mr-1" />
            Add Education
          </button>
        </div>
      </FormSection>

      {/* Projects */}
      <FormSection title="Projects">
        <div className="space-y-6">
          {resumeData.projects.map((project) => (
            <div key={project.id} className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-gray-900">Project Entry</h4>
                <button
                  onClick={() => removeProject(project.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => updateProject(project.id, { title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="E-commerce Website"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack</label>
                  <input
                    type="text"
                    value={project.techStack}
                    onChange={(e) => updateProject(project.id, { techStack: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Role</label>
                  <input
                    type="text"
                    value={project.role}
                    onChange={(e) => updateProject(project.id, { role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Full Stack Developer"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, { description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Developed a full-stack e-commerce platform with user authentication, payment integration, and admin dashboard. Implemented responsive design and optimized for performance."
                />
              </div>
            </div>
          ))}
          <button
            onClick={addProject}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <Plus size={16} className="mr-1" />
            Add Project
          </button>
        </div>
      </FormSection>

      {/* Skills */}
      <FormSection title="Skills">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills (comma-separated)
          </label>
          <div className="space-y-3">
            <div className="flex gap-2">
          <textarea
            value={resumeData.skills.join(', ')}
            onChange={(e) => updateSkills(e.target.value)}
            rows={3}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="JavaScript, React, Node.js, TypeScript, Python, SQL"
          />
              <button
                onClick={handleGenerateSkills}
                disabled={isGeneratingSkills || !resumeData.personalInfo.jobRole.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium whitespace-nowrap"
              >
                {isGeneratingSkills ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <Sparkles size={16} className="mr-1 inline" />
                    Ask AI
                  </>
                )}
              </button>
            </div>
            {skillsError && (
              <p className="text-red-500 text-sm">{skillsError}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => {
                      const newSkills = resumeData.skills.filter((_, i) => i !== index);
                      updateResumeData({ skills: newSkills });
                    }}
                    className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Add skills in the text area above or use "Ask AI" to generate skills based on your job role. Click the × to remove individual skills.
          </p>
        </div>
      </FormSection>
    </div>
  );
};