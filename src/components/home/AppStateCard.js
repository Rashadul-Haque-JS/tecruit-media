import React from "react";

const AppStateCard = (props) => {
return (
    <div className="p-2 text-center text-tecruitSpecial">
        <h1 className=" text-7xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-5xl font-bold xl:font-semibold tracking-tighter pb-4">{props.number}</h1>
        <p className="sm:text-xl md:text-lg lg:text-xl xl:text-xl text-2xl font-bold pb-8">{props.text}</p>
    </div>
)
}
export default AppStateCard;