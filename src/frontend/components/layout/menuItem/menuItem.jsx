/* The Section cards rendered in the Directory.jsx component: */
import React from 'react';

function menuItem({ title, imageUrl }) {
  
  return (
    <article className={`menu-item ${title}`}>
        
        <figure className='menu-item-background-image' style={ {backgroundImage: `url(${imageUrl})`}}>
        </figure>

        <div className='menu-item-content'>
            <h2 className='menu-item-title'>{title.toUpperCase()}</h2>
            <button 
              type='button'
              className='menu-item-subtitle'>
              Shop {title}
            </button>
        </div>

    </article>
  )
}

export default menuItem;