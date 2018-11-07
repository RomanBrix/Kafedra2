import React, {Component} from 'react';
import moment from "moment";
import DraftJsReadOnly from "../layers/DraftJsReadOnly";

export default class ArticleEvent extends Component {
    constructor(props){
        super(props);
        this.state = {
            req: false,
            event: {
            }
        }



        //Get event by id and set state for next work
        // console.log(props.match.params.id);
        props.allFunctions('Get Events By Id', {id:props.match.params.id}, (res)=>{
            // console.log(res);
            this.setState({
                event: res[0],
                req: true
            })
        })

    }
    render() {
        const { event, req } = this.state;
        const { history } = this.props;

        if(req) {
            console.log(event);
            return (
                <div className="article-news">
                    <div className="news-is">
                        <h2 className='main-h2'>

                            <span className="underline" onClick={()=>{
                                history.push('/events');
                            }}> <i className='icon-angle-left'/>{event.title}</span>
                            <span className='little-head'>
                                <i className='icon-calendar'/> { moment(event.date).format('DD.MM.YYYY')}
                             </span>
                        </h2>
                        <div className="content">
                            <DraftJsReadOnly willBeContent={event.desc}/>
                        </div>
                    </div>
                </div>
            )
        }else{
            return '';
        }
    }
}