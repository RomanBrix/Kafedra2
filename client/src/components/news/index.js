import React, {Component} from 'react';
import slide0 from "../../difSrc/slider/slider0.jpg";
import moment from "moment";
// import DraftJsTextEditor from "../layers/DraftJsTextEditor";
export default class News extends Component {
    constructor(props){
        super(props);
        props.allFunctions('Get News');
    }
    render() {
        // console.log(this.props);
        const { newsArray, history } = this.props;

        // console.log(newsArray);

        const mapedNews = newsArray.map((item, index)=>{

            let getTag = 'Навчання';
            switch (item.tag) {
                case 'edu':
                    getTag = <div className="tag mint-tag">Освiта</div>;
                    break;
                case 'paertners':
                    getTag = <div className="tag pink-tag" >Партнерство</div>;
                    break;
                case 'ent':
                    getTag = <div className="tag green-tag">Розваги</div>;
                    break;
                default:
                    getTag = '';
            }

            return (
                <div className="article" key={index + Math.floor(Math.random() * 1001)} onClick={()=>{
                    history.push(`/news/${item._id}`);
                }}>
                    <div className="img" style={{backgroundImage: `url(${slide0})`}}>
                        {getTag}
                    </div>
                    <div className="date">
                        <i className='icon-calendar'/> { moment(item.created).format('DD.MM.YYYY')} <i className='icon-clock'/> { moment(item.created).format('kk:mm')}
                    </div>
                    <div className="short-content">
                        {item.shortDesc}
                    </div>
                </div>
            )
        });



        return (
            <div className="news">
                <div className="news-container">
                    <h2> <span className='underline'>Всi новини</span> </h2>
                    <div className="article-container">
                        { mapedNews }
                    </div>
                </div>
                {/*<DraftJsTextEditor allFunctions={allFunctions} newsArray={newsArray}/>*/}
            </div>
        )
    }
}