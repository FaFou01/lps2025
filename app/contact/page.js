'use client';

import Footer from "../footer";
import Header from "../header";
import Image from "next/image";

export default function Contact() {
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
          <p>Une question sur l&apos;évènement ? Sur l&apos;association ? Ou bien vous voulez soutenir ou sponsoriser les poussins ?</p>
          <form action="" method="">
            <div>
              <input type="text" name="nom" required placeholder="Nom *"/>
              <input type="text" name="prenom" required placeholder="Prénom *"/>
            </div>
            <div>
              <input type="mail" name="mail" required placeholder="Adresse mail *"/>
              <input type="text" name="phone" required placeholder="Téléphone"/>
            </div>
            <textarea name="message" placeholder="Votre message ici..."/>
            <button type="submit">Envoyer</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
