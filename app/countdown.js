"use client";
import { useEffect, useState } from "react";
import GlobalJackpot from "./global-jackpot/page";

export default function Countdown() {
  const targetDate = new Date("2025-11-14T20:00:00"); // ta date cible
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

  function getTimeRemaining(target) {
    const total = target - new Date();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { total, days, hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getTimeRemaining(targetDate);
      setTimeLeft(remaining);

      if (remaining.total <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {timeLeft.total > 0 ? <p>L&apos;évènement commence dans</p> : <p>L'évènement a déjà récolté</p>}
      <div style={{ textAlign: "center", display : "flex", justifyContent: "center"}} className="countdown">
        {timeLeft.total > 0 ? (
          <p>
            {timeLeft.days}j {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </p>
        ) : (
          <GlobalJackpot />
        )}
      </div>
    </>
  );
}
