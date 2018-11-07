import React, {Component} from 'react';
import logo_src from '../../difSrc/logo.png';
import {Link} from "react-router-dom";


export default class MobHeader extends Component {
    render() {
        return (
            <div className="mob-header" id={'mobHeader'}>
                <div className="close" onClick={()=>{
                    const mobHead = document.getElementById('mobHeader');
                    mobHead.classList.toggle('HeadOpen');
                }}>
                    X
                </div>
                <div className="logo" onClick={()=>{
                    const mobHead = document.getElementById('mobHeader');
                    mobHead.classList.toggle('HeadOpen');
                }}>
                    <Link to={'/'}>
                        <div className="img-logo">
                            <img src={logo_src} alt=""/>
                        </div>
                        <div className="text-logo">
                            <div className="top">
                                Прикладні <br/>інформаційні системи
                            </div>
                            <div className="bottom">
                                Правильний вибір
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="menu">
                    <ul onClick={()=>{
                        const mobHead = document.getElementById('mobHeader');
                        mobHead.classList.toggle('HeadOpen');
                    }}>
                        <li><Link to={'/about'}>Про кафедру</Link></li>
                        <li><Link to={'/applicants'}>Абітурієнтам </Link></li>
                        <li><Link to={'/progress'}>Розвиток Кафедри</Link></li>
                        <li><Link to={'/lecturers'}>Викладачі</Link></li>
                        <li><Link to={'/oprivet'}>Графіки</Link></li>
                        <li><Link to="/news">Новини</Link></li>
                        <li><Link to="/events">Подiї</Link></li>
                        <li><Link to="/contacts">Контакти</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}