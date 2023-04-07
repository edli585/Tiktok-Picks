import './styles/blockStyle.css';
import './styles/buttonStyle.css';
import './styles/videoStyle.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { sendGetRequest, sendPostRequest } from '../AJAX';

function MyVideos() {
    const navigate = useNavigate();
    const [vids, setVids] = useState([]);

    function deleteButton(index) {
        console.log(index);
        if (vids.length >= index + 1) {
            let body = { "id": vids[index]._id };
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

    function previewButton(index) {
        console.log(index);
        if (vids.length >= index + 1) {
            navigate('/preview', {state: {
                user: vids[index].username,
                name: vids[index].videoname,
                url: vids[index].url,
                id: index
            }});
        }
    }

    function VideoGroup(props) {
        let vids = props.videos;
        return (
            <div className='Videos'>
                <div className="VideoBlock">
                    <div className='VideoEntry'>
                        <div className={vids[props.index] ? "FilledVideo" : "VideoName"} onClick = {() => previewButton(props.index)}>
                            {vids[props.index] ? vids[props.index].videoname + " by " + vids[props.index].username : `Video ${props.index + 1}`}
                        </div>
                        <button className='DeleteButton' onClick={() => deleteButton(props.index)}>X</button>
                    </div>
                    <div className='VideoEntry'>
                        <div className={vids[props.index + 1] ? "FilledVideo" : "VideoName"} onClick = {() => previewButton(props.index + 1)}>
                            {vids[props.index + 1] ? vids[props.index + 1].videoname + " by " + vids[props.index + 1].username : `Video ${props.index + 2}`}
                        </div>
                        <button className='DeleteButton' onClick={() => deleteButton(props.index + 1)}>X</button>
                    </div>
                    <div className='VideoEntry'>
                        <div className={vids[props.index + 2] ? "FilledVideo" : "VideoName"} onClick = {() => previewButton(props.index + 2)}>
                            {vids[props.index + 2] ? vids[props.index + 2].videoname + " by " + vids[props.index + 2].username : `Video ${props.index + 3}`}
                        </div>
                        <button className='DeleteButton' onClick={() => deleteButton(props.index + 2)}>X</button>
                    </div>
                    <div className='VideoEntry'>
                        <div className={vids[props.index + 3] ? "FilledVideo" : "VideoName"} onClick = {() => previewButton(props.index + 3)}>
                            {vids[props.index + 3] ? vids[props.index + 3].videoname + " by " + vids[props.index + 3].username : `Video ${props.index + 4}`}
                        </div>
                        <button className='DeleteButton' onClick={() => deleteButton(props.index + 3)}>X</button>
                    </div>
                </div>
                <div className="VideoBlock">
                    <div className='VideoEntry'>
                        <div className={vids[props.index + 4] ? "FilledVideo" : "VideoName"} onClick = {() => previewButton(props.index + 4)}>
                            {vids[props.index + 4] ? vids[props.index + 4].videoname + " by " + vids[props.index + 4].username : `Video ${props.index + 5}`}
                        </div>
                        <button className='DeleteButton' onClick={() => deleteButton(props.index + 4)}>X</button>
                    </div>
                    <div className='VideoEntry'>
                        <div className={vids[props.index + 5] ? "FilledVideo" : "VideoName"} onClick = {() => previewButton(props.index + 5)}>
                            {vids[props.index + 5] ? vids[props.index + 5].videoname + " by " + vids[props.index + 5].username : `Video ${props.index + 6}`}
                        </div>
                        <button className='DeleteButton' onClick={() => deleteButton(props.index + 5)}>X</button>
                    </div>
                    <div className='VideoEntry'>
                        <div className={vids[props.index + 6] ? "FilledVideo" : "VideoName"} onClick = {() => previewButton(props.index + 6)}>
                            {vids[props.index + 6] ? vids[props.index + 6].videoname + " by " + vids[props.index + 6].username : `Video ${props.index + 7}`}
                        </div>
                        <button className='DeleteButton' onClick={() => deleteButton(props.index + 6)}>X</button>
                    </div>
                    <div className='VideoEntry'>
                        <div className={vids[props.index + 7] ? "FilledVideo" : "VideoName"} onClick = {() => previewButton(props.index + 7)}>
                            {vids[props.index + 7] ? vids[props.index + 7].videoname + " by " + vids[props.index + 7].username : `Video ${props.index + 8}`}
                        </div>
                        <button className='DeleteButton' onClick={() => deleteButton(props.index + 7)}>X</button>
                    </div>
                </div>
            </div>
        );
    }

    function winnerButton() {
        if(vids.length >= 8) {
            sendGetRequest('/canCalcWinner')
            .then(() => {
                navigate('./winner')
            })
            .catch((err) => {
                console.log("Can't get winner");
            })
        }
    }

    function initialize() {
        let videos = [];
        sendGetRequest('/getAllVideos')
            .then((result) => {
                console.log("response:", result);
                result.forEach((vid) => videos.push(vid));
                setVids(videos)
            })
            .catch((err) => {
                console.log("Cannot get videos:", err);
            })
        console.log("Videos", videos)
    };

    useEffect(initialize, []);
    let vidBlocks = [];
    let index = 0;
    do {
        console.log(index);
        vidBlocks.push(<VideoGroup videos = {vids} index = {index}></VideoGroup>);
        index += 8;
    } while(index < vids.length);
    return (
        <div className="MyVideosPage">
            <header className='MyVideosHeader'>
                <div className='LeftHeader'></div>
                <div className='MidHeader'>
                    <h1>All Videos</h1>
                </div>
                <div className='RightHeader'>
                    <button className='AbleButton' onClick=
                        {() => {
                            navigate('/submit');
                        }}>Add New
                    </button>
                </div>
            </header>
            <p className='UploadPrompt'>There must be at least eight videos to enter preferences:</p>
            <main className='AllVideos'>
                {vidBlocks}
                <button className={vids.length >= 8 ? 'AbleButton' : "UnableButton"} onClick={() => (vids.length >= 8) ? navigate('/compare') : alert("Eight videos are needed")}>Play Game</button>
                <button className={vids.length >= 8 ? 'AbleButton' : 'UnableButton'} onClick={() => winnerButton()}>Get Winner</button>
            </main>
        </div>
    );
}

export default MyVideos;