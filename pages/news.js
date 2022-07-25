/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import News from "../components/News";
import Head from "next/head";
function TodayNews() {
  const [newsList, setNewsList] = useState([]);
  function getNews() {
    fetch(`api/news`)
      .then((response) => response.json())
      .then((data) => setNewsList(data));
  }

  useEffect(() => {
    getNews();
  }, []);
  Head;
  return (
    <div className="bg-[#2C3333] h-screen overflow-hidden">
      <Head>
        <title>News</title>
        <meta name="description" content="Stalk Your Stock" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex">
        <Sidebar />
        <div className="w-screen p-10 text-[#E7F6F2]">
          <p className="text-2xl py-4">News</p>

          {newsList.map((news) => {
            return <News 
              title={news.title}
              content={news.content}
              symbols={news.symbols}
              link={news.link}
            />;
          })}
        </div>
      </main>
    </div>
  );
}

export default TodayNews;
