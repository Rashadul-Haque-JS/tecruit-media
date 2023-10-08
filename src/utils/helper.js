
export const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#e8e9eb" : "#d2ddec",
      boxShadow: "none",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#000",
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected ? "#000" : "transparent", // Background color when selected
      color: state.isSelected ? "#fff" : "#000", // Text color when selected
      "&:hover": {
        background: "#e8e9eb", 
        cursor:'pointer'// Background color on hover
      },
    }),
  };
  

  export const getCurrentDate=() =>{
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 to month since it's zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
  
  export const formatDate=(isoDateString)=>{
    const date = new Date(isoDateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }
  
  