'use client'
import { useState } from 'react';
import React from 'react'
import Image from 'next/image';
const ImageSection = ({productData}) => {
    
    const [mainImageUrl, setMainImageUrl] = useState(productData?.urls?.[0]); // Initialize with the default main image URL
  return (
    <div className=" md:w-2/5 md: h-fit md:mt-4 ">

                    {/* Main Image */}
                    <div className=' flex md:h-2/5 w-fit h-fit items-center'>
                        <Image
                            src={mainImageUrl} // <- Main Image URL
                            alt={productData.name}
                            
                            width={700} // Adjust width as needed
                            height={700} // Adjust height as needed
                            className="main-product-image"
                        />
                    </div>

                    {/* Thumbnail Images */}
                    <div className="flex gap-6 ml-2 mt-6 w-fit">
                        {productData?.urls?.filter(url => url !== mainImageUrl).map((thumb, index) => (
                            <Image
                                key={index}
                                src={thumb}
                                alt={`Thumbnail ${index}`}
                                width={70}
                                height={80}
                                className="thumbnail "
                                onClick={() => setMainImageUrl(thumb)} // Update main image URL on thumbnail click
                            />
                        ))}
                    </div>
                </div>

  )
}

export default ImageSection