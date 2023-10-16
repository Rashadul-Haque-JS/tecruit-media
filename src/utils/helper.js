
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
    case 'Sweden':
      return { bgc: '#005293', txt: '#fecb00' };
    case 'Denmark':
      return { bgc: '#C60C30', txt: '#fff' }; 
    case 'Norway':
      return { bgc: '#EF4135', txt: '#003087' };
    case 'Finland':
      return { bgc: '#002F6C', txt: '#fff' };
    default:
      return { bgc: '#279b37', txt: '#fff' };
  }
};
