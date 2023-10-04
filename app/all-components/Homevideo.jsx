'use client'

 import React, { useEffect } from 'react';

const VideoPlayer = ({ videoSrc }) => {
  useEffect(() => {
    const video = document.getElementById('videoPlayer');

    const handleVideoEnded = () => {
      video.currentTime = 0; // Reset the video to the beginning
      video.play();
    };

    if (video) {
      video.muted = true; // Mute the video if needed
      video.playsInline = true;
      video.addEventListener('ended', handleVideoEnded);
      video.play();
    }

    return () => {
      // Clean up the event listener when the component unmounts
      if (video) {
        video.removeEventListener('ended', handleVideoEnded);
      }
    };
  }, []);

  return (
    <div className=" flex items-center justify-center mt-2  backgroundContainer">
      <video className=' h-screen md:h-auto lg:w-screen '
      id="videoPlayer"  autoPlay>
        <source src={videoSrc} type="video/mp4" />
        
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;

 




