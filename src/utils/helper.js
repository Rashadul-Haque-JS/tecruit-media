
export const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "1px solid #279b37",
    outline: "none",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "#279b37",
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected ? "#279b37" : "transparent",
    color: state.isSelected ? "#fff" : "#000",
    "&:hover": {
      background: "#e8e9eb",
      cursor: "pointer",
    },
  }),
};
export const selectStylesHome = {
  control: (provided, state) => ({
    ...provided,
    border: "1px solid #279b37",
    outline: "none",
    padding: "6px 0px",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "#279b37",
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected ? "#279b37" : "transparent",
    color: state.isSelected ? "#fff" : "#000",
    "&:hover": {
      background: "#e8e9eb",
      cursor: "pointer",
    },
  }),
};

export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it's zero-indexed
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const formattedDate = date.toISOString().split("T")[0];
  return formattedDate;
};

export const getNordicColor = (country) => {
  switch (country) {
    case 'sweden':
      return { bgc: '#005293', txt: '#fecb00' };
    case 'denmark':
      return { bgc: '#C60C30', txt: '#fff' }; 
    case 'norway':
      return { bgc: '#BA0C2F', txt: '#003087' };
    case 'finland':
      return { bgc: '#002F6C', txt: '#fff' };
    default:
      return { bgc: '#006EB7', txt: '#fff' };
  }
};

//Sorting the subcategory data based on the country
export const createNewSubCategoryArray=(data, country)=>{
  return data.map(item => {
    const totalJobs = item.totalJobs;
    const totalNordic =
      totalJobs['sweden'] +
      totalJobs['denmark'] +
      totalJobs['norway'] +
      totalJobs['finland'];

    return {
      title: item.title,
      totalJobs: {
        ...totalJobs,
        nordic: totalNordic
      }
    };
  }).map(category => ({
    title: category.title,
    totalJobs: category.totalJobs[country]
  }));
}


export const locationLock=(location, selection)=>{
const isLocation = selection && location !=='nordic' && selection.value !== 'nordic'
return isLocation
}


export const calculateGrandTotalForLocation = (data)=>{
  return data.reduce((acc, subcategory) => acc + subcategory.totalJobs, 0);

}

