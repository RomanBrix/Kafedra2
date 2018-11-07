import React, { Component } from 'react';
import {Link } from "react-router-dom";

export default class MiniHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            feedback: false,
            leftForStyle: 0
        }
    }
    render () {
        const{ feedback, leftForStyle } = this.state;
        const { socials_links } = this.props;
        return (
            <div className="mini-header">
                <ul className='mini-menu'>
                    <Link to="/"><li>Головна</li></Link>
                    <Link to="/news"><li>Новини</li></Link>
                    <Link to="/events"><li>Подiї</li></Link>
                    <li onClick={({target})=>{
                        const fromLeft = target.offsetLeft;
                        const itemWidth = target.offsetWidth;
                        console.log(itemWidth);
                        document.body.classList.toggle('non-scroll');
                        this.setState({
                            feedback: !feedback,
                            leftForStyle: (fromLeft + (itemWidth / 2)) - 100
                        })
                    }}>Задати питання</li>
                    <Link to="/contacts"><li>Контакти</li></Link>
                </ul>
                {
                    feedback ?
                        <div className="header-feedback" onClick={()=>{
                            document.body.classList.toggle('non-scroll');
                            this.setState({
                                feedback: false
                            })
                        }}>
                            <div className="header-feedback-container" style={{left: `${leftForStyle}px`}} onClick={(e)=>{
                                e.stopPropagation();
                            }}>
                                <input type="text" id='headerName' name={'name'} ref={'headerName'} placeholder={'Iм`я'}/>
                                <input type="text" id='headerMail' name={'mail'} ref={'headerMail'} placeholder={'E-Mail'}/>
                                <textarea name="msg" id="headerMsg" ref={'headerMsg'} placeholder={'Питання'}/>
                                <div className="btn-send" onClick={()=>{
                                    const { headerName, headerMail, headerMsg } = this.refs;
                                    console.log(headerName.value, headerMail.value, headerMsg.value);

                                }}>Задати Питання</div>
                            </div>
                        </div>
                        : ''
                }
                <ul className="mini-socials">
                    <a href={socials_links.youtube} target='_blank'><li><i className='icon-youtube-play'/></li></a>
                    <a href={socials_links.instagram} target='_blank'><li><i className='icon-instagram'/></li></a>
                    <a href={socials_links.twitter} target='_blank'><li><i className='icon-twitter'/></li></a>
                   <a href={socials_links.facebook} target='_blank'> <li><i className='icon-facebook'/></li></a>


                    {/*<li className={`language`}>*/}

                        {/*UA <i className='icon-angle-down'/>*/}
                        {/*<ul className="submenu">*/}
                            {/*<li>UA</li>*/}
                            {/*<li>ENG</li>*/}
                        {/*</ul>*/}
                    {/*</li>*/}
                </ul>
            </div>
        )
    }
}