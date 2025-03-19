import { PiGooglePlayLogoFill, PiStarHalfFill } from "react-icons/pi";
import Video from "../../Components/Video/Video";
import "./Details.css";
import { MoviesContext } from "../../context/MoviesContext";
import { useContext, useEffect, useState } from "react";
import Item from "../../Components/Item/Item";
import { useParams } from "react-router-dom";
import { MdClose, MdExpandLess, MdExpandMore } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { GiArmoredBoomerang, GiTentaclesSkull } from "react-icons/gi";

const Details = () => {
  const [expandedImage, setExpandedImage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { movies } = useContext(MoviesContext);
  const { _id } = useParams();
  const [currentVideo, setCurrentVideo] = useState("");
  const [isOriginalVideo, setIsOriginalVideo] = useState(true); // 🔥 حالة لمعرفة الفيديو الحالي

  // ✅ تأكد من أن جميع الـ Hooks تُستدعى قبل أي return
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [_id]);

  // ✅ البحث عن الفيلم قبل تنفيذ أي return
  const details = movies?.find((movie) => String(movie._id) === _id);

  useEffect(() => {
    if (details?.videosURL[0]) {
      setCurrentVideo(details.videosURL[0]);
      setIsOriginalVideo(true); // عند تغيير الفيلم، نعيده إلى الفيديو الأصلي
    }
  }, [details]);

  if (!movies || movies.length === 0) {
    return (
      <div className="loading-container">
        <p className="loader"></p>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="loading-container">
        <p className="loader2"></p>
      </div>
    );
  }

  const changeVideo = () => {
    if (isOriginalVideo && details.videosURL[1]) {
      setCurrentVideo(details.videosURL[1]);
      setIsOriginalVideo(false);
    } else {
      setCurrentVideo(details.videosURL[0]);
      setIsOriginalVideo(true);
    }
  };

  // أضف هذا داخل الـ component

  const handleImageClick = (img) => {
    setExpandedImage(img);
    document.body.style.overflow = "hidden"; // 🔥 تعطيل السكورل
  };

  const closeImage = () => {
    setExpandedImage(null);
    document.body.style.overflow = "auto"; // 🔥 إعادة السكورل
  };

  return (
    <div className="details astro">
      <div className="box-details astro">
        <div key={details._id} className="box-top astro">
          <div className="box-video astro">
            <Video videoSrc={currentVideo} title={details.title} />
          </div>
          <div className="box-title astro">
            <div className="box-text astro">
              <h3>{details.title}</h3>
              <div className="box-info astro">
                <p>{details.genre}</p>
                <span className="dot"></span>
                <p>
                  <PiStarHalfFill className="star" />
                  {details.rating}
                </p>
              </div>
            </div>
            <hr />
            <div className="box-btn astro">
              <button onClick={changeVideo}>
                {isOriginalVideo ? "Watch movie" : "Watch trailer"}
                <PiGooglePlayLogoFill className="icon" />
              </button>
            </div>
          </div>
          <div className="box-description astro">
            <p>
              {isExpanded || details.desc.length <= 100
                ? details.desc
                : `${details.desc.slice(0, 100)}... `}
              {details.desc.length > 100 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="more-btn"
                >
                  {isExpanded ? <GiTentaclesSkull /> : <GiArmoredBoomerang />}
                </button>
              )}
            </p>
          </div>
          <div className="box-images astro">
            {[details.images[0], details.images[1], details.poster].map(
              (img, index) =>
                img && (
                  <img
                    key={index}
                    src={img}
                    alt={details.title}
                    className="astro small-image"
                    onClick={() => handleImageClick(img)}
                  />
                )
            )}
          </div>
          {expandedImage && (
            <div className="image-overlay" onClick={closeImage}>
              <img
                src={expandedImage}
                alt="Expanded"
                className="expanded-image"
              />
              <button className="close-button" onClick={closeImage}>
                <MdClose />
              </button>
            </div>
          )}
        </div>
        <div className="box-card-details astro">
          {[...movies]
            .sort(() => 0.5 - Math.random())
            .slice(0, 5)
            .map((movie) => (
              <Item key={movie._id} {...movie} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Details;

// import { PiGooglePlayLogoFill, PiStarHalfFill } from "react-icons/pi";
// import Video from "../../Components/Video/Video";
// import "./Details.css";
// import { MoviesContext } from "../../context/MoviesContext";
// import { useContext, useEffect, useState } from "react";
// import Item from "../../Components/Item/Item";
// import { useParams } from "react-router-dom";

// const Details = () => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const { movies } = useContext(MoviesContext);
//   const { _id } = useParams();
//   const [currentVideo, setCurrentVideo] = useState("");
//   const [isOriginalVideo, setIsOriginalVideo] = useState(true); // 🔥 حالة لمعرفة الفيديو الحالي

//   // ✅ تأكد من أن جميع الـ Hooks تُستدعى قبل أي return
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [_id]);

//   // ✅ البحث عن الفيلم قبل تنفيذ أي return
//   const details = movies?.find((movie) => String(movie._id) === _id);

//   useEffect(() => {
//     if (details?.videosURL[0]) {
//       setCurrentVideo(details.videosURL[0]);
//       setIsOriginalVideo(true); // عند تغيير الفيلم، نعيده إلى الفيديو الأصلي
//     }
//   }, [details]);

//   if (!movies || movies.length === 0) {
//     return (
//       <div className="loading-container">
//         <p className="loader"></p>
//       </div>
//     );
//   }

//   if (!details) {
//     return (
//       <div className="loading-container">
//         <p className="loader2"></p>
//       </div>
//     );
//   }

//   const changeVideo = () => {
//     if (isOriginalVideo && details.videosURL[1]) {
//       setCurrentVideo(details.videosURL[1]);
//       setIsOriginalVideo(false);
//     } else {
//       setCurrentVideo(details.videosURL[0]);
//       setIsOriginalVideo(true);
//     }
//   };

//   return (
//     <div className="details astro">
//       <div className="box-details astro">
//         <div key={details._id} className="box-top astro">
//           <div className="box-video astro">
//             <Video videoSrc={currentVideo} title={details.title} />
//           </div>
//           <div className="box-title astro">
//             <div className="box-text astro">
//               <h3>{details.title}</h3>
//               <div className="box-info astro">
//                 <p>{details.genre}</p>
//                 <span className="dot"></span>
//                 <p>
//                   <PiStarHalfFill className="star" />
//                   {details.rating}
//                 </p>
//               </div>
//             </div>
//             <hr />
//             <div className="box-btn astro">
//               <button onClick={changeVideo}>
//                 {isOriginalVideo ? "Watch movie" : "Watch trailer"}
//                 <PiGooglePlayLogoFill className="icon" />
//               </button>
//             </div>
//           </div>
//           <div className="box-description astro">
//             <p>
//               {isExpanded || details.desc.length <= 100
//                 ? details.desc
//                 : `${details.desc.slice(0, 100)}... `}
//               {details.desc.length > 100 && (
//                 <button
//                   onClick={() => setIsExpanded(!isExpanded)}
//                   className="more-btn"
//                 >
//                   {isExpanded ? " Show less" : " more"}
//                 </button>
//               )}
//             </p>
//           </div>
//           <div className="box-images astro">
//             {[details.images[0], details.images[1], details.poster].map(
//               (img, index) =>
//                 img && (
//                   <img
//                     key={index}
//                     src={img}
//                     alt={details.title}
//                     className="astro"
//                   />
//                 )
//             )}
//           </div>
//         </div>
//         <div className="box-card-details astro">
//           {[...movies]
//             .sort(() => 0.5 - Math.random())
//             .slice(0, 5)
//             .map((movie) => (
//               <Item key={movie._id} {...movie} />
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Details;
