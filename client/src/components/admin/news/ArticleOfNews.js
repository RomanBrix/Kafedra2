import React, {Component} from 'react';
import moment from "moment";
// import DraftJsReadOnly from "../../layers/DraftJsReadOnly";
import DraftJsTextEditor from "../../layers/DraftJsTextEditor";
import slide0 from "../../../difSrc/slider/slider0.jpg";

export default class ArticleOfNews extends Component {
    constructor(props){
        super(props);
        const paramsId = props.match.params.id;

        this.state = {
            news : {
                title: 'Оглавление',
                content: null,
                shortDesc: 'Краткое описание',
                tag: 'edu'
            },
            contForSave: {},
            req: paramsId === 'empty'
        };
        if (paramsId !== 'empty') {
            props.allFunctions('Get News By Id', {id: paramsId}, (res) => {
                // console.log(res);
                this.setState({
                    news: res[0],
                    req: true
                })
            })
        }
    }
    dropdownChanged(e){
        const newState = this.state.news;
        newState.tag = e.target.value;
        this.setState({
            news: newState
        });
    }
    changeTitle(e){
        const newState = this.state.news;
        newState.title = e.target.value;
        this.setState({
            news: newState
        });
    }
    changeShortDesc(e){
        const newState = this.state.news;
        newState.shortDesc = e.target.value;
        this.setState({
            news: newState
        });
    }
    getContentForSave(cont){

        this.setState({
            contForSave: cont
        })
    }
    render() {
        const { news, req, contForSave } = this.state;
        const { allFunctions, history } = this.props;

        let getTag = 'Навчання';
        switch (news.tag) {
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
        // const { history } = this.props;
// console.log(news);
        if(req) {
            return (
                <div className="article-news">
                    <div className="news-is">
                        <h2 className='main-h2'>
                            <span className="underline">
                               <input type="text" value={news.title} onChange={this.changeTitle.bind(this)} ref={'title'}/>
                            </span>
                            <span className='little-head'>
                                Tag:
                                <select name="tag" value={news.tag} onChange={this.dropdownChanged.bind(this)}>
                                    <option value="edu">Освiта</option>
                                    <option value="ent" >Розваги</option>
                                    <option value="paertners" >Партнерство</option>
                                </select>
                             </span>
                        </h2>

                        <div className="content">
                            <div className="block-all">
                                <h3>Краткое описание:</h3>
                                <textarea name="shortDesc" id="shortDesc" ref={'shortDesc'} value={news.shortDesc} onChange={this.changeShortDesc.bind(this)}/>
                                <div className="preview">
                                    <h3>Предпросмотр:</h3>
                                    <div className="block">
                                        <div className="article">
                                            <div className="img" style={{backgroundImage: `url(${slide0})`}}>
                                                {getTag}
                                            </div>
                                            <div className="date">
                                                <i className='icon-calendar'/> { moment(news.created).format('DD.MM.YYYY')} <i className='icon-clock'/> { moment(news.created).format('kk:mm')}
                                            </div>
                                            <div className="short-content">
                                                {news.shortDesc}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           </div>
                            <DraftJsTextEditor content={news.content} getContentForSave={this.getContentForSave.bind(this)}/>
                        </div>



                        {
                            this.props.match.params.id === 'empty' ?
                                <div className='btn-add'  onClick={()=>{

                                    // console.log(contForSave);
                                    allFunctions('Add news', {
                                        title: news.title,
                                        content: contForSave,
                                        shortDesc: news.shortDesc,
                                        tag: news.tag,
                                    }, ()=>{
                                        // allFunctions('Get News');
                                        history.push('/admin/news');
                                    });
                                }}>Добавить</div>
                                :
                                <div className="btns">
                                    <div className="btn-save" onClick={()=>{

                                        allFunctions('Update News By Id',{
                                            title: news.title,
                                            content: contForSave,
                                            shortDesc: news.shortDesc,
                                            tag: news.tag,
                                            id: this.props.match.params.id
                                        }, () => {
                                            alert('Сохраненно!');
                                            history.push('/admin/news');
                                        });
                                        // console.log(contForSave);
                                    }}>Сохранить</div>
                                    <div className="btn-delete" onClick={()=>{
                                        //eslint-disable-next-line
                                        if(confirm('Удалить?')) {
                                            allFunctions('Delete News By Id', {id: this.props.match.params.id}, () => {
                                                history.push('/admin/news');
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