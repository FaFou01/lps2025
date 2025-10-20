'use client';

import Countdown from "./countdown";
import Footer from "./footer";
import Header from "./header";
import Image from "next/image";

export default function Home() {
  return (
    <div id="mainContainer">
      <Header />
      <div id="home">
        <Image 
          src={"/img/poussins.png"}
          alt={"Les poussins solidaires 2025"}
          width={0}
          height={0}
          sizes="100vh"
        />
        <div id='homeParagraph'>
          <p>Retrouvez les Poussins Solidaires</p>
          <p id="dates">Du Vendredi 14 Novembre à 20h au Dimanche 16 Novembre 2025 à Minuit !</p>
          <p>
            Les Poussins Solidaires rassemblent des streamers de Twitch autour d&apos;une seule et même cause. 
            Nous sommes un collectif de créateurs de contenu et souhaitons utiliser notre influence pour sensibiliser nos communautés, collecter des fonds et 
            donner une voix aux associations soutenues par l&apos;évènement. Cette année, c&apos;est l&apos;association Fake Hair Don&apos;t Care qui va bénéficier de vos dons !
          </p>
          <p>L&apos;évènement commence dans</p>
          <Countdown />
        </div>
      </div>
      <Footer />
    </div>
  );
}
