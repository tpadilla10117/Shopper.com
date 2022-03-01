
    import React from 'react';
    
    function menuItem({ title, imageUrl, size, history, linkUrl, match }) {
      return (
        <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
            
            <div className='menu-item-background-image' style={ {backgroundImage: `url(${imageUrl})`}}>
            </div>

            <div className='menu-item-content'>
                <h1 className='menu-item-title'>{title.toUpperCase()}</h1>
                <span className='menu-item-subtitle'>Shop Now</span>
            </div>

        </div>
      )
    }
    
    export default menuItem;