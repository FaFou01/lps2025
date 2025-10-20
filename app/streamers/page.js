'use client';

import { useState, useEffect } from 'react';
import Header from '../header';
import Channel from './channel';
import { streamers } from '../streamers';
import Footer from '../footer';

export default function Streamers() {
  const [sortedStreamers, setSortedStreamers] = useState([]);
  const [liveCount, setLiveCount] = useState(0);
  const [width, setWidth] = useState(0);

  const checkIfLive = async (channel) => {
    const response = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${channel}`,
      {
        headers: {
          "Client-ID": "gp762nuuoqcoxypju8c569th9wz7q5",
          Authorization: "Bearer ss5fmtkswmjolanihjcmo8362x8vl3",
        },
      }
    );
    const data = await response.json();
    return data.data.length > 0;
  };

  useEffect(() => {
    const sortStreamers = async () => {
        const streamersWithStatus = await Promise.all(
            streamers.map(async (s) => ({
            ...s,
            isLive: await checkIfLive(s.name),
            }))
        );

        // Compter le nombre de live
        setLiveCount(streamersWithStatus.filter((s) => s.isLive).length);
        console.log(`Nombre de streamers en live : ${liveCount}`);

        const sorted = streamersWithStatus.sort((a, b) => {
            if (a.isLive === b.isLive) {
            return a.name.localeCompare(b.name);
            }
            return a.isLive ? -1 : 1;
        });

        setSortedStreamers(sorted);
        console.log("Refresh !!");
    };

    sortStreamers();

    const intervalId = setInterval(sortStreamers, 30000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setWidth(window.innerWidth);
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="streamerContainer">
      <Header />
      <div id="body">
        <h1>Les Streamers de l&apos;évènement {width < 640 && (<br/>)}(🔴 {liveCount} / {sortedStreamers.length})</h1>
        <div id="streamers">
          {
            sortedStreamers.map((streamer) => (
                <Channel 
                    key={streamer.name} 
                    channel={streamer.name} 
                    pp={streamer.pp} 
                    dgs={streamer.dgs}
                />
            ))
          }
          
        </div>
      </div>
      <Footer />
    </div>
  );
}
