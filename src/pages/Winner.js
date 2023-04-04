import './styles/blockStyle.css';
import './styles/buttonStyle.css';
import './styles/videoStyle.css';
import { sendGetRequest } from '../AJAX';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Video from './components/Video';


function Winner() {
    const navigate = useNavigate();
    const [vid, setVid] = useState({
        username: '',
        url: '',
        videoname: '',
        Id: 0
    });
    //const [block, setBlock] = useState([])
    
    function initialize() {
        sendGetRequest('/getWinner')
        .then((response) => {
            console.log("Response:",response);
            setVid({
                username: response.username,
                url: response.url,
                videoname: response.videoname,
                Id: 1
            });
            
        })
        .catch((err) => {
            console.log("Couldn't get video:", err);
        });  
    };

    useEffect(initialize, []);
    let block = vid.Id === 0 ? [] : ([<Video user = {vid.username} url = {vid.url} Id = {vid.Id}></Video>]);
    return(
        <div className='Winner'>
            <header className = 'WinnerHeader'>
                <h1 className = 'PageTitle'>The winner is {" " + vid.videoname + " by " + vid.username}</h1>
            </header>
            <div className='VideoContainer'>
                {block}
            </div>
            <button className = "AbleButton" onClick = {() => navigate('/')}>Return</button>
        </div>
    );
}

export default Winner;