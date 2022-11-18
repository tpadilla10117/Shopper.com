import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Footer2Data,
    Footer2SocialMediaData
} from '../../seed.js';
import { Accordion } from '../../utils.js';
import * as Scroll from 'react-scroll';

let scroll = Scroll.animateScroll;

const scrollToTopOfPage = () => {
		scroll.scrollToTop();
};


function Footer2() {

    return (
    <footer className='footer2-parent-container'>
        <div className='footer2-wrapper'>
            {/* <p className='footer2-p-description'>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable.
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable.
            </p> */}

            {/* <div className='footer2-center-section'>
                <h2 className='footer2-h2-title'>
                    Directory
                </h2>
            </div> */}

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

            {
                Footer2Data.map( (cardData, index) => {
                    return (
                        <Accordion
                            key={index}
                            index={index}
                            titleContent={cardData.footerLinkTitle}
                            navLink1={cardData.footerLink1}
                            navLink2={cardData.footerLink2}
                            navLink3={cardData.footerLink3}
                            navLink4={cardData.footerLink4}
                        />
                    )
                })
            }

            <section className='footer2-socialmedia-parent-container'>
                <div className='footer2-socialmedia-wrapper'>
                    <NavLink
                        to='/'
                        className='footer2-socialmedia-logo'
                        style={{ textDecoration: 'none' }}
                        onClick={scrollToTopOfPage}
                    >
                        SHOPPER
                    </NavLink>
                    <p
                        className='footer2-socialmedia-websiterights'
                    >
                        Trin Padilla © {new Date().getFullYear() } All rights reserved.
                    </p>
                    <div
                        className='footer2-socialmedia-socialicons'
                    >
                        {
                            Footer2SocialMediaData.map( (socialLink ) => {
                                return (
                                    <a
                                        key={socialLink.socialIcon} 
                                        href={socialLink.href}
                                        className='footer2-socialmedia-sociallinks'
                                        target={socialLink.target}
                                    >
                                        {socialLink.icon}
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
            </section>

        </div>
    </footer>
    )

};

export default Footer2;