import React from "react";

const SubHeadline = ({ title, color, bgColor}) => {
    return (
        <div className={`w-full pt-4 pb-6 bg-${bgColor} text-${color}`}>
        <h2 className="text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl font-semibold mt-4 mb-2 text-center">
            {title}
        </h2>
        </div>
    );
}

export default SubHeadline;