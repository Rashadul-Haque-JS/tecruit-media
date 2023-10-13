import React from "react";

const OverleyComponent = ({open}) => {
    const isSmallScreen = window.innerWidth <= 1023;
  return (
    <>
      {open && isSmallScreen && (
        <div className="absolute inset-0 z-30 bg-tecruitSpecial opacity-60 overflow-hidden "></div>
      )}
    </>
  );
};

export default OverleyComponent;