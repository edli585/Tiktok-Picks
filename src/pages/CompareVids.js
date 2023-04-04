import './styles/blockStyle.css';
import './styles/buttonStyle.css';
import './styles/videoStyle.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {sendGetRequest, sendPostRequest} from '../AJAX';
import Video from './components/Video';


function CompareVids() {
    const navigate = useNavigate();
    const [f1, setF1] = useState(false);
    const [f2, setF2] = useState(false);
    const [vids, setVids] = useState([
    {
        _id: "",
        username: "",
        url: "",
        videoname: ""
    }, 
    {
        _id: "",
        username: "",
        url: "",
        videoname: ""
    }]);

    function initialize() {
        sendGetRequest('/getTwoVideos')
        .then((result) => {
            setVids([
                {
                    _id: result.first._id,
                    username: result.first.username,
                    url: result.first.url,
                    videoname: result.first.videoname
                }, 
                {   
                    _id: result.second._id,
                    username: result.second.username,
                    url: result.second.url,
                    videoname: result.second.videoname
                }
            ]);
            return;
        })
        .catch((err) => {
            alert("Couldn't get two videos: ", err);
        });
    };

    useEffect(initialize, []);
    let blocks = (vids[0]._id == '' || vids[1]._id == '') ? ['', ''] : 
                                                            [<Video user = {vids[0].username} url = {vids[0].url} Id = {vids[0]._id}></Video>, 
                                                            <Video user = {vids[1].username} url = {vids[1].url} Id = {vids[1]._id}></Video>];
    
    const moveOn = function() {
        let data = {better: '', worse: ''}
        if(f1) {
            data.better = vids[0]._id;
            data.worse = vids[1]._id;
        }
        else if(f2) {
            data.better = vids[1]._id;
            data.worse = vids[0]._id;
        }
        else {
            alert("Please pick a preference");
            return;
        }
        
        sendPostRequest('/insertPref', data)
        .then((res) => {
            if(res.msg === 'continue') 
                navigate(0);
            else if(res.msg === 'winner') 
                navigate('/winner');
        })
        .catch((err) => {
            console.log("Couldn't insert preference: ", err)
        });
    };

    const submit = function() {
        let data = {better: '', worse: ''}
        if(f1) {
            data.better = vids[0]._id;
            data.worse = vids[1]._id;
        }
        else if(f2) {
            data.better = vids[1]._id;
            data.worse = vids[0]._id;
        }
        else {
            alert("Please pick a preference");
            return;
        }
        
        sendPostRequest('/insertPref', data)
        .then((res) => {
            navigate('/');
        })
        .catch((err) => {
            console.log("Couldn't insert preference: ", err)
        });
    }

    return (
        <div className = 'Compare'>
            <header className = 'CompareHeader'>
                <div className = 'ComHeader'>
                    <h1 className='PageTitle'>
                        <span className = 'heart'>
                            <FontAwesomeIcon icon = {faHeart}/>
                        </span>
                        Your favorite!
                    </h1>
                </div>
            </header>
            <main className = 'CompareMain'>
                <div className = 'VideoContainer'>
                    <div className = 'VideoTitle'>{vids[0].videoname + " by " + vids[0].username}</div>
                    {blocks[0]}
                    <div className = 'VideoControls'>
                        <div className = 'Heart'>
                            <button className = 'HeartButton' onClick={() => {setF1(!f1); setF2(false)}}>
                                <FontAwesomeIcon icon={faHeart} className = {f1 === false? 'heartIcon' : 'selected'}/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className = 'VideoContainer'>
                    <div className = 'VideoTitle'>{vids[1].videoname + ' by ' + vids[1].username}</div>                        
                    {blocks[1]}
                    <div className = 'VideoControls'>
                        <button className = 'HeartButton' onClick={() => {setF1(false); setF2(!f2);}}>
                            <FontAwesomeIcon icon={faHeart} className = {f2 === false ? 'heartIcon' : 'selected'}/>
                        </button>
                    </div>
                </div>
            </main>
            <footer>
                <button className = 'AbleButton' onClick = {() => navigate('/')}>Return</button>
                <button className = 'AbleButton' onClick = {() => submit()}>Submit and Return</button>
                <button className = 'AbleButton' onClick = {() => moveOn()}>Submit and Continue</button>
            </footer>
        </div>
    );
}

export default CompareVids;