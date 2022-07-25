/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react";

function News({ title, content, symbols, link }) {
  return (
    <div className="pb-4 ">
      <p className="text-left text-lg font-bold">{title.toString()}</p>
      <p className="pt-2 text-lg text-left">
        {content.substring(0, 300) + "..."}
      </p>
      <p className="text-sm py-4 text-left">Symbol: {symbols.toString()}</p>
      <div className="py-4">
        <a
          href={link}
          className="bg-[#E7F6F2] text-center px-4 py-2 border-2 rounded-lg text-base
           text-[#17252A] cursor-pointer hover:bg-[#2B7A78] shadow-lg"
        >
          Read more..
        </a>
      </div>
    </div>
  );
}

export default News;
