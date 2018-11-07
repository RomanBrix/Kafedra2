import React, {Component} from 'react';
import MsgForm from "./MsgForm";

export default class Contacts extends Component {
    render() {
        const { socials_links } = this.props;
        return (
            <div className="contacts">
                <div className="contacts-container">
                    <MsgForm/>
                    <div className="contact">
                        <div className="top">
                            <ul className="mini-socials">
                                <a href={socials_links.youtube} target='_blank'><li><i className='icon-youtube-play'/></li></a>
                                <a href={socials_links.instagram} target='_blank'><li><i className='icon-instagram'/></li></a>
                                <a href={socials_links.twitter} target='_blank'><li><i className='icon-twitter'/></li></a>
                                <a href={socials_links.facebook} target='_blank'> <li><i className='icon-facebook'/></li></a>
                            </ul>
                            <div className="more">
                                <a href="mailto:kafedra.pis@gmail.com">
                                    <i className='icon-envelope'/>
                                    kafedra.pis@gmail.com
                                </a>
                                <a href="tel:0444814482">
                                    <i className='icon-phone'/>
                                    044 481 44 82
                                </a>
                                <a href="tel:0969239667">
                                    <i className='icon-phone'/>
                                    096 923 96 67
                                </a>
                                <a href="https://goo.gl/maps/MXFBKAiT6AE2"   rel="noopener noreferrer" target='_blank'>
                                    <i className='icon-map-marker'/> вулиця Богдана Гаврилишина, 24
                                </a>
                            </div>
                        </div>
                        <div className="bottom">
                            <iframe title='mapToUs' src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.226596846557!2d30.471851715731567!3d50.45550497947607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce80bb14c36b%3A0x5c4eb5067e6b48c6!2z0LLRg9C70LjRhtGPINCS0LDQvdC00Lgg0JLQsNGB0LjQu9C10LLRgdGM0LrQvtGXLCAyNCwg0JrQuNGX0LI!5e0!3m2!1suk!2sua!4v1495725083294&zoom=18`} frameBorder="0"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}