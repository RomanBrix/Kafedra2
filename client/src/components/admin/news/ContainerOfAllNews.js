import React, {Component} from 'react';
import slide0 from "../../../difSrc/slider/slider0.jpg";
import moment from "moment";

export default class ContainerOfAllNews extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
        props.checkSesion();
        // console.log(this.props);
        props.allFunctions('Get News');
    }
    componentDidUpdate(){
        window.scrollTo(0,0);
    }
    render() {
        const { newsContainer, history } = this.props;
        console.log(this.props);

        const mapedNews = newsContainer.map((item, index)=>{

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
                    history.push(`/admin/news/${item._id}`);
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
                    <div className="btn-add" onClick={()=>{
                        history.push('/admin/news/empty');
                    }}>Добавить</div>
                    <div className="article-container">
                        {mapedNews}
                    </div>
                </div>
            </div>
        )
    }
}