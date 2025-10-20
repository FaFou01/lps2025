'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import DGModal from './modal';

export default function Channel ({channel, pp, dgs}) {
    const [showPlayer, setShowPlayer] = useState(false);
    const [isLive, setIsLive] = useState(false);
    const [showBtns, setShowBtns] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [width, setWidth] = useState(0);

    const checkIfLive = async (channel) => {
        const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${channel}`, {
            headers: {
            'Client-ID': 'gp762nuuoqcoxypju8c569th9wz7q5',
            'Authorization': 'Bearer ss5fmtkswmjolanihjcmo8362x8vl3'
            }
        });
        const data = await response.json();
        return data.data.length > 0;
    };

    useEffect(() => {
        const updateLiveStatus = async () => {
        const live = await checkIfLive(channel);
            setIsLive(live);
        };

        updateLiveStatus();

        const intervalId = setInterval(updateLiveStatus, 30000);

        return () => clearInterval(intervalId);

    }, [channel]);

    useEffect(() => {
        setWidth(window.innerWidth);
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className='channel'>
            <div id="channelInfo">
                <Image src={`/streamers/${pp}`} alt={`Photo de profil de ${channel}`} width={75} height={75}/>
                <div id="nameAndState">
                    <p className='channelName'>{channel}</p>
                    <p
                        className='liveState'
                        style={{backgroundColor : isLive ? "red" : "gray"}}
                    >
                        {isLive ? "⚪ En Ligne" : "⚫ Hors Ligne"}
                    </p>
                </div>
                <p className='jackpot'>0 €</p>
            </div>
            {width > 640 ? (
                <div
                    className="liveStream"
                    onMouseEnter={() => {setShowBtns(true); if(isLive) {setShowPlayer(true)}}}
                    onMouseLeave={() => {setShowBtns(false); if(isLive) {setShowPlayer(false)}}}
                >
                    {!showPlayer ? (
                        isLive ? (
                        <Image
                            src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${channel.toLowerCase()}-320x180.jpg`}
                            alt={`Preview du stream ${channel}`}
                            width={400}
                            height={225}
                            unoptimized
                        /> ) : (
                            <div className='offlineBloc'>
                                <p>Offline</p>
                                <Image
                                    src="/img/logo.png"
                                    alt={`Preview du stream ${channel}`}
                                    width={100}
                                    height={100}
                                    unoptimized
                                />
                            </div>
                        )
                    ) : (
                        <>
                            <iframe
                                src={`https://player.twitch.tv/?channel=${channel.toLowerCase()}&parent=lps2025.fr&controls=false`} 
                                width="400"
                                height="225"
                                allow="autoplay; fullscreen"
                            />
                        </>
                    )}
                    {showBtns && (
                        <>
                            <a className="twitchButton" href={`https://www.twitch.tv/${channel.toLowerCase()}`} target="_blank">Voir sur Twitch</a>
                            {dgs.length > 0 && <button className="seeDG" onClick={() => setOpenModal(true)}>Donation goals</button>}
                        </>
                    )}               
                </div>
            ) : (
                <div
                    className="liveStream"
                >
                    <a className="twitchButton" href={`https://www.twitch.tv/${channel.toLowerCase()}`} target="_blank">Voir sur Twitch</a>
                    {dgs.length > 0 && <button className="seeDG" onClick={() => setOpenModal(true)}>Donation goals</button>}
                </div>
            )}
            {openModal && <DGModal name={channel} dgs={dgs} setOpen={setOpenModal}/>}
        </div>
    )
}