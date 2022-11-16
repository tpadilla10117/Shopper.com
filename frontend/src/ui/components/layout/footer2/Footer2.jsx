import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Footer2Data,
    Footer2SocialMediaData
} from '../../seed.js';
import * as Scroll from 'react-scroll';

let scroll = Scroll.animateScroll;

const scrollToTopOfPage = () => {
		scroll.scrollToTop();
};


function Footer2() {

  return (
    <footer className='footer2-parent-container'>
        <div className='footer2-wrapper'>
            <p className='footer2-p-description'>

            </p>

            <h2 className='footer2-h2-title'>
                Directory
            </h2>

            <div className='footer2-links-container'>
                {
                    Footer2Data.map( (cardData) => {
                        return (
                            <div
                                key={cardData.footerLinksContainer}
                                className={cardData.footerLinksWrapper}
                            >
                                <div
                                    className={cardData.footerLinksItemsContainer}
                                >
                                    <h3
                                        className={cardData.footerLinkTitleClassName}
                                    >
                                        {cardData.footerLinkTitle}
                                    </h3>
                                    <NavLink
                                        to=''
                                        className='footer2-linksitems'
                                        style={{textDecoration: 'none'}}
                                    >
                                        {cardData.footerLink1}

                                    </NavLink>
                                    <NavLink
                                        to=''
                                        className='footer2-linksitems'
                                        style={{textDecoration: 'none'}}
                                    >
                                        {cardData.footerLink2}

                                    </NavLink>
                                    <NavLink
                                        to=''
                                        className='footer2-linksitems'
                                        style={{textDecoration: 'none'}}
                                    >
                                        {cardData.footerLink3}

                                    </NavLink>

                                </div>

                            </div>
                        )
                    })
                }
            </div>

            <section className='footer2-socialmedia-parent-container'>
                <div className='footer2-socialmedia-wrapper'>
                    <NavLink
                        to='/'
                        className='footer2-socialmedia-logo'
                        style={{ textDecoration: 'nonoe' }}
                        onClick={scrollToTopOfPage}
                    >
                        SHOPPER
                    </NavLink>
                </div>
            </section>

        </div>
    </footer>
  )

};

export default Footer2;