import React, {Component} from 'react';
import {Route, Switch } from "react-router-dom";
import ContainerOfAllNews from "./news/ContainerOfAllNews";
import ArticleOfNews from "./news/ArticleOfNews";
import ContainerOfEvents from "./events/ContainerOfEvents";
import ArticleOfEvents from "./events/ArticleOfEvents";
import AllLect from "./lecturers/AllLect";
import ArticleLecture from "./lecturers/ArticleLecture";
import Enter from "./Enter";
import Settings from "./Settings";

export default class Admin extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: false
        };
       this.checkSesion((id)=>{
           // console.log(props.match);
           if(props.match.path === '/admin'){
               // console.log('will be check');
               // console.log(id);
               // console.log(props.history.goBack());
               props.allFunctions('Get Users By Id',{id: id}, (res)=>{
                   console.log('res is: ');
                   console.log(res);
                   if(res){
                       // props.history.goBack()
                       // console.log('session was checked');
                       this.setState({user: true});
                       if(props.history.location.pathname === '/admin'){
                           props.history.push('/admin/news');
                       };
                   }else{
                       this.setCookie('session', '',{
                           expires: -1,
                           path: '/'
                       });
                       props.history.push('/admin');
                   }
               })
           }
       });
    }
    ifEnter(opa){
        this.setState({
            user: opa
        })
    }
   checkSesion(f){
       const session = this.getCookie('session');
       if(session){
            if(f){
                f(session);
            }
       }else{
           this.setState({user: false});
           this.props.history.push('/admin');
           // props.allFunctions('Get Users');
       }
   }
    changeUser(id){
        this.setState({
            user: id
        })
    }
    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    setCookie(name, value, options) {
    options = options || {};

    let expires = options.expires;

    if (typeof expires === "number" && expires) {
        let d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + "=" + value;

    for (let propName in options) {
        updatedCookie += "; " + propName;
        let propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}
    render() {
        const { allFunctions, reduxStore, history } = this.props;
        return (
            <div className="admin">
                { this.state.user ?
                <div className="admin-head">
                    <div className="logo">
                        Admin-Panel
                    </div>
                    <ul className='menu'>
                        <li onClick={()=>{
                            history.push('/admin/news')
                        }}>Новости</li>
                        <li onClick={()=>{
                            history.push('/admin/events')
                        }}>События</li>
                        <li onClick={()=>{
                            history.push('/admin/lectures')
                        }}>Лекторы</li>
                        <li onClick={()=>{
                            history.push('/admin/settings')
                        }}>Настройки</li>
                        <li onClick={()=>{
                            this.ifEnter(false);
                            this.setCookie('session', '',{
                                expires: -1,
                                path: '/'
                            });
                            history.push('/admin')
                        }}>Выйти</li>
                    </ul>
                </div>
                    : ''
                }
                <Switch>
                    <Route exact path={`/admin`} render={ props => <Enter allFunctions={allFunctions} setCookie={this.setCookie.bind(this)} ifEnter={this.ifEnter.bind(this)} {...props}/>}/>

                    <Route exact path={`/admin/news`} render={ props => <ContainerOfAllNews allFunctions={allFunctions} newsContainer={reduxStore.news}  checkSesion={this.checkSesion.bind(this)} {...props}/>}/>
                    <Route path={`/admin/news/:id`} render={ props => <ArticleOfNews allFunctions={allFunctions}  {...props}/>}/>

                    <Route exact path={`/admin/events`} render={ props => <ContainerOfEvents allFunctions={allFunctions} eventsContainer={reduxStore.events}  checkSesion={this.checkSesion.bind(this)} {...props}/>}/>
                    <Route path={`/admin/events/:id`} render={ props => <ArticleOfEvents allFunctions={allFunctions}  {...props}/>}/>

                    <Route exact path={`/admin/lectures`} render={ props => <AllLect allFunctions={allFunctions}  checkSesion={this.checkSesion.bind(this)} {...props}/>}/>
                    <Route path={`/admin/lectures/:id`} render={ props => <ArticleLecture allFunctions={allFunctions}  {...props}/>}/>

                    <Route exact path={`/admin/settings`} render={ props => <Settings allFunctions={allFunctions}  checkSesion={this.checkSesion.bind(this)} {...props}/>}/>
                    <Route render={()=> <div> 404 NOT FOUND </div>} />
                </Switch>
            </div>
        )
    }
}