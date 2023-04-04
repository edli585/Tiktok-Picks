import '../styles/videoStyle.css';
import { useEffect } from 'react';

function Video(props) {
    console.log(props)
    let fullURL = `https://www.tiktok.com/@${props.user}/video/${props.url}`;
    function initialize() {
        console.log(props.Id);
        let block = document.createElement('blockquote');
        block.className = "tiktok-embed";
        block.cite = fullURL;
        block.setAttribute('data-video-id', props.url);

        let section = document.createElement('section');
        block.appendChild(section);

        let script = document.createElement('script');
        script.src = 'https://www.tiktok.com/embed.js';
        script.id = 'tiktokScript';
        script.async = true;

        let div = document.getElementById(props.Id);
        div.appendChild(block);
        div.appendChild(script);
    }

    useEffect(initialize, []);
    return (
        <div className="Video" id={props.Id}>
            
        </div>
    );
}

export default Video;