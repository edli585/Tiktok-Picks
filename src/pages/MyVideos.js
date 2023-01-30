import './styles/blockStyle.css';
import './styles/buttonStyle.css';
import './styles/videoStyle.css';
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {sendGetRequest, sendPostRequest} from '../AJAX';


function MyVideos() {
    const navigate = useNavigate();
    const [vids, setVids] = useState([]);
    
    function initialize() {
        let videos = [];
        sendGetRequest('/getAllVideos')
        .then((result) => {
            result.forEach((vid) => videos.push(vid));
            setVids(videos);
        })
        .catch((err) => {
            console.log("Cannot get videos:", err);
        })
        //console.log("videos", videos);
        
    };

    useEffect(initialize, []);

    function deleteButton(index) {
        console.log(index);
        if(vids.length >= index + 1) {
            let body = {"id": vids[index]._id};
            sendPostRequest('/deleteVideo', body)
            .then((response) => {
                let videos = [...vids];
                videos.splice(index, 1);
                console.log(videos);
                setVids(videos);
            })
            .catch((err) => {
                console.log("Error:", err);
            });
            
        }
    }
    console.log(vids);
    //console.log(vids[0]);
    return (
        <div className = "MyVideosPage">
            <header className='MyVideosHeader'>
                <div className = 'LeftHeader'></div>
                <div className = 'MidHeader'>
                    <h1>My Videos</h1>
                </div>
                <div className = 'RightHeader'>
                    <button className = 'AbleButton' onClick = 
                    {() => {
                        navigate('/submit');
                    }}>Add New
                    </button>
                </div>
            </header>
            <p className = 'UploadPrompt'>Please submit eight videos to continue:</p>
            <main className='AllVideos'>
                <div className='Videos'>
                    <div className = "VideoBlock">
                        <div className='VideoEntry'>
                            <div className = {vids[0] ? "FilledVideo" : "VideoName"}>
                                {vids[0] ? vids[0].videoname + " by " + vids[0].username : "Video 1"}
                            </div>
                            <button className='DeleteButton' onClick={() => deleteButton(0)}>X</button>
                        </div>
                        <div className='VideoEntry'>
                            <div className = {vids.length >= 2 ? "FilledVideo" : "VideoName"}>
                                {vids.length >= 2 ? vids[1].videoname + " by " + vids[1].username : "Video 2"}
                            </div>
                            <button className='DeleteButton' onClick={() => deleteButton(1)}>X</button>
                        </div>
                        <div className='VideoEntry'>
                            <div className = {vids.length >= 3 ? "FilledVideo" : "VideoName"}>
                                {vids.length >= 3 ? vids[2].videoname + " by " + vids[2].username : "Video 3"}
                            </div>
                            <button className='DeleteButton' onClick={() => deleteButton(2)}>X</button>
                        </div>
                        <div className='VideoEntry'>
                            <div className = {vids.length >= 4 ? "FilledVideo" : "VideoName"}>
                                {vids.length >= 4 ? vids[3].videoname + " by " + vids[3].username : "Video 4"}
                            </div>
                            <button className='DeleteButton' onClick={() => deleteButton(3)}>X</button>
                        </div>
                    </div>
                    <div className='VideoBlock'>
                        <div className='VideoEntry'>
                            <div className = {vids.length >= 5 ? "FilledVideo" : "VideoName"}>
                                {vids.length >= 5 ? vids[4].videoname + " by " + vids[4].username : "Video 5"}
                            </div>
                            <button className='DeleteButton' onClick={() => deleteButton(4)}>X</button>
                        </div>
                        <div className='VideoEntry'>
                            <div className = {vids.length >= 6 ? "FilledVideo" : "VideoName"}>
                                {vids.length >= 6 ? vids[5].videoname + " by " + vids[5].username : "Video 6"}
                            </div>
                            <button className='DeleteButton' onClick={() => deleteButton(5)}>X</button>
                        </div>
                        <div className='VideoEntry'>
                            <div className = {vids.length >= 7 ? "FilledVideo" : "VideoName"}>
                                {vids.length >= 7 ? vids[6].videoname + " by " + vids[6].username : "Video 7"}
                            </div>
                            <button className='DeleteButton' onClick={() => deleteButton(6)}>X</button>
                        </div>
                        <div className='VideoEntry'>
                            <div className = {vids.length >= 8 ? "FilledVideo" : "VideoName"}>
                                {vids.length >= 8 ? vids[7].videoname + " by " + vids[7].username : "Video 8"}
                            </div>
                            <button className='DeleteButton' onClick={() => deleteButton(7)}>X</button>
                        </div>
                    </div>
                </div>
                
                
                <button className = {vids.length === 8 ? 'AbleButton' : "UnableButton"} onClick={() => vids.length === 8 ? navigate('/compare') : alert("Eight videos are needed")}>Play Game</button>
            </main>
    </div>
    );
}

export default MyVideos;