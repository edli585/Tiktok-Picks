import './styles/blockStyle.css';
import './styles/buttonStyle.css';
import './styles/videoStyle.css';
import { sendGetRequest } from '../AJAX';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Winner() {
    const navigate = useNavigate();
    const [vid, setVid] = useState('');
    
    function initialize() {
        sendGetRequest('/getWinner')
        .then((response) => {
            console.log(response);
            setVid({
                username: response.username,
                url: "https://www.tiktok.com/embed/" + response.url,
                videoname: response.videoname
            });
        })
        .catch((err) => {
            console.log("Couldn't get video:", err);
        });  
    };

    useEffect(initialize, []);
    
    return(
        <div className='Winner'>
            <header className = 'WinnerHeader'>
                <h1 className = 'PageTitle'>The winner is...</h1>
            </header>
            <div className='VideoContainer'>
                <div className = 'Video'>
                    <p>{vid.videoname + " "} by {" " + vid.username}</p>
                    <iframe src={vid.url} title = "Winner"/>
                </div>
            </div>
            <button className = "AbleButton" onClick = {() => navigate('/')}>Return</button>
        </div>
    );
}

export default Winner;