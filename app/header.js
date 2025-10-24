'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header(){
    const [active, setActive] = useState("");
    const [width, setWidth] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    useEffect(() => {
        if (window.location.pathname.includes("/streamers")) {
            setActive('streamers');
        }
        else if (window.location.pathname.includes("/contact")) {
            setActive('contact');
        }
        else{
            setActive('accueil');
        }
    }, []);

    useEffect(() => {
        setWidth(window.innerWidth);
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return(
        <div id="header">
            {width > 640 ? (<div id="logoContainer">
                <Link href="/" style={{ display: "inline-block" }}>
                    <Image src="/img/logo.png" alt="logo LPS2025" width={width > 640 ? 100 : 50} height={width > 640 ? 100 : 50}/>
                </Link>
                <p>Les Poussins Solidaires 2025 <br/>Fake Hair Don&apos;t Care</p>
            </div>) : (
                <>
                    <Link href="/" style={{ display: "inline-block" }}>
                        <Image src="/img/logo.png" alt="logo LPS2025" width={width > 640 ? 100 : 50} height={width > 640 ? 100 : 50}/>
                    </Link>
                    <p>Les Poussins Solidaires 2025 <br/>Fake Hair Don&apos;t Care</p>
                </>
            )}
            <button id="burger" onClick={toggleMenu} className="burger-btn">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div id="menu" style={{display : width < 640 ? (menuOpen ? "flex" : "none") : "flex"}}>
                {width < 640 && (<button id="closeBurger" onClick={toggleMenu} className="">Fermer X</button>)}
                {width < 640 && (<Link className={active == "accueil" ? "active" : "inactive"} href="/">Accueil</Link>)}
                <a className="inactive" href="https://fakehairdontcare.fr/" target="_blank">L&apos;association</a>
                <a className={active == "streamers" ? "active" : "inactive"} href="/streamers">Les streamers</a>
                <a className="inactive" href="https://ko-fi.com/s/1a839a90f1" target="_blank">Le merch</a>
                <a className={active == "contact" ? "active" : "inactive"} href="/contact">Contact</a>
                <a href="https://streamlabscharity.com/fake-hair-dont-care/event/les-poussins-solidaires-2025?l=fr-FR" id="don" target="_blank">Faire un don</a>
            </div>
      </div>
    )
}