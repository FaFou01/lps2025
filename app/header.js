'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header(){
    const [active, setActive] = useState("");

    useEffect(() => {
        if (window.location.pathname.includes("/streamers")) {
            setActive('streamers');
        }
        else if (window.location.pathname.includes("/contact")) {
            setActive('contact');
        }
    }, []);

    return(
        <div id="header">
            <div id="logoContainer">
                <Link href="/" style={{ display: "inline-block" }}>
                    <Image src="/img/logo.png" alt="logo LPS2025" width={100} height={100}/>
                </Link>
                <p>Les Poussins Solidaires 2025 <br/>Fake Hair Don&apos;t Care</p>
            </div>
            <div id="menu">
                <a className="inactive" href="https://fakehairdontcare.fr/" target="_blank">L&apos;association</a>
                <a className={active == "streamers" ? "active" : "inactive"} href="/streamers">Les streamers</a>
                <a className={active == "contact" ? "active" : "inactive"} href="/contact">Contact</a>
                <a href="#" id="don">Faire un don</a>
            </div>
      </div>
    )
}