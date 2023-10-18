/*M1Carousel.jsx*/

"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const M1Carousel = () => {
  //window/screen size properties
  const lgScreenSize = 1024;
  const productDivWidth = 280;
  const productDivHeight = 130;
  const carouselMaxHeight = 420;
  const carouselMaxWidth = 1080;

  // Carousel
  /**Sample Nav Product List */
  const navProductList = [
    "Raw Materials",
    "Sports Items",
    "Clothing",
    "Minerals",

    "Medical Supplies",
    "Agricultural",
    "Hardware",
  ];

  //carousel image
  const imageLinks = [
    "/assets/images/carousel/HighlightCarousel1.svg",
    "/assets/images/carousel/HighlightCarousel1.svg",
    "/assebg-lime-100ts/images/carousel/HighlightCarousel1.svg",
  ];
  const selectedImageIndex = 0; // Index of the selected image from the array

  //carousel product images

  //carousel products
  const carousel1Products = [
    {
      id: 1,
      imageSrc:
        "/assets/images/products/H7023a060c8b54104a259eddebec3b7beu.jpg_960x960.webp",
      description:
        "Customized Eco Friendly 8oz Insulated Disposable Ripple Wall Paper Coffee Cup for Hot Drinks",
      price: "USD 0.0255 - 0.0288",
      moq: "100000 pcs",
    },
    {
      id: 2,
      imageSrc:
        "/assets/images/products/H946b11fa6e3745048aa45038d7030d964.jpg_960x960.webp",
      description:
        "Food grade biodegradable soup salad food packing box container food kraft paper bowls for disposable take-out",
      price: "USD 0.07 - 0.09",
      moq: "50 pcs",
    },
    {
      id: 3,
      imageSrc:
        "/assets/images/products/Hf589749ef3bd492793b1109e34e84a0dQ.jpg_960x960.webp",
      description:
        "High quality biodegradable double wall paper coffee cup with custom logo",
      price: "USD 0.05 - 0.25",
      moq: "500 pcs",
    },
    {
      id: 4,
      imageSrc:
        "/assets/images/products/H4ee42cbf16bd499caf661a4684a7ee7ft.jpg_960x960.webp",
      description:
        "Custom disposable salad paper box packaging food grade kraft paper box",
      price: "USD 0.01 - 0.02",
      moq: "10000 pcs",
    },
    {
      id: 5,
      imageSrc:
        "/assets/images/products/H3e3a3f09de854133b32af8d72e3e9471w.jpg_960x960.webp",
      description:
        "Custom printed 4oz 8 oz 10oz 300ml kraft soup bowl food packaging containers disposable paper ice cream cup with lids",
      price: "USD 0.01",
      moq: "1 piece",
    },
  ];
  // navProductList width to hide slide buttons
  const navProductsWidth = 850;

  // following for left right slide button functionality nav3
  const isReverse = false;
  const useChangeArrayOrder = (array, isReverse) => {
    const [productArray, setProductArray] = useState(array);

    const changeOrder = () => {
      const modifiedArray = [...productArray]; // Create a copy of the array

      if (isReverse) {
        const firstElement = modifiedArray.shift();
        modifiedArray.push(firstElement);
      } else {
        const lastElement = modifiedArray.pop();
        modifiedArray.splice(1, 0, lastElement);
      }

      setProductArray(modifiedArray); // Update state with the modified array
    };

    return [productArray, changeOrder];
  };

  const [productArray, changeOrder] = useChangeArrayOrder(navProductList, true);

  const handleSlide = (isReverse) => {
    changeOrder(isReverse);
  };
  // to hide scroll buttons nav 3
  const containerRef = useRef(null);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    const containerElement = containerRef.current;

    const handleResize = () => {
      const { clientWidth } = containerElement;
      setIsButtonVisible(clientWidth < navProductsWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial resize state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //end

  // Carousel resizing effect
  const parentRef = useRef(null);
  const firstChildRef = useRef(null);
  const secondChildRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const parentWidth = parseInt(
        window.getComputedStyle(parentRef.current).width,
        10
      );
      const lgCarouselWidth = parentWidth - productDivWidth;
      const lgCalcuatedHeight = Math.round(
        carouselMaxHeight * (lgCarouselWidth / carouselMaxWidth)
      );
      const CalcuatedHeight = Math.round(
        carouselMaxHeight * (parentWidth / carouselMaxWidth) + productDivHeight
      );
      if (screenWidth >= lgScreenSize) {
        parentRef.current.style.height = `${lgCalcuatedHeight}px`;
        secondChildRef.current.style.width = `${productDivWidth}px`;
        firstChildRef.current.style.width = `${lgCarouselWidth}px`;
      } else {
        parentRef.current.style.height = `${CalcuatedHeight}px`;
        secondChildRef.current.style.width = `${parentWidth}px`;
        firstChildRef.current.style.width = `${parentWidth}px`;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //!Carousel

  const [carouselImage, setCarouselImage] = useState(1);

  const prevSlide = () => {
    const isFirstSlide = carouselImage === 0;
    const newSlide = isFirstSlide ? imageLinks.length - 1 : carouselImage - 1;
    setCarouselImage(newSlide);
  };
  const nextSlide = () => {
    const isLastSlide = carouselImage === imageLinks.length - 1;
    const newSlide = isLastSlide ? 0 : carouselImage + 1;
    setCarouselImage(newSlide);
  };
  return (
    <section className="w-full flex-center flex-col ">
      {/*Carousel */}
      <>
        {/**Product Category List Nav (Tier3) */}
        <nav className="text-center items-center flex w-full  xl:justify-center bg-lime-100  ">
          {/**Product Nav */}
          <div className="  h-full w-full justify-between lg:justify-center text-md flex  ">
            {/**Scrollable Section */}
            <div className=" flex items-center  relative  overflow-x-hidden">
              <div className="hidden min-w-[30px] justify-center h-full relative     lg:hidden">
                {isButtonVisible && (
                  <button
                    className=" items-center flex "
                    onClick={() => handleSlide(true)}
                  >
                    <Image
                      alt={"Left Arrow"}
                      width={20}
                      height={20}
                      src="/assets/icons/chevron-left.svg"
                      className="mx-2"
                    />
                  </button>
                )}
              </div>
              <div
                ref={containerRef}
                className="flex-1  sm:justify-center overflow-hidden"
              >
                <ul className="flex h-full relative  whitespace-nowrap scrollbar-hide overflow-x-scroll ">
                  <li
                    key="Packaging"
                    className="flex   h-full flex-nowrap whitespace-pre "
                  >
                    <button className="sm:px-12 hover:bg-lime-200 border-b-4 border-lime-300 bg-lime-200 h-full  py-1 px-2">
                      Packaging
                    </button>
                  </li>
                  {productArray
                    .slice(1, productArray.length)
                    .map((element, index) => (
                      <li
                        key={index}
                        className="flex  h-full flex-nowrap whitespace-pre "
                      >
                        <button className="sm:px-8  h-full  py-1 px-2">
                          {element}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {isButtonVisible && (
              <div className="hidden relative min-w-[30px] items-center   justify-center lg:hidden">
                <button
                  className="flex w-full "
                  onClick={() => handleSlide(false)}
                >
                  <Image
                    alt={"Left Arrow"}
                    width={20}
                    height={20}
                    src="/assets/icons/chevron-right.svg"
                    className="mx-2"
                  />
                </button>
              </div>
            )}

            {/*!All products hidden flex*/}
            <div className="hidden  px-1.5 sm:pl-3 lg:pl-8 items-center ">
              <ul className="whitespace-nowrap flex ">
                <li className="underline font-semibold ">All</li>
                <li className="no-underline whitespace-pre">{"  "}</li>
              </ul>
            </div>
          </div>
        </nav>
        {/*carousel and featured products */}
        <div ref={parentRef} className="flex w-full flex-col lg:flex-row ">
          {/*carousel */}
          <div
            ref={firstChildRef}
            className="flex flex-shrink justify-start items-start relative"
          >
            <div className=" relative w-auto flex justify-start items-start  bg-center bg-cover duration-500">
              <Image
                src={imageLinks[carouselImage]}
                alt={`Selected Image`}
                width={1080}
                height={420}
                className=" object-contain"
              />
              {/*!hidden Arrows */}
              <div className="hidden absolute top-[40%] left-1 sm:left-5">
                <button onClick={() => prevSlide()}>
                  <Image
                    className="w-[30px] md:w-[50px] lg:w-[70px]"
                    alt={"Left Arrow"}
                    width={52}
                    height={52}
                    src="/assets/icons/chevron-left.svg"
                  />
                </button>
              </div>
              <div className="hidden absolute top-[40%] right-1 sm:right-5">
                <button onClick={() => nextSlide()}>
                  <Image
                    className="w-[30px] md:w-[50px] lg:w-[70px]"
                    alt={"Right Arrow"}
                    width={52}
                    height={52}
                    src="/assets/icons/chevron-right.svg"
                  />{" "}
                </button>
              </div>
            </div>
          </div>
          {/*featured products */}
          <div
            ref={secondChildRef}
            className="relative flex flex-row lg:flex-col overflow-scroll scrollbar-hide  lg:max-h-[420px] "
          >
            {/*lg:flex */}
            <div className="hidden  justify-center h-10 hover:bg-lime-200 ">
              <Image
                className="object-contain"
                alt={"Left Arrow"}
                width={52}
                height={52}
                src="/assets/icons/chevron-up.svg"
              />
            </div>
            {/*items */}
            <div className="flex flex-row  lg:flex-col overflow-scroll scrollbar-hide lg:max-h-[380px]  bg-gray-300 ">
              {/*individual product */}
              {carousel1Products.map((product) => (
                <Link
                  key={product.id}
                  href="/sampleproduct"
                  className={`flex  w-[280px] h-[${productDivHeight}px]  bg-gray-100 hover:bg-lime-100 mx-0.5 my-0 lg:mx-0 lg:my-0.5`}
                >
                  <div className="flex flex-col ">
                    <div
                      className={`p-0.5 pr-2 flex w-[${productDivWidth}px] flex-row`}
                    >
                      <div className="relative flex  flex-shrink-0 p-0.5 ">
                        <Image
                          src={product.imageSrc}
                          alt={product.description}
                          width={120}
                          height={120}
                          className="object-contain rounded-md "
                        />
                        <button className="absolute bottom-1 left-1  opacity-80">
                          <Image
                            src={"assets/icons/circle-plus-gray.svg"}
                            alt="Description of the image"
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </button>
                      </div>
                      <div className="pl-1 flex flex-col flex-shrink">
                        <p className="text-sm overflow-ellipsis overflow-hidden wrap  line-clamp-4">
                          {product.description}
                        </p>
                        <div className="pt-1">
                          <p className="text-xs font-semibold">
                            {product.price}
                          </p>
                          <p className="text-xs">
                            <span className=" font-semibold pr-0.5">MOQ:</span>{" "}
                            {product.moq}{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </Link>
              ))}
              <Link
                href="/sampleproduct"
                className={`flex  w-[280px] h-[${productDivHeight}px]  bg-gray-100 hover:bg-lime-100 mx-0.5 my-0 lg:mx-0 lg:my-0.5`}
              >
                <div className="flex flex-col ">
                  <div
                    className={`p-0.5 pr-2 flex w-[${productDivWidth}px] flex-row`}
                  >
                    <div className=" flex  items-center">
                      <p className="flex  p-2 text-lg underline underline-offset-4 font-bold ">
                        View all featured
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            {/*lg:flex  */}
            <div className="hidden justify-center h-10  hover:bg-lime-200 ">
              <Image
                className="object-contain"
                alt={"Left Arrow"}
                width={52}
                height={52}
                src="/assets/icons/chevron-down.svg"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-5 justify-center"></div>
        <div className=" shadow-slate-500 shadow-md  flex justify-center w-full min-h-[3px] bg-gray-400 text-center">
          <p className="  text-white font-semibold font-roboto py-2 text-lg">
            <span className=" hidden underline underline-offset-4">
              PACKAGING
            </span>{" "}
            &nbsp;FROM CUPS TO BOXES & CONTAINERS &nbsp;
          </p>
        </div>
      </>
    </section>
  );
};

export default M1Carousel;
