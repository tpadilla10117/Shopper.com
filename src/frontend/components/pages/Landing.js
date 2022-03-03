/* TODO: This page is for when a user first travels to the site: */
import React from 'react';
import {Directory, HeroBanner} from '../utils';

const Landing = () => {
  return (
    <section className='landing-parent-container'>
      <HeroBanner />
      <Directory />
      {/* <LandingLogin /> */}
      {/* <Signin /> */}

    </section>
  );
};

export default Landing