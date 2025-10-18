'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Channel ({channel, pp}) {
    const [showPlayer, setShowPlayer] = useState(false);
    const [isLive, setIsLive] = useState(false);

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

    return (
        <div className='channel'>
            <div id="channelInfo">
                <Image src={`/streamers/${pp}`} alt={`Photo de profil de ${channel}`} width={75} height={75}/>
                <div>
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
            <div
                className="liveStream"
                onMouseEnter={() => {if(isLive) {setShowPlayer(true)}}}
                onMouseLeave={() => {if(isLive) {setShowPlayer(false)}}}
            >
                {!showPlayer ? (
                    <Image
                        src={isLive ? `https://static-cdn.jtvnw.net/previews-ttv/live_user_${channel.toLowerCase()}-320x180.jpg` : '/img/back.png'}
                        alt={`Preview du stream ${channel}`}
                        width={400}
                        height={225}
                        unoptimized
                    />
                ) : (
                    <>
                        <iframe
                            src={`https://player.twitch.tv/?channel=${channel.toLowerCase()}&parent=localhost&controls=false`} 
                            width="400"
                            height="225"
                            allow="autoplay; fullscreen"
                        />
                        <a className="twitchButton" href={`https://www.twitch.tv/${channel.toLowerCase()}`}>Voir sur Twitch</a>
                        <button className="seeDG">Donation goals</button>
                    </>
                )}
            </div>
        </div>
    )
}