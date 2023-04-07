import './styles/blockStyle.css';
import './styles/buttonStyle.css';
import './styles/videoStyle.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { sendPostRequest } from '../AJAX';

function SubmitVideo() {
    const navigate = useNavigate();
    const [url, setURL] = useState('');
    const [videoName, setVideoName] = useState('');
    const [err, setErr] = useState(false);
    return (
        <div className='Submit'>
            <header className='SubmitHeader'>
                <div className="LeftHeader"></div>
                <div className='MidHeader'>
                    <h1 className='PageTitle'>TikTok Picks</h1>
                </div>
                <div className='RightHeader'>
                    <button className='AbleButton' onClick={() => { navigate('/'); }}>My Videos</button>
                </div>
            </header>
            <main className='SubmitMain'>
                <h2>Submit a video:</h2>
                <div className='FormFields'>
                    <div style={{color: 'red'}}>{err ? 'Invalid URL' : ''}</div>
                    <form className='Submit'>
                        <label htmlFor='url'>Tiktok URL:</label>
                        <input type='text' name='URL' id='URL' placeholder='Enter full URL from Tiktok' size='40' value={url} onChange={(e) => setURL(e.target.value)}></input>
                    </form>
                    <form className='Submit'>
                        <label htmlFor='videoname'>Video Name:</label>
                        <input type='text' name='videoname' id='videoname' placeholder='Enter a nick name for the video' size='40' value={videoName} onChange={(e) => setVideoName(e.target.value)}></input>
                    </form>
                </div>
                <button className='AbleButton' onClick={submit}>Continue</button>
            </main>
        </div>
    );

    function submit() {
        if (url === '' || videoName === '') {
            alert("You must enter all the information to submit");
            return;
        }

        parseUrl(url)
            .then((vidData) => {
                let data = { "username": vidData[0], "url": vidData[1], "videoname": videoName };

                sendPostRequest('/videoData', data)
                    .then((response) => {
                        console.log("Response received", response);
                        if (response.msg === 'Video already exists') {
                            alert("Video already exists in database");
                        }
                        else navigate('/Preview', {state: {
                            user: data.username,
                            name: data.videoname,
                            url: data.url,
                            id: 0
                        }});
                    }).catch((error) => {
                        console.log("POST request error", error);
                    });
            })
            .catch((err) => {
                setErr(true);
            })
    }

    async function parseUrl(url) {
        let apiurl = `https://www.tiktok.com/oembed?url=${url}`;
        let response = await fetch(apiurl);
        if (response.status !== 200) throw new Error('Invalid URL');
        let data = await response.json()
        console.log(data);
        console.log(data['author_unique_id']);
        const validUrl = new URL(url);
        let host = validUrl.hostname;
        if (host !== "www.tiktok.com") {
            alert("Please enter a valid url from www.tiktok.com");
            return;
        }
        let path = validUrl.pathname.split('/');
        if (path.length !== 4 || path[2] !== "video") {
            alert("Invalid tiktok url");
            return;
        }
        let username = path[1].substring(1);
        console.log(username, data['author_unique_id']);
        if(username !== data['author_unique_id']) throw new Error('Invalid User');
        let vidId = path[3];
        return [username, vidId];
    }
}

export default SubmitVideo;