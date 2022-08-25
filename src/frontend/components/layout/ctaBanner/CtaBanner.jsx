import React from 'react';

function CtaBanner( {
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
    descriptionRef
} ) {

  return (
    <section className='ctaBanner-parent-container'>
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
            </figcaption>

        </figure>
    </section>
  )
}

export default CtaBanner;