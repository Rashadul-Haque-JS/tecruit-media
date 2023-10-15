export const jobList = [
    {
      jobTitle: 'Software Engineer',
      category: 'data/IT',
      company: 'Acme Inc.',
      country: 'finland',
      city: 'helsinki',
      description: 'We are looking for a talented software engineer to join our team...We are looking for a talented software engineer to join our team...We are looking for a talented software engineer to join our team...We are  looking for a talented software engineer to join our team...',
      position: 'entry',
      workTime:'full',
      type: ['onsite', 'hybrid'],
      published_on: '2023-10-05',
      last_date: '2023-11-05',
      application_options:'onlineForm',
      email_to_applications: '',
      application_url: 'https://acmeinc.com/careers/software-engineer',
      _id:11
    },
    {
      jobTitle: 'Data Analyst',
      category: 'data/IT',
      company: 'TechCorp',
      country: 'denmark',
      city: 'copenhagen',
      description: 'TechCorp is seeking a data analyst to work on cutting-edge data projects...',
      position: 'intermediate',
      workTime:'full',
      type: ['onsite'],
      published_on: '2023-09-15',
      last_date: '2023-11-10',
      application_options:'email',
      email_to_applications: 'jobs@techcorp.com',
      application_url: '',
      _id:12
    },
    {
      jobTitle: 'System Administrator',
      category: 'data/IT',
      company: 'Globex Marketing',
      country: 'sweden',
      city: 'stockholm',
      description: 'Join our marketing team and lead innovative marketing campaigns...',
      position: 'senior',
      workTime:'part',
      type: ['onsite', 'hybrid'],
      published_on: '2023-09-30',
      last_date: '2023-11-15',
      applicationOptions:'email',
      email_to_applications: '',
      application_url: 'https://globexmarketing.co.uk/careers/marketing-manager',
      _id:13
    },
    {
      jobTitle: 'Backend Developer',
      category: 'data/IT',
      company: 'Globex Marketing',
      country: 'sweden',
      city: 'gothenburg',
      description: 'Join our marketing team and lead innovative marketing campaigns...',
      position: 'senior',
      workTime:'part',
      type: ['onsite', 'hybrid'],
      published_on: '2023-10-01',
      last_date: '2023-11-15',
      application_options:'onlineForm',
      email_to_applications: '',
      application_url: 'https://globexmarketing.co.uk/careers/marketing-manager',
      _id:18
    },
    {
      jobTitle: 'Fullstack Developer',
      category: 'data/IT',
      company: 'FinanceX Inc.',
      country: 'norway',
      city: 'oslo',
      description: 'FinanceX is looking for a financial analyst to analyze financial data...',
      position: 'entry',
      workTime:'full',
      type: ['remote'],
      published_on: '2023-09-20',
      last_date: '2023-11-20',
      application_options:'email',
      email_to_applications: 'mrhaque179@gmail.com',
      application_url: '',
      _id:14
    },
    {
      jobTitle: 'Frontend Developer',
      category: 'data/IT',
      company: 'FinanceX Inc.',
      country: 'norway',
      city: 'oslo',
      description: 'FinanceX is looking for a financial analyst to analyze financial data...',
      position: 'internship',
      workTime:'full',
      type: ['remote'],
      published_on: '2023-09-20',
      last_date: '2023-11-20',
      application_options:'onlineForm',
      email_to_applications: '',
      application_url: 'https://financexinc.com/careers/financial-analyst',
      _id:19
    },
  ];
  

 export const countries = [
    { countryId: 1, value: "sweden", label: "Sweden" },
    { countryId: 2, value: "denmark", label: "Denmark" },
    { countryId: 3, value: "norway", label: "Norway" },
    { countryId: 4, value: "finland", label: "Finland" },
  ];
  
  export const cities = [
    { countryId: 1,name:'sweden', mainCities: [{ label: "Stockholm", value: 'stockholm' }, { label: "Gothenburg", value: 'gothenburg' }, { label: "Malmö", value: 'malmo' }, { label: "Uppsala", value: 'uppsala' }] },
    { countryId: 2,name:'denmark', mainCities: [{ label: "Copenhagen", value: 'copenhagen' }, { label: "Aarhus", value: 'aarhus' }, { label: "Odense", value: 'odense' }, { label: "Aalborg", value: 'aalborg' }] },
    { countryId: 3,name:'norway', mainCities: [{ label: "Oslo", value: 'oslo' }, { label: "Bergen", value: 'bergen' }, { label: "Trondheim", value: 'trondheim' }, { label: "Stavanger", value: 'stavanger' }] },
    { countryId: 4,name:'finland', mainCities: [{ label: "Helsinki", value: 'helsinki' }, { label: "Espoo", value: 'espoo' }, { label: "Tampere", value: 'tampere' }, { label: "Vantaa", value: 'vantaa' }] },
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
  
  export const position = [
    {id:'p1', value: "entry", label: "Entry" },
    {id:'p2', value: "intermediate", label: "Mid" },
    {id:'p3', value: "senior", label: "Senior" },
    {id:'p4', value: "internship", label: "Internship" },
  ];
  export const workTime = [
    {id:'w1', value: "full", label: "Full" },
    {id:'w2', value: "part", label: "Part" },
   
  ];

  export const applicationOptions = [
    { id: 'ea1', value: 'onlineForm', label: 'Apply using a form' },
  { id: 'ea2', value: 'email', label: 'Apply via email' },
   
  ];
  
 export const linksOne = [
    {
      id: 1,
      path: "/jobs",
      icon: (
        <i className="fa fa-home" aria-hidden="true">
          🏡
        </i>
      ),
      text: "Jobs List",
    },
    {
      id: 2,
      path: "/cv-templates",
      icon: (
        <i className="fa fa-info" aria-hidden="true">
          ℹ️
        </i>
      ),
      text: "Create ATS CV",
    },
    {
      id: 3,
      path: "/cv-scanner",
      icon: (
        <i className="fa fa-info" aria-hidden="true">
          ℹ️
        </i>
      ),
      text: "Optimise CV",
    },
  ];

 export const linksTwo = [
    {
      id: 1,
      path: "/courses",
      icon: (
        <i className="fa fa-home" aria-hidden="true">
          🏡
        </i>
      ),
      text: "Courses",
    },
    {
      id: 2,
      path: "/it-companies",
      icon: (
        <i className="fa fa-info" aria-hidden="true">
          ℹ️
        </i>
      ),
      text: "IT Companies",
    },
  ];