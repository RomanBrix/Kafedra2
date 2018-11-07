import React, {Component} from 'react';
import moment from "moment";
import DraftJsTextEditor from "../../layers/DraftJsTextEditor";
import SelfDayPicker from "../../layers/SelfDayPicker";

export default class ArticleOfEvents extends Component {
    constructor(props){
        super(props);
        const paramsId = props.match.params.id;
        this.state = {
            req: paramsId === 'empty',
            event: {
                title: 'Оглавление',
                desc: null,
                date: new Date()
            },
            contForSave: {}
        }



        //Get event by id and set state for next work
        // console.log(props.match.params.id);
        if (paramsId !== 'empty') {
            props.allFunctions('Get Events By Id', {id: props.match.params.id}, (res) => {
                // console.log(res);
                this.setState({
                    event: res[0],
                    req: true
                })
            })
        }

    }
    changeTitle(e){
        const newState = this.state.event;
        newState.title = e.target.value;
        this.setState({
            event: newState
        });
    }
    getContentForSave(cont){

        this.setState({
            contForSave: cont
        })
    }

    setDay(day, { selected }) {
        const newState = this.state.event;
        newState.date = selected ? new Date() : new Date(day);

        this.setState({
            event: newState
        });
    }
    render() {
        const { event, req, contForSave } = this.state;
        const { history, allFunctions } = this.props;

        if(req) {
            console.log(event);
            const dateLogo = moment(event.date).format('D MMMM').split(' ');

            return (
                <div className="article-news">
                    <div className="news-is">
                        <h2 className='main-h2'>
                            <span className="underline">
                                <input type="text" value={event.title} onChange={this.changeTitle.bind(this)}/>
                            </span>
                            <span className='little-head'>
                                <i className='icon-calendar'/> { moment(event.date).format('DD.MM.YYYY')}
                             </span>
                        </h2>
                        <div className="content content-for-events">
                            <div className="left">
                                <h3>Дата проведения:</h3>
                                <p><span className='little-head'>
                                    <i className='icon-calendar'/> { moment(event.date).format('DD.MM.YYYY')}
                                 </span></p>
                                <SelfDayPicker selectedDay={new Date(event.date)} setDay={this.setDay.bind(this)}/>
                            </div>
                            <div className="right">
                                <h3>Предпросмотр:</h3>
                                <div className="preview-event">
                                    <div className="article">
                                        <div className="date-logo">
                                            <span className="number">{dateLogo[0]}</span>
                                            <span className="month">{dateLogo[1]}</span>
                                        </div>
                                        <div className="title">{event.title}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="all">
                                <DraftJsTextEditor getContentForSave={this.getContentForSave.bind(this)} content={event.desc}/>
                            </div>
                        </div>

                        {
                            this.props.match.params.id === 'empty' ?
                                <div className='btn-add'  onClick={()=>{

                                    console.log(contForSave);
                                    allFunctions('Add events', {
                                        title: event.title,
                                        date: event.date,
                                        desc: contForSave
                                    }, ()=>{
                                        history.push('/admin/events');
                                    });
                                }}>Добавить</div>
                                :
                                <div className="btns">
                                    <div className="btn-save" onClick={()=>{

                                        allFunctions('Update Event By Id',{
                                            title: event.title,
                                            date: event.date,
                                            desc: contForSave,
                                            id: this.props.match.params.id
                                        }, () => {
                                            alert('Сохраненно!');
                                            history.push('/admin/events');
                                        });
                                        // console.log(contForSave);
                                    }}>Сохранить</div>
                                    <div className="btn-delete" onClick={()=>{
                                        //eslint-disable-next-line
                                        if(confirm('Удалить?')) {
                                            allFunctions('Delete Event By Id', {id: this.props.match.params.id}, () => {
                                                history.push('/admin/events');
                                            })
                                        }
                                    }}>Удалить</div>
                                </div>
                        }
                    </div>
                </div>
            )
        }else{
            return '';
        }
    }
}