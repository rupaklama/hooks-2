import React, { useState, useEffect } from "react";

// All uppercase to signify global data for the project
import PICTURES from "./data/pictures";

function Gallery() {
 const [index, setIndex] = useState(0);

 useEffect(() => {
  const interval = setInterval(() => {
   setIndex(storedIndex => {
    return (storedIndex + 1) % PICTURES.length;
   });
  }, 3000);

  // cleanup function
  return () => {
    clearInterval(interval);
  }
  // eslint-disable-next-line
 }, []);

 
 return (
  <div className="Gallery">
   <img src={PICTURES[index].image} alt="gallery" />
  </div>
 );
}

export default Gallery;
