import React, { Component } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import MiniHeader from "./components/layers/MiniHeader";
import Header from "./components/layers/Header";
import Main from "./components/main";
import Footer from "./components/layers/Footer";
import About from "./components/about";
import Progress from "./components/progress";
import Applicants from "./components/applicants";
import Lecturers from "./components/lecturers";
import { SOCIALS_LINKS } from './Links';
import Contacts from "./components/Contacts";
import Graph from "./components/graphs";
import GraphArticle from "./components/graphs/GraphArticle";
import News from "./components/news";
import { allFunctions } from './redux/front/front-actions';
import ArticleNews from "./components/news/ArticleNews";
import Events from "./components/events";
import ArticleEvent from "./components/events/ArticleEvent";
import Admin from "./components/admin";
import MobHeader from "./components/layers/MobHeader";

class App extends Component {
    constructor(props){
        super(props)

        document.title = 'KNU';
    }

    callApi = async (url) => {
        const response = await fetch(`/api/${url}`);
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };


  render() {
      // console.log(this.props);
      const reduxStore = this.props.front.toJS();
      // console.log(reduxStore);
      return (
        <Router>
            <div className="App">
                <MiniHeader socials_links={SOCIALS_LINKS}/>
                <Header socials_links={SOCIALS_LINKS}/>
                <MobHeader/>
                <div className="open-mob-header" onClick={()=>{

                    const mobHead = document.getElementById('mobHeader');
                    mobHead.classList.toggle('HeadOpen');
                    // console.log(document.body.style.overflow);
                    // document.body.style.overflow = 'hidden';

                }}>Меню</div>
                {
                    reduxStore.request ?
                        <div className='request-loading'>
                            <div>
                                Loading...
                            </div>
                        </div>
                        : ''
                }
                <Switch>
                    <Route exact path={`/`} render={ props => {
                        return (
                            <Main
                                allFunctions={this.props.allFunctions}
                                newsArray={reduxStore.news}
                                eventsArray={reduxStore.events}
                                {...props}
                            />
                        )
                    }}/>
                    <Route exact path={`/about`} render={ props => <About {...props}/>}/>
                    <Route exact path={`/progress`} render={ props => <Progress {...props}/>}/>
                    <Route exact path={`/applicants`} render={ props => <Applicants {...props}/>}/>
                    <Route exact path={`/lecturers`} render={ props => <Lecturers callApi={this.callApi.bind(this)} {...props}/>}/>
                    <Route exact path={`/contacts`} render={ props => <Contacts callApi={this.callApi.bind(this)}  socials_links={SOCIALS_LINKS} {...props}/>}/>
                    <Route exact path={`/oprivet`} render={ props => <Graph callApi={this.callApi.bind(this)}  socials_links={SOCIALS_LINKS} {...props}/>}/>
                    <Route exact path={`/oprivet`} render={ props => <Graph callApi={this.callApi.bind(this)} {...props}/>}/>
                    <Route path={`/oprivet/:id`} render={ props => <GraphArticle callApi={this.callApi.bind(this)} {...props}/>}/>

                    <Route exact path={`/news`} render={ props => <News allFunctions={this.props.allFunctions} newsArray={reduxStore.news} {...props}/>}/>
                    <Route path={`/news/:id`} render={ props => <ArticleNews allFunctions={this.props.allFunctions}  {...props}/>}/>

                    <Route exact path={`/events`} render={ props => <Events allFunctions={this.props.allFunctions} eventsArray={reduxStore.events} {...props}/>}/>
                    <Route path={`/events/:id`} render={ props => <ArticleEvent allFunctions={this.props.allFunctions}  {...props}/>}/>


                    <Route path={`/admin`} render={ props => <Admin allFunctions={this.props.allFunctions} reduxStore={reduxStore} {...props}/>}/>


                    <Route render={()=> <div> 404 NOT FOUND </div>} />
                </Switch>

                <Footer socials_links={SOCIALS_LINKS}/>
            </div>
        </Router>
    );
  }
}

// export default App;

const mapStateToProps = ( state ) => {
    return ({
        front: state.front
    })
};
export default connect(
    mapStateToProps,
    {
        allFunctions
    })(App);