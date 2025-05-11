import React from 'react';

const Loader = () => {
  return (
    <div className="w-full h-screen bg-[#F3FCF0] flex justify-center items-center">
      <div className="flex gap-x-2">
        <div className="w-5 h-5 bg-[#d991c2] rounded-full animate-bounce" />
        <div className="w-5 h-5 bg-[#9869b8] rounded-full animate-bounce" />
        <div className="w-5 h-5 bg-[#6756cc] rounded-full animate-bounce" />
      </div>
    </div>
  );
};

export default Loader;
