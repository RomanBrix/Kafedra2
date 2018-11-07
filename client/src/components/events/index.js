import React, {Component} from 'react';
// import DraftJsTextEditor from "../layers/DraftJsTextEditor";
// import SelfDayPicker from "../layers/SelfDayPicker";
import moment from "moment";

export default class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDay: null,
        }
        props.allFunctions('Get Events');
    }
    setDay(day, {selected}){
        this.setState({
            selectedDay: selected ? undefined : day,
        })
    }

    render() {
        // console.log(this.state.selectedDay);
        // console.log(new Date());
        const { eventsArray, history } = this.props;
        const mapedEvents = eventsArray
        // eslint-disable-next-line
            .map((item, index)=>{
                const dateLogo = moment(item.date).format('D MMMM').split(' ');

                return <div className="article" key={index} onClick={()=>{
                    history.push(`/events/${item._id}`)
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
                    <h2 className='main-h2'>
                        <span className="underline">
                            Всi подiї
                        </span>
                    </h2>

                    <div className="article-event">
                        { mapedEvents }
                    </div>
                    {/*<SelfDayPicker selectedDay={this.state.selectedDay} setDay={this.setDay.bind(this)}/>*/}
                    {/*<DraftJsTextEditor ourDate={this.state.selectedDay} allFunctions={this.props.allFunctions}/>*/}
                </div>
            </div>
        )
    }
}