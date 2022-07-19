import React, { useEffect, useState } from "react";
import { BsArrowBarUp } from "react-icons/bs";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <div
          onClick={scrollToTop}
          className=" bg-colorOne dark:bg-colorRed cursor-pointer flex justify-center items-center w-12 h-12 rounded-md shadow-lg self-end m-10"
          data-aos="fade-left"
          data-aos-duration="500"
        >
          <BsArrowBarUp className="text-white text-2xl font-bold" />
        </div>
      )}
    </>
  );
}
