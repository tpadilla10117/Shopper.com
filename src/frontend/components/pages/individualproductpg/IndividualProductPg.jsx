import React from 'react';
import { Add, Remove } from "@material-ui/icons";

function IndividualProductPg() {
  return (
    <section className='individualProductPg-parent-container'>
        <div className='individualProductPg-wrapper'>
            <figure
                className='individualProductPg-img-container'
            >
                <img 
                    src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                    alt=''
                />
            </figure>

            <div
                className='individualProductPg-info-container'
            >

                <h1 className='individualProductPg-info-title'>
                    Sample Product
                </h1>

                <p
                    className='individualProductPg-info-description'
                >
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donecvenenatis, dolor in finibus malesuada, lectus ipsum porta nunc, atiaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget tristique tortor pretium ut. Curabitur elit justo, consequat id condimentum ac, volutpat ornare.
                </p>
                <span className='individualProductPg-info-price'>$200
                </span>

                <div 
                    className='individualProductPg-info-quantity-container'
                >
                    <div
                        className='individualProductPg-info-quantity-totals'
                    >
                        <Remove />
                        <span
                            className='individualProductPg-info-quantity'
                        >0
                        </span>
                        <Add />
                    </div>
                </div>

            </div>
        </div>
    </section>
  )
}

export default IndividualProductPg;