import React, {useState} from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import {
    carouselItems
} from '../../../seed';

function Herobanner2() {

  const [ carouselIndex, setCarouselIndex ] = useState(0);
  const handleCarouselClick = (direction) => {
      
      if( direction === 'left') {
          setCarouselIndex(carouselIndex > 0 ? carouselIndex - 1 : 2)
      } else {
          setCarouselIndex(carouselIndex < 2 ? carouselIndex + 1 : 0)
      }
      
  };



  return (
    <section className='herobanner2-parent-container'>
        <div className='herobanner2-arrow-wrapper'>
            <ArrowLeftOutlined />
        </div>

        <div className='herobanner2-wrapper'
            direction='left'
            onClick={() => handleCarouselClick("left")}
        >
            {carouselItems.map( (item) => (

                <div className='herobanner2-slide' key={item.id}>
                    <figure     className='herobanner2-imgcontainer'
                    >
                        <img src={item.img} alt='' />
                    </figure>
                    <div className='herobanner2-infocontainer'>
                        <h1 className='herobanner2-h1'>
                            {item.title}
                        </h1>
                        <p className='herobanner2-description'>
                            {item.desc}
                        </p>
                        <button className='herobanner2-btn'>
                            SHOP NOW
                        </button>
                    </div>
                </div>
            ))}

        </div>

        <div className='herobanner2-arrow-wrapper'
            direction='right'
            onClick={() => handleCarouselClick("right")}
        >
            <ArrowRightOutlined />
        </div>
    </section>
  )
}

export default Herobanner2;