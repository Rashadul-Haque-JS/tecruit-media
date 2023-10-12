import React from 'react';

const JobDescription = ({ description }) => {
  return (
    <div className="text-gray-500 py-2" dangerouslySetInnerHTML={{ __html: description }} />
  );
};

export default JobDescription;
