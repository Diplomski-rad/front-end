import React, { useEffect, useState } from "react";
import axiosWithBearer from "../../infrastructure/auth/jwt/jwt.interceptor";
import { enviroment } from "../../env/enviroment";
import styles from "./dailymotion-player.module.css";
import Spinner from "../shared/Spinner/spinner";

interface DailymotionPlayerProps {
  videoId: string;
}

const DailymotionPlayer: React.FC<DailymotionPlayerProps> = ({ videoId }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const getUrl = async () => {
      try {
        const response = await axiosWithBearer.get<{ url: string }>(
          `${enviroment.apiHost}/api/videos/${videoId}/player`
        );
        setUrl(response.data.url);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    getUrl();
  }, [videoId]);

  return (
    <div className={styles["dailymotion-player"]}>
      {url ? ( // Conditionally render the iframe if the token is available
        // <iframe
        //   title="Dailymotion Video Player"
        //   frameBorder="0"
        //   width="100%"
        //   height="800"
        //   src={`https://www.dailymotion.com/embed/video/${videoId}?auth=${token}&enable_dm_logo=false`}
        //   allow="autoplay; fullscreen"
        //   allowFullScreen
        // ></iframe>
        <iframe
          title="Video player"
          width="100%"
          height="100%"
          src={url}
          allow="autoplay; fullscreen; picture-in-picture; web-share"
        ></iframe>
      ) : (
        <div className={styles["spinner-container"]}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default DailymotionPlayer;
