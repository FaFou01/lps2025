'use client';

import { useEffect, useState } from "react";

export default function GlobalJackpot() {
  const [jackpot, setJackpot] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://streamlabscharity.com/api/v1/causes/fake-hair-dont-care/les-poussins-solidaires-2025");
      const json = await res.json();
      setJackpot(json.amount_raised);
    };
    fetchData();

    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p>{jackpot} € au total !</p>
  );
}
