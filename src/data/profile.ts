export const profile = {
  name: 'Filip Veškrna',
  role: 'Full-stack .NET developer',
  location: 'Brno, Czech Republic',
  email: 'Veskrna.98@gmail.com',
  github: 'https://github.com/FVeskrna',
  linkedin: 'https://linkedin.com/in/filip-veskrna',
}

export interface Role {
  company: string
  role: string
  start: string
  end: string
  current?: boolean
  description: string
}

export const experience: Role[] = [
  {
    company: 'Kentico',
    role: 'Internal Services Developer',
    start: 'May 2026',
    end: 'Present',
    current: true,
    description:
      "Development and maintenance of the company's enterprise CRM platform on Microsoft Dynamics\u00a0365. Custom extensions and integrations with a wide range of third-party services.",
  },
  {
    company: 'Techfides',
    role: 'Full-Stack Developer',
    start: 'Jan 2026',
    end: 'Apr 2026',
    description:
      'ERP development using TypeScript and Vue.js. E2E testing with Cypress. GitLab CI/CD pipelines.',
  },
  {
    company: 'FNZ',
    role: 'Analyst Developer',
    start: 'Jan 2025',
    end: 'Dec 2025',
    description:
      '.NET REST API development and maintenance. Code reviews. Release management for major global financial clients. Primary interviewer in hiring. Mentoring via the Buddy Program.',
  },
  {
    company: 'FNZ',
    role: 'Associate Analyst Developer',
    start: 'Jul 2024',
    end: 'Dec 2024',
    description:
      'Feature development and maintenance on the .NET platform. Production incident resolution. Requirements work with analysts.',
  },
  {
    company: 'FNZ',
    role: 'Technology Solutions Graduate',
    start: 'Aug 2023',
    end: 'Jul 2024',
    description: 'Rotational graduate program across Analysis & Test, Development, and Production Support.',
  },
]

export interface Degree {
  school: string
  degree: string
  field: string
  start: string
  end: string
  note?: string
}

export const education: Degree[] = [
  {
    school: 'Brno University of Technology',
    degree: "Master's degree",
    field: 'Mechanical Engineering, Applied Computer Science and Control',
    start: '2021',
    end: '2023',
    note: 'Graduated with Red Diploma',
  },
  {
    school: 'Brno University of Technology',
    degree: "Bachelor's degree",
    field: 'Mechanical Engineering, Applied Computer Science and Control',
    start: '2018',
    end: '2021',
  },
]

export const skillGroups = [
  {
    category: 'Languages & frameworks',
    skills: ['C#', '.NET Core', 'ASP.NET', 'TypeScript', 'JavaScript', 'Vue.js', 'React', 'Python'],
  },
  {
    category: 'Tools & platforms',
    skills: ['Dynamics 365', 'Azure', 'Azure DevOps', 'GitLab', 'CI/CD', 'TeamCity', 'Docker', 'Git', 'Supabase'],
  },
  {
    category: 'Testing',
    skills: ['Unit testing', 'Integration testing', 'Cypress E2E', 'NUnit', 'xUnit'],
  },
  {
    category: 'Practice',
    skills: ['REST APIs', 'SQL', 'PostgreSQL', 'SOLID', 'Clean Architecture', 'Agile / Scrum'],
  },
]

export const certificates = [
  {
    id: 'gopas-csharp2',
    name: 'Programming with C# Language II',
    issuer: 'Počítačová škola Gopas',
    date: 'Aug 2025',
    file: 'certificates/gopas-csharp2.pdf',
  },
]
