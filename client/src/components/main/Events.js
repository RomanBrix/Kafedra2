import React, {Component} from 'react';
import moment from 'moment';
// import 'rc-calendar/assets/index.css';

// import Calendar from 'rc-calendar';
import DayPicker from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/uk';

export default class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDay: null,
        };
        props.allFunctions('Get Events')
    }

    handleDayClick(day, { selected }) {
        // console.log(day);
        // console.log(moment(day).format('MMM DD'));
        this.setState({
            selectedDay: selected ? undefined : day,
        });
    }

    render() {
        const { history, eventsArray } = this.props;
        const { selectedDay } = this.state;
        const modifiers = { highlighted: eventsArray.map((item)=>{
                // console.log(item.date);
                // console.log(new Date(item.date));
            return new Date(item.date)
        })};

        const filterByThisDate = moment(selectedDay).format('MMMM DD');
        const mapedEvents = eventsArray
        // eslint-disable-next-line
            .filter((item)=>{
                if(selectedDay !== null && selectedDay !== undefined){
                    const itemDate = moment(item.date).format('MMMM DD');
                    if(itemDate === filterByThisDate){
                        return item;
                    }
                }else{
                    return item;
                }
            })
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
            <div className="events">
                <div className="events-container">
                    <h2>
                        <span className='underline'>
                            Календар подiй
                        </span>
                        <span className='little-head' onClick={()=>{
                            history.push('/events');
                        }}>
                            Всi подiї <i className='icon-angle-right'/>
                        </span>
                    </h2>

                    <div className="article-container">
                        <div className="own-calendar">
                            <DayPicker
                                selectedDays={selectedDay}
                                onDayClick={this.handleDayClick.bind(this)}
                                localeUtils={MomentLocaleUtils}
                                locale={'uk'}
                                modifiers={modifiers}
                                // showOutsideDays
                            />
                        </div>
                        <div className="articles">
                            { mapedEvents.length !== 0 ? mapedEvents.slice(0,4) : <h3>На цю дату немає подій, виберiть помiчену дату в календарi</h3>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}