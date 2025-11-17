'use client';

import { useEffect, useState } from "react";

export default function GlobalJackpot() {
  const [jackpot, setJackpot] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://streamlabscharity.com/api/v1/teams/@les-poussins-solidaires/les-poussins-solidaires-2025");
      const json = await res.json();
      const value = json.amount_raised;
      const formatted = (value / 100).toFixed(2);
      setJackpot(formatted);
    };
    fetchData();

    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p>{jackpot} € au total !</p>
  );
}
