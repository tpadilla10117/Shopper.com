import React from 'react';
import { Send } from "@material-ui/icons";

function Newsletter() {
  return (
    <section className='newsletter-parent-container'>
        <h1 className='newsletter-title'>
            Sign Up For Email Alerts
        </h1>
        <p className='newsletter-description'>
            You'll receive exclusive offers and first access to products.
        </p>

        <div className='newsletter-info-parent-container'>
            <input 
                className='newsletter-info-input'
                placeholder='Enter Your Email'
            />
            <button>
                <Send />
            </button>
        </div>
    </section>
  )
}

export default Newsletter;