/*MBannerText */

"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const MBannerText = () => {
  return (
    <section className="w-full md:px-2.5 mt-6 lg:mt-12 lg:px-4 flex-center flex-col  ">
      <>
        {/*Banner Text */}
        <div className="flex-row  w-full pb-3">
          <h1 className="md:py-4 head_text text-center">
            Discover manufacturers, distributers & wholesalers on
            <br className="" />
            <div className="flex mt-4 flex-row justify-center">
              <Image
                src="/assets/icons/logo.svg"
                height={40}
                width={40}
                className="object-contain mx-2 flex md:hidden"
              />
              <Image
                src="/assets/icons/logo.svg"
                height={75}
                width={75}
                className="object-contain mx-2 hidden md:flex"
              />

              <span className="font-roboto green_gradient relative top-2 text-4xl lg:top-3 lg:text-7xl">
                Karkhanay
              </span>
            </div>
          </h1>
        </div>
      </>
    </section>
  );
};

export default MBannerText;
