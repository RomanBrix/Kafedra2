import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo_src from '../../difSrc/logo.png';


export default class Header extends Component {
    render () {
        return (
            <div className="header">
                <div className="logo">
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
                    <ul>
                        <li><Link to={'/about'}>Про кафедру</Link></li>
                        <li><Link to={'/applicants'}>Абітурієнтам </Link></li>
                        <li><Link to={'/progress'}>Розвиток Кафедри</Link></li>
                        <li><Link to={'/lecturers'}>Викладачі</Link></li>
                        <li><Link to={'/oprivet'}>Графіки</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}