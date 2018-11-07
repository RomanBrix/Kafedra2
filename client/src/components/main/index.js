import React, { Component } from 'react';
import Slider from "./Slider";
import News from "./News";
import Events from "./Events";

export default class Main extends Component {
    render () {
        // console.log(this.props);
        return (
            <div className="main">
                <Slider/>
                <News history={this.props.history} allFunctions={this.props.allFunctions} newsArray={this.props.newsArray}/>
                <Events history={this.props.history} allFunctions={this.props.allFunctions} eventsArray={this.props.eventsArray}/>

            </div>
        )
    }
}