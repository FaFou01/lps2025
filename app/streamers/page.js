'use client';

import { useState, useEffect } from 'react';
import Header from '../header';
import Channel from './channel';
import { streamers } from '../streamers';
import Footer from '../footer';

export default function Streamers() {
  const [sortedStreamers, setSortedStreamers] = useState(streamers);
  const [liveCount, setLiveCount] = useState(0);
  const [width, setWidth] = useState(0);

  // Petite fonction de délai pour éviter le rate limit
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const checkIfLive = async (channel) => {
    try {
      const response = await fetch(
        `https://api.twitch.tv/helix/streams?user_login=${channel}`,
        {
          headers: {
            "Client-Id": "gp762nuuoqcoxypju8c569th9wz7q5", // Correction casse
            Authorization: "Bearer ss5fmtkswmjolanihjcmo8362x8vl3",
          },
          cache: "no-store",
        }
      );

      // Vérifier si Twitch renvoie une vraie erreur
      if (!response.ok) {
        console.warn("Erreur Twitch:", response.status, response.statusText);
        return false;
      }

      const data = await response.json();

      return Array.isArray(data.data) && data.data.length > 0;
    } catch (e) {
      console.error("Erreur checkIfLive:", e);
      return false;
    }
  };


  useEffect(() => {
    const sortStreamers = async () => {
      const streamersWithStatus = [];

      for (const s of streamers) {
        const isLive = await checkIfLive(s.name);

        streamersWithStatus.push({
          ...s,
          isLive,
        });

        // délai pour éviter le rate limit
        await delay(120); 
      }

      // Compter le nombre de live
      setLiveCount(streamersWithStatus.filter((s) => s.isLive).length);

      const sorted = streamersWithStatus.sort((a, b) => {
        if (a.isLive === b.isLive) {
          return a.name.localeCompare(b.name);
        }
        return a.isLive ? -1 : 1;
      });

      setSortedStreamers(sorted);
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
        <h1>
          Les Streamers de l&apos;évènement{" "}
          {width < 640 && (<br />)}
          (🔴 {liveCount} / {sortedStreamers.length})
        </h1>

        <div id="streamers">
          {sortedStreamers.map((streamer) => (
            <Channel
              key={streamer.name}
              channel={streamer.name}
              pp={streamer.pp}
              dgs={streamer.dgs}
              jackpot={streamer.jackpot}
              isLive={streamer.isLive}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
