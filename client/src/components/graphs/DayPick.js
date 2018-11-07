import React, {Component} from 'react';
import DayPicker from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'rc-calendar/assets/index.css';
import 'moment/locale/uk';


export default class DayPick extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDay: null,
        }
    }

    handleDayClick(day, { selected }) {
        // console.log(day);
        // console.log(moment(day).format('MMM DD'));
        this.setState({
            selectedDay: selected ? undefined : day,
        });
    }
    render() {

        const { selectedDay } = this.state;
        const { consult } = this.props;
        console.log(consult);
        const modifiersStyles = {
            consultDay: {
                color: '#ffc107',
                backgroundColor: '#fffdee',
            },
        };
            let modifiers = {
                consultDay: { daysOfWeek: [4] },
            };
            if(consult !== undefined){
                modifiers = {
                    consultDay: { daysOfWeek: [consult.numOfDayWeek] },
                };
            }
        return (
            <DayPicker
                selectedDays={selectedDay}
                // onDayClick={this.handleDayClick.bind(this)}
                localeUtils={MomentLocaleUtils}
                locale={'uk'}
                canChangeMonth={false}
                pagedNavigation={false}
                showOutsideDays={true}
                modifiersStyles={modifiersStyles}
                modifiers={modifiers}
                // showOutsideDays
            />
        )
    }
}