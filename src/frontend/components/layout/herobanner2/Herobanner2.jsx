import React, {useState} from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import {
    carouselItems
} from '../../../seed';

function Herobanner2() {
  return (
    <section className='herobanner2-parent-container'>
        <div className='herobanner2-arrow-wrapper'>
            <ArrowLeftOutlined />
        </div>

        <div className='herobanner2-wrapper'>
            {carouselItems.map( (item) => (

                <div className='herobanner2-slide' key={item.id}>
                    <figure className='herobanner2-imgcontainer'>

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

        <div className='herobanner2-arrow-wrapper'>
            <ArrowRightOutlined />
        </div>
    </section>
  )
}

export default Herobanner2;