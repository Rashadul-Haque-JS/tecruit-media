import React from "react";

const TechArticleCard = ({ article }) => {
  return (
    <div className="w-full py-2">
      <div className="bg-white shadow-none overflow-hidden">
        <div
          className="bg-cover bg-center h-56 p-4"
          style={{ backgroundImage: `url(${article.image})` }}
        ></div>
        <div className="p-4">
          <p className="uppercase tracking-wide text-sm font-bold text-tecruitRedish pb-2">
            {article.category}
          </p>
          <p className="text-3xl text-gray-900 font-bold">{article.title}</p>
          <p className="my-2 text-gray-600">{article.description}</p>
          <p className="text-gray-900">By: <span className="text-blue-400">{article.author}</span></p>
          <p>
            <span className="text-gray-400"> Published on: {article.date}</span>
          </p>
          <div className="mt-4">
            <a
              href={article.link}
              className="text-tecruitSecondary bg-tecruitPrimary font-semibold text-sm p-3"
            >
              Read full story
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechArticleCard;
