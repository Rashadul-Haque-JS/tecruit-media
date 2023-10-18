export const getLinksOne=(location)=>{
  return [
    {
      id: 1,
      path: `/${location}/jobs`,
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
    {
      id: 4,
      path: `/${location}/jobs-match`,
      icon: (
        <i className="fa fa-info" aria-hidden="true">
          ℹ️
        </i>
      ),
      text: "Match Jobs",
    },
  ];
}

export const getLinksTwo=(location)=>{
  return [
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
      path: `/${location}/it-companies`,
      icon: (
        <i className="fa fa-info" aria-hidden="true">
          ℹ️
        </i>
      ),
      text: "IT Companies",
    },
  ];
}
