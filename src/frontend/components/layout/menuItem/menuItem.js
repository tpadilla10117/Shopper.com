/* The Section cards rendered in the Directory.jsx component: */
import React from 'react';

function menuItem({ title, imageUrl }) {
  
  return (
    <article className={`menu-item`}>
        
        <figure className='menu-item-background-image' style={ {backgroundImage: `url(${imageUrl})`}}>
        </figure>

        <div className='menu-item-content'>
            <h1 className='menu-item-title'>{title.toUpperCase()}</h1>
            <span className='menu-item-subtitle'>Shop Now</span>
        </div>

    </article>
  )
}

export default menuItem;