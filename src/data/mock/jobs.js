
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
  
 