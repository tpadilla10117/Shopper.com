import React from 'react';
import { CtaButton } from '../../utils';

function CtaBanner( {
    parentContainerClassName,
    figureClassName,
    image,
    imageClassName,
    imagealt,
    figCaptionClassName,
    title,
    titleClassName,
    titleRef,
    description,
    descriptionClassName,
    descriptionRef,
} ) {

  return (
    <section className={parentContainerClassName}>
        <figure className={figureClassName}>
            <img
                className={imageClassName}
                alt={imagealt}
                src={image}
            />

            <figcaption className={figCaptionClassName}>
                <h1 className={titleClassName}>
                    {title}
                </h1>
                <p className={descriptionClassName}>
                    {description}
                </p>

                <CtaButton 
                    text='Shop Mens'
                    myClass={'ctaBanner-ctaButton-groomsmen'}
                    /* onClick={''} */
                />
            </figcaption>

        </figure>
    </section>
  )
}

export default CtaBanner;