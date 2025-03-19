import "./Video.css";

const Video = ({ videoSrc, title }) => {
  const getYouTubeId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    );
    return match ? match[1] : null;
  };

  const getMediaEmbedUrl = (url) => {
    const youtubeId = getYouTubeId(url);
    if (youtubeId) return `https://www.youtube.com/embed/${youtubeId}`;

    const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

    const dailymotionMatch = url.match(
      /(?:dailymotion\.com\/video\/)([a-z0-9]+)/
    );
    if (dailymotionMatch)
      return `https://www.dailymotion.com/embed/video/${dailymotionMatch[1]}`;

    const facebookMatch = url.match(
      /(?:facebook\.com\/(?:.*\/)?videos\/)(\d+)/
    );
    if (facebookMatch)
      return `https://www.facebook.com/video/embed?video_id=${facebookMatch[1]}`;

    // ✅ دعم dooodStream
    const dooodMatch = url.match(/(?:doood\..+?\/[de]\/)([a-zA-Z0-9]+)/);
    if (dooodMatch) return `https://doood.wf/e/${dooodMatch[1]}`;

    // ✅ دعم vidply
    const vidplyMatch = url.match(/(?:vidply\.com\/e\/)([a-zA-Z0-9]+)/);
    if (vidplyMatch) return `https://vidply.com/e/${vidplyMatch[1]}?autoplay=1`;

    return url;
  };

  return (
    <div className="video">
      {videoSrc && !videoSrc.match(/\.(mp4|webm|ogg|mp3|wav)$/) && (
        <div className="box-iframe">
          <iframe
            className="iframe"
            src={getMediaEmbedUrl(videoSrc)}
            frameborder="0"
            // allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen="true"
            title={title}
          />
        </div>
      )}

      {videoSrc && videoSrc.match(/\.(mp4|webm|ogg)$/) && (
        <video controls muted playsInline autoPlay loop className="iframe">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {videoSrc && videoSrc.match(/\.(mp3|wav|ogg)$/) && (
        <audio controls className="iframe">
          <source src={videoSrc} type="audio/mp3" />
          Your browser does not support the audio tag.
        </audio>
      )}
    </div>
  );
};

export default Video;
