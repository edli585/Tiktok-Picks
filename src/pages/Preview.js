import './styles/blockStyle.css';
import './styles/buttonStyle.css';
import './styles/videoStyle.css';

import { useNavigate } from "react-router-dom";
import { sendGetRequest } from "../AJAX";
import { useEffect, useState } from 'react';

function Preview() {
    const navigate = useNavigate();
    const [vid, setVid] = useState('');
    
    function initialize() {
        sendGetRequest('/getMostRecentVid')
        .then((response) => {
            console.log(response[0])
            setVid({
                username: response[0].username,
                url: "https://www.tiktok.com/embed/" + response[0].url,
                videoname: response[0].videoname
            });
        })
        .catch((err) => {
            console.log("Couldn't get video:", err);
        });  
    };

    useEffect(initialize, []);
    
    return (
        <div className="Preview">
            <header className="PreviewHeader">
                <h1>{vid.videoname + " "} by {" " + vid.username}</h1>
            </header>
            <main className="PreviewMain">
                <div className="VideoContainer">
                    <div className="Video">
                        <iframe src={vid.url} title = "Preview"/>
                    </div>
                </div>  
            </main>
            <button className="ContinueButton" onClick={() => navigate('/')}>Continue</button>
        </div>
    );
} 

export default Preview;