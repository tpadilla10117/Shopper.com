/* The Section container for the menuItem components on the Landing Page: */
    import React, { useState } from 'react';
    import { MenuItem } from '../../utils.js';
    import { NavLink } from 'react-router-dom';

    
    function Directory() {

        const [sections] = useState([
            {
                title: 'hats',
                imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
                id: 1,
                linkUrl: 'shop/products/hats'
              },
              {
                title: 'jackets',
                imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
                id: 2,
                linkUrl: 'shop/products/jackets'
              },
              {
                title: 'sneakers',
                imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
                id: 3,
                linkUrl: 'shop/products/sneakers'
              },
              {
                title: 'womens',
                imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
                size: 'large',
                id: 4,
                linkUrl: 'shop/products/womens'
              },
              {
                title: 'mens',
                imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
                size: 'large',
                id: 5,
                linkUrl: 'shop/products/mens'
              }
        ])

        return (
          <section className='directory-parent-container'>
              
                  {
                      sections.map( ({id,...otherSectionProps}) => (
                        <NavLink key={id} exact='true' to={otherSectionProps.linkUrl} activeclassname='active'
                        className='directory-nav-item'>
                          <MenuItem key={id} {...otherSectionProps}></MenuItem>
                        </NavLink>
                      ))
                  }

              

          </section>
        )
    }
    
    export default Directory;