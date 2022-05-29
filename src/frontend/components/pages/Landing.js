/* TODO: This page is for when a user first travels to the site: */
import React from 'react';
import {
  Directory, 
  /* HeroBanner, */
  HeroBanner2,
  ProductFeed

} from '../utils';

const Landing = () => {
  return (
    <section className='landing-parent-container'>
      <HeroBanner2 />
      <Directory />
      <ProductFeed />
      {/* <LandingLogin /> */}
      {/* <Signin /> */}

    </section>
  );
};

export default Landing