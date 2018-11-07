import React, {Component} from 'react';
import moment from 'moment';
import logo_src from '../../difSrc/logo.png';

export default class Footer extends Component {
    render() {
        const { socials_links } = this.props;
        return (
            <div className="footer">
                <div className="col col-3">
                    <div className="logo">
                        <img src={logo_src} alt=""/>
                        <div className="top">
                            Прикладні <br/>інформаційні системи
                        </div>
                    </div>
                    <div className="copyright-univ">
                        <i className='icon-copyright'/>
                        <span className='opis'>
                           <span>2016</span>-{moment(new Date()).format('YYYY')} Кафедра прикладних інформаційних систем.
                        </span>
                    </div>
                    <div className="copyright-romka">
                        Розробка <i className='icon-copyright'/> {moment(new Date()).format('YYYY')} <a href="">Ромка</a>
                    </div>
                </div>
                <div className="col col-3">
                    <h2>Контактна iнформацiя</h2>
                    <div className="footer-contacts">
                        <a href="https://goo.gl/maps/MXFBKAiT6AE2"   rel="noopener noreferrer" target='_blank'>
                            <i className='icon-map-marker'/> вулиця Богдана Гаврилишина, 24
                        </a>
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

                    </div>
                </div>
                <div className="col col-3">
                   <h2>Ми в соцiальних мережах</h2>
                    <ul className="mini-socials">
                        <a href={socials_links.youtube} target='_blank'><li><i className='icon-youtube-play'/></li></a>
                        <a href={socials_links.instagram} target='_blank'><li><i className='icon-instagram'/></li></a>
                        <a href={socials_links.twitter} target='_blank'><li><i className='icon-twitter'/></li></a>
                        <a href={socials_links.facebook} target='_blank'> <li><i className='icon-facebook'/></li></a>
                    </ul>
                </div>
                <div className="col col-1">Made with {`<`}3</div>
            </div>
        )
    }
}