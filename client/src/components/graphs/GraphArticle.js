import React, {Component} from 'react';
import moment from 'moment';
import DayPick from "./DayPick";
import photo_src from '../../difSrc/flipchart.svg';



export default class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lecture: {
                consult:{
                    isEmpty: true
                }
            }
        };
        // console.log(props.match);
        props.callApi(`lecturers/${props.match.params.id}`)
            .then((res)=>{
                this.setState({
                    lecture: res[0]
                })
            })
            .catch(err => console.log(err));
    }


    date_sort(date1, date2) {
        // This is a comparison function that will result in dates being sorted in
        // DESCENDING order.
        if (date1 > date2) return -1;
        if (date1 < date2) return 1;
        return 0;
    }
    render() {
        const { history } = this.props;
        const { lecture } = this.state;
        console.log(lecture);
        const sayHi = [];
        const consultDayPicker = [];
        let consultTime = '';
        if(lecture.photo){
            sayHi.push(
                <div className="img" style={{backgroundImage: `url(/src/teachers/${lecture.photo})`}} key={1}/>
            );
            if(!lecture.consult.isEmpty){
                consultTime = moment(lecture.consult.date[0]).format('k:m');
                const numOfDayWeek = (moment(lecture.consult.date[lecture.consult.date.length - 1]).weekday()) + 1;
                consultDayPicker.push(
                    <DayPick
                        consult={{
                            numOfDayWeek: numOfDayWeek
                        }}
                        key={1}
                    />
                )
            }
        }

        const pubtDayPicker = [];

        if(lecture.pubLessons){
            if(!lecture.pubLessons.isEmpty){
                // eslint-disable-next-line
                lecture.pubLessons.date.sort(this.date_sort).map((item, index)=>{
                    console.log(moment(new Date()))
                    console.log( moment(item));
                    console.log(moment(new Date()) < moment(item));
                    if(moment(new Date()) < moment(item)) {

                        pubtDayPicker.push(
                            <div className="open-lessons" key={index}>

                                <div className="photo">
                                    <img src={photo_src} alt="Oopsik_pupsik"/>
                                </div>
                                <div className="descr">
                                    <h3>{lecture.pubLessons.theme[index]}</h3>
                                    <p>В аудитрії: {lecture.pubLessons.aud[index]}</p>
                                    <h4><i className='icon-calendar'/>{moment(item).format('DD.MM.YYYY')} <i className='icon-clock'/> {moment(item).format('kk:mm')}</h4>
                                </div>
                            </div>
                        )
                    }
                })
            }
        }



        // console.log(lecture);
        return (
            <div className="graph-article">
                <div className="content">
                    <div className="hello" onClick={()=>{
                        history.push('/oprivet');
                    }}>
                        <i className='icon-angle-left'/>
                        {sayHi}
                        <div className="text">
                            <div className="name">
                                {lecture.name}
                            </div>
                        </div>
                    </div>
                    {!lecture.consult.isEmpty ?
                        <div className="consult">
                            <h2><span className="underline">Графiк Консультацій</span></h2>
                            <h3>{lecture.name}, зможе прийняти Вас в дати вiдмiченнi на календарi, о {consultTime}</h3>
                            {consultDayPicker}
                         </div>
                        : ''
                        }
                    <div className="publ-lessons">
                        <h2><span className="underline">Графiк Відкритих Занять</span></h2>

                        {
                            pubtDayPicker.length === 0 ?
                                <h3 className='its-all'>Всі відкриті заняття відбулись на данний момент!</h3>
                                :
                                <div className="pub-container">
                                    {pubtDayPicker}
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}