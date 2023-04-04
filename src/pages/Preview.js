import './styles/blockStyle.css';
import './styles/buttonStyle.css';
import './styles/videoStyle.css';

import { useNavigate, useLocation } from "react-router-dom";
import { sendGetRequest } from "../AJAX";
import { useEffect, useState } from 'react';
import Video from './components/Video';

function Preview() {
    const navigate = useNavigate();
    let location = useLocation();
    const [vid, setVid] = useState([]);
    
    function initialize() {
        let username = location.user, url = location.url, Id = location.id;
        let video = [<Video user = {username} url = {url} Id = {Id}></Video>]
        setVid(video)
    }
    useEffect(initialize, []);
    
    console.log(vid)
    return (
        <div className="Preview">
            <header className="PreviewHeader">
                <h1>{location.name + " "} by {" " + location.user}</h1>
            </header>
            <main className="PreviewMain">
                <div className="VideoContainer">
                    {vid}
                </div>  
            </main>
            <button className="ContinueButton" onClick={() => navigate('/')}>Continue</button>
        </div>
    );
} 

export default Preview;