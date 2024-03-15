import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Image from 'next/image';
import '@/app/styles/imagesection.css'

const ImageSection = ({ productData }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      {/* Main Image Swiper */}
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="bg-black mainSwiper "

      >
        {productData?.urls?.map((url, index) => (
          <SwiperSlide key={index}>
            <Image src={url} alt={`Image ${index}`} layout='fill' objectFit='contain' />
          </SwiperSlide>
        ))}
      </Swiper>



      {/* Thumbnails Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={false}
       
        slidesPerView={window.innerWidth > 768 ? 5 : 2} // Adjust based on screen width
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mt-1 thumbnailSwiper  "
      >
        {productData?.urls?.map((url, index) => (
          <SwiperSlide key={index} className='hover:border-b-2' >
            <Image className='hover:border-b-2' src={url} alt={`Thumbnail ${index}`}  layout='fill' objectFit='contain'  />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImageSection;
