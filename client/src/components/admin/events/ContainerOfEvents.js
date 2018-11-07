import React, {Component} from 'react';
// import slide0 from "../../../difSrc/slider/slider0.jpg";
import moment from "moment";

export default class ContainerOfEvents extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
        props.checkSesion();
        props.allFunctions('Get Events');
    }
    componentDidUpdate(){
        window.scrollTo(0,0);
    }
    render() {
        const { eventsContainer, history } = this.props;
        console.log(this.props);

        const mapedEvents = eventsContainer.map((item, index)=>{
            const dateLogo = moment(item.date).format('D MMMM').split(' ');

            return <div className="article" key={index} onClick={()=>{
                        history.push(`/admin/events/${item._id}`)
                    }}>
                        <div className="date-logo">
                            <span className="number">{dateLogo[0]}</span>
                            <span className="month">{dateLogo[1]}</span>
                        </div>
                        <div className="title">{item.title}</div>
                    </div>
        });
        return (
            <div className="events-big">
                <div className="events-container">
                    <div className="btn-add" onClick={()=>{
                        history.push('/admin/events/empty');
                    }}>Добавить</div>
                    <div className="article-event">
                        {mapedEvents}
                    </div>
                </div>
            </div>
        )
    }
}