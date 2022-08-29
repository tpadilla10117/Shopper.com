import React from 'react';
import { useSelector } from 'react-redux';


/* TODO: Need to finish and populate: */
/* - dynamic routing on click
    - product categories
    - product images
    - subcaption
    - DOUBLE CHECK YOUR SELECTORS for productCategories
*/
function ProductNavSlider() {

  return (
    <section className='productNavSlider-parent-container'>
        
        <div className='productNavSlider-wrapper'>

            <div className='productNavSlider-slide'>
                <img src='https://unsplash.it/1080/768' />
            </div>
            <div className='productNavSlider-slide'>
                <img src='https://unsplash.it/1080/768' />
            </div>
            <div className='productNavSlider-slide'>
                <img src='https://unsplash.it/1080/768' />
            </div>
            <div className='productNavSlider-slide'>
                <img src='https://unsplash.it/1080/768' />
            </div>
            <div className='productNavSlider-slide'>
                <img src='https://unsplash.it/1080/768' />
            </div>
            <div className='productNavSlider-slide'>
                <img src='https://unsplash.it/1080/768' />
            </div>
            <div className='productNavSlider-slide'>
                <img src='https://unsplash.it/1080/768' />
            </div>
            <div className='productNavSlider-slide'>
                <img src='https://unsplash.it/1080/768' />
            </div>
            <div className='productNavSlider-slide'>
                <img src='https://unsplash.it/1080/768' />
            </div>

        </div>
    </section>
  )
}

export default ProductNavSlider;