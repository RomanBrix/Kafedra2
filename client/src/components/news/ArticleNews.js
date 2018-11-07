import React, {Component} from 'react';
import moment from "moment";
import DraftJsReadOnly from "../layers/DraftJsReadOnly";

export default class ArticleNews extends Component {
    constructor(props){
        super(props);
        this.state = {
            req: false,
            news: {

            }
        }



        //Get news by id and set state for next work
        props.allFunctions('Get News By Id', {id:props.match.params.id}, (res)=>{
            // console.log(res);
            this.setState({
                news: res[0],
                req: true
            })
        })

    }
    render() {
        const { news, req } = this.state;
        const { history } = this.props;

        // console.log('news is, '+ news);
        if(req) {
            console.log(news);

            return (
                <div className="article-news">
                    <div className="news-is">
                        <h2 className='main-h2'>

                            <span className="underline" onClick={()=>{
                                history.push('/news');
                            }}> <i className='icon-angle-left'/>{news.title}</span>
                            <span className='little-head'>
                                <i className='icon-calendar'/> { moment(news.created).format('DD.MM.YYYY')} <i className='icon-clock'/> { moment(news.created).format('kk:mm')}
                             </span>
                        </h2>
                        <div className="content">
                            <DraftJsReadOnly willBeContent={news.content}/>
                        </div>
                    </div>
                </div>
            )
        }else{
            return '';
        }
    }
}