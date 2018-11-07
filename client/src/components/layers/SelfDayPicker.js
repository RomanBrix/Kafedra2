import React, {Component} from 'react';
import DayPicker from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/uk';
import moment from "moment";


export default class SelfDayPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDay: new Date(props.selectDay),
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
        const { setDay, selectedDay } = this.props;
        const { consult } = this.props;
        // console.log(consult);
        const modifiersStyles = {
            consultDay: {
                color: '#ffc107',
                backgroundColor: '#fffdee',
            },
        };
        let modifiers = {
            consultDay: { },
        };

        // console.log(consult);
        // console.log(selectedDay)
        if(consult !== undefined){
            modifiers = {
                consultDay: { daysOfWeek: [(moment(consult).weekday()) + 1] },
            };
        }


        return (
            <DayPicker
                selectedDays={selectedDay}
                onDayClick={setDay}
                localeUtils={MomentLocaleUtils}
                modifiersStyles={modifiersStyles}
                modifiers={modifiers}
                locale={'uk'}
            />
        )
    }
}