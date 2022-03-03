import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import outfit from '../../../assets/images/outfit.jpg';
import outfit2 from '../../../assets/images/outfit2.jpg';
import outfit3 from '../../../assets/images/outfit3.jpg';

function Herobanner() {
  return (
    <div className='herobanner-parent-container'>
        <div className='herobanner-wrapper'/>
        <Carousel 
            autoPlay
            infiniteLoop
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={5000}
        >

            <div>
                <img loading="lazy" src={outfit3} alt="" />
            </div>

            <div>
                <img loading="lazy" src={outfit2} alt="" />
            </div>

            <div>
                <img loading="lazy" src={outfit} alt="" />
            </div>

        </Carousel>

    </div>
  )
}

export default Herobanner;