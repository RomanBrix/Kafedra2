import React, { Component } from 'react';
import slide0 from '../../difSrc/slider/slider2.jpg';
import slide1 from '../../difSrc/slider/slider1.jpg';
import slide2 from '../../difSrc/slider/slider3.jpg';
import slide3 from '../../difSrc/slider/slider4.jpg';

export default class Slider extends Component {
    constructor (props){
        super(props);
        this.state ={
            imgs: [slide0, slide1, slide2, slide3],
            active: 1
        }
    }

    autoPlay(){

        this.autoSlider = setInterval(()=>{
            this.nextSlide();
        },3500)
    }

    nextSlide(){
        const { active, imgs } = this.state;
        const firstSlide = document.getElementById('slide-0');


        if(firstSlide.style.marginLeft.length === 0) {
            firstSlide.style.marginLeft = '0%';
        }


        if(active !== imgs.length){
            const newMargin = +(firstSlide.style.marginLeft.split('%')[0]) - 100;
            firstSlide.style.marginLeft = `${newMargin}%`;
            this.setState({
                active: active + 1
            })
        }else{
            firstSlide.style.marginLeft = '0%';
            this.setState({
                active: 1
            })
        }
    }


    prevSlide(){
        const { active, imgs } = this.state;
        const firstSlide = document.getElementById('slide-0');


        if(firstSlide.style.marginLeft.length === 0) {
            firstSlide.style.marginLeft = '0%';
        }


        if(active !== 1){
            const newMargin = +(firstSlide.style.marginLeft.split('%')[0]) + 100;
            firstSlide.style.marginLeft = `${newMargin}%`;
            this.setState({
                active: active - 1
            })
        }else{
            firstSlide.style.marginLeft = `-${imgs.length - 1}00%`;
            this.setState({
                active: imgs.length
            })
        }
    }
    componentDidMount(){
        this.autoPlay();
    }
    componentWillUnmount(){
        clearInterval(this.autoSlider);
    }

    handleChangeSlide(target){

        if(target.classList.contains('dot') !== true) return;

        const slideWillBe = target.classList[1].split('-')[1];
        const firstSlide = document.getElementById('slide-0');
// eslint-disable-next-line
        if(slideWillBe == 1){
            firstSlide.style.marginLeft = `0%`;
            this.setState({
                active: 1
            })
        }else{
            firstSlide.style.marginLeft = `-${+slideWillBe - 1}00%`;
            this.setState({
                active: +slideWillBe
            })
        }
    }

    render () {
        // this.autoPlay();
        const { imgs, active } = this.state;

        let settingsDots = [];
        const mapedImgForSlider = imgs.map((item, index)=>{
            if(index === active -1){
                settingsDots.push(<div className={`dot dot-${index+1} active-dot`} key={index+10}/>);
            }else{
                settingsDots.push(<div className={`dot dot-${index+1}`} key={index+10}/>);
            }
            return <div className='slide' key={index} id={`slide-${index}`} style={{
                backgroundImage: `url(${item})`
            }}/>
        });

        return (
            <div className="slider" onMouseLeave={()=>{ this.autoPlay()}} onMouseEnter={()=>{clearInterval(this.autoSlider)}}>
                    <div className="arrow-left" onClick={()=>{ this.prevSlide()}}>
                        <i className='icon-angle-left'/>
                    </div>
                    <div className="arrow-right" onClick={()=>{this.nextSlide()}}>
                        <i className='icon-angle-right'/>
                    </div>
                <div className="slider-box">
                    { mapedImgForSlider }
                </div>

                <div className="settings-dots" onClick={({target})=>{ this.handleChangeSlide(target)}}>
                    { settingsDots }
                </div>
            </div>
        )
    }
}