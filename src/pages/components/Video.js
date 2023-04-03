import '../styles/videoStyle.css';

function Video(props) {
    let fullURL = `https://www.tiktok.com/@${props.user}/video/${props.url}`;
    return (
        <div className="Video">
            <blockquote className = "tiktok-embed" cite = {fullURL} data-video-id = {props.url}>
                <section>

                </section>
            </blockquote>
            <script async src = 'https://www.tiktok.com/embed.js' id = 'tiktokScript'></script>
        </div>
    );
}

export default Video;