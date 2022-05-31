/* This page is for when a user first travels to the site: */
import React from 'react';
import {
  Directory, 
  HeroBanner2,
  ProductFeed,
  Newsletter
} from '../../utils';

const Landing = () => {
  return (
    <section className='landing-parent-container'>
      <HeroBanner2 />
      <Directory />
      <ProductFeed />
      <Newsletter />
    </section>
  );
};

export default Landing