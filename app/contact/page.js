'use client';

import { useState } from 'react';
import Footer from "../footer";
import Header from "../header";
import emailjs from "@emailjs/browser";
import Image from "next/image";

export default function Contact() {
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
      e.preventDefault();
      setStatus("Envoi...");

      const formElement = e.target;
      console.log(formElement);
  
      emailjs
        .sendForm(
          "service_kb5www2",
          "template_40id19p",
          formElement,
          "jUkzxp-4w5_yHVI9f"
        )
        .then(
          (result) => {
            console.log(result.text);
            setStatus("Message envoyé !");
          },
          (error) => {
            console.log(error.text);
            setStatus("Échec de l'envoi.");
          }
        );
  };

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
          <form onSubmit={handleSubmit}>
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
            <p>{status}</p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
