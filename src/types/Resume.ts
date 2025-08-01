export interface PersonalInfo {
  fullName: string;
  jobRole: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: string[];
  summary: string;
  sector?: 'IT' | 'Other';
}

export interface Project {
  id: string;
  title: string;
  techStack: string;
  description: string;
  role: string;
}