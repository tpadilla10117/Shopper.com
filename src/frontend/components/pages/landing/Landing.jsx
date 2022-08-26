/* This page is for when a user first travels to the site: */
import React from 'react';
import {
  Directory, 
  HeroBanner2,
  ProductFeed,
  Newsletter,
  ProductNavSlider,
  CtaBanner,
} from '../../utils';
import Groomsmen from '../../../assets/images/groomsmen.jpg';

const Landing = () => {
  return (
    <section className='landing-parent-container'>
      <ProductNavSlider />
      <HeroBanner2 />
      <Directory />
      <ProductFeed />
      <CtaBanner
        parentContainerClassName={'ctaBanner-parent-container-groomsmen'}
        figureClassName={'ctaBanner-img-wrapper-groomesmen'}
        image={Groomsmen}
        imageClassName={'ctaBanner-img-groomsmen'}
        imagealt={'Groomsmen posing for a beach picture'}
        figCaptionClassName={'ctaBanner-txt-wrapper-groomsmen'}
        title={'Dress To Impress'}
        titleClassName={'ctaBanner-title-groomsmen'}
        titleRef={'ctaBanner-titleref-groomsmen'}
        description={`Whether you're a guest, the groom, or a groomsman, show up in your best`}
        descriptionClassName={'ctaBanner-description-groomsmen'}
        descriptionRef={'ctaBanner-descriptionref-groomsmen'}
      />
      <Newsletter />
    </section>
  );
};

export default Landing