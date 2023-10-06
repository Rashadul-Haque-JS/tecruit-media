export const jobList = [
    {
      jobTitle: 'Software Engineer',
      category: 'data/IT',
      company: 'Acme Inc.',
      country: 'finland',
      city: 'helsinki',
      description: 'We are looking for a talented software engineer to join our team...We are looking for a talented software engineer to join our team...We are looking for a talented software engineer to join our team...We are  looking for a talented software engineer to join our team...',
      level: 'Senior',
      type: ['onsite', 'remote'],
      published_on: '2023-10-05',
      last_date: '2023-11-05',
      email_applications: true,
      email_to_applications: 'jobs@acmeinc.com',
      application_url: 'https://acmeinc.com/careers/software-engineer',
      jobId:11
    },
    {
      jobTitle: 'Data Analyst',
      category: 'data/IT',
      company: 'TechCorp',
      country: 'denmark',
      city: 'copenhagen',
      description: 'TechCorp is seeking a data analyst to work on cutting-edge data projects...',
      level: 'Intermediate',
      type: ['onsite'],
      published_on: '2023-09-15',
      last_date: '2023-11-10',
      email_applications: true,
      email_to_applications: 'jobs@techcorp.com',
      application_url: 'https://techcorp.com/careers/data-analyst',
      jobId:12
    },
    {
      jobTitle: 'Marketing Analysis',
      category: 'marketing',
      company: 'Globex Marketing',
      country: 'sweden',
      city: 'stockholm',
      description: 'Join our marketing team and lead innovative marketing campaigns...',
      level: 'Manager',
      type: ['onsite', 'hybrid'],
      published_on: '2023-09-30',
      last_date: '2023-11-15',
      email_applications: true,
      email_to_applications: 'jobs@globexmarketing.com',
      application_url: 'https://globexmarketing.co.uk/careers/marketing-manager',
      jobId:13
    },
    {
      jobTitle: 'Marketing Manager',
      category: 'marketing',
      company: 'Globex Marketing',
      country: 'sweden',
      city: 'gothenburg',
      description: 'Join our marketing team and lead innovative marketing campaigns...',
      level: 'Manager',
      type: ['onsite', 'hybrid'],
      published_on: '2023-10-01',
      last_date: '2023-11-15',
      email_applications: true,
      email_to_applications: 'jobs@globexmarketing.com',
      application_url: 'https://globexmarketing.co.uk/careers/marketing-manager',
      jobId:18
    },
    {
      jobTitle: 'Financial Analyst',
      category: 'Finance',
      company: 'FinanceX Inc.',
      country: 'norway',
      city: 'oslo',
      description: 'FinanceX is looking for a financial analyst to analyze financial data...',
      level: 'Junior',
      type: ['remote'],
      published_on: '2023-09-20',
      last_date: '2023-11-20',
      email_applications: true,
      email_to_applications: 'jobs@financex.com',
      application_url: 'https://financexinc.com/careers/financial-analyst',
      jobId:14
    },
  ];
  
  export const jobCategories = [
    { value: "data/IT", label: "Data/IT" },
    { value: "finance", label: "Finance" },
    { value: "marketing", label: "Marketing" },
    // Add more job categories here
  ];

 export const countries = [
    { countryId: 1, value: "sweden", label: "Sweden" },
    { countryId: 2, value: "denmark", label: "Denmark" },
    { countryId: 3, value: "norway", label: "Norway" },
    { countryId: 4, value: "finland", label: "Finland" },
  ];
  
  export const cities = [
    { countryId: 1, mainCities: [{ label: "Stockholm", value: 'stockholm' }, { label: "Gothenburg", value: 'gothenburg' }, { label: "Malmö", value: 'malmo' }, { label: "Uppsala", value: 'uppsala' }] },
    { countryId: 2, mainCities: [{ label: "Copenhagen", value: 'copenhagen' }, { label: "Aarhus", value: 'aarhus' }, { label: "Odense", value: 'odense' }, { label: "Aalborg", value: 'aalborg' }] },
    { countryId: 3, mainCities: [{ label: "Oslo", value: 'oslo' }, { label: "Bergen", value: 'bergen' }, { label: "Trondheim", value: 'trondheim' }, { label: "Stavanger", value: 'stavanger' }] },
    { countryId: 4, mainCities: [{ label: "Helsinki", value: 'helsinki' }, { label: "Espoo", value: 'espoo' }, { label: "Tampere", value: 'tampere' }, { label: "Vantaa", value: 'vantaa' }] },
  ];
  
  

  export const jobTypes = [
    {id:'jt1', value: "onsite", label: "Onsite" },
    {id:'jt2', value: "remote", label: "Remote" },
    {id:'jt3', value: "hybrid", label: "Hybrid" },
  ];
  export const published_date = [
    {id:'pd1', value: "new", label: "Newest" },
    {id:'pd2', value: "old", label: "Oldest" },
  ];
  