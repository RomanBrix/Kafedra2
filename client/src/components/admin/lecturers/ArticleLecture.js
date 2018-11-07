import React, {Component} from 'react';
import moment from "moment";
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import SelfDayPicker from "../../layers/SelfDayPicker";
import photo_src from "../../../difSrc/flipchart.svg";

export default class ArticleLecture extends Component {
    constructor(props){
        super(props);
        const paramsId = props.match.params.id;
        this.state = {
            req: paramsId === 'empty',
            lecture: {
                name: 'Имя',
                desc: ' ',
                photo: 'null',
                level: 10,
                consult:{
                    date: [undefined],
                    isEmpty: true
                },
                pubLessons:{
                    date: [],
                    aud: [],
                    theme: [],
                    isEmpty: true
                }
            },
            fileToUpload: null,
            newPubTime: new Date(),
            newPubDate: new Date(),
            imgPreview: null
        };



        //Get event by id and set state for next work
        // console.log(props.match.params.id);
        if (paramsId !== 'empty') {
            props.allFunctions('Get Lect By Id', {id: props.match.params.id}, (res) => {
                // console.log(res);
                this.setState({
                    lecture: res[0],
                    req: true
                })
            })
        }

    }
    changeTitle(e){
        const newState = this.state.lecture;
        newState.name = e.target.value;
        this.setState({
            lecture: newState
        });
    }
    changeLevel(e){
        const newState = this.state.lecture;
        newState.level = e.target.value;
        this.setState({
            lecture: newState
        });
    }
    setDay(day, { selected }) {
        const { lecture } =  this.state;
        const newState = lecture;

        const okDate = (moment(lecture.consult.date[0]).format('HH,mm')).split(',');
        const newDay = ((moment(day)).format('YYYY,MM,DD')).split(',');
        const newDate = moment(`${newDay[0]}-${newDay[1]}-${newDay[2]} ${okDate[0]}:${okDate[1]}`);

        newState.consult.date = selected ? [undefined] : [new Date(newDate)];

        if(newState.consult.date[0] !== undefined) {
            newState.consult.isEmpty = false
        }else{
            newState.consult.isEmpty = true
        }
        this.setState({
            event: newState
        });

    }
    setDayPub(day, { selected }) {

        this.setState({
            newPubDate: selected ? undefined : new Date(day)
        });

    }
    onChangeTime(value) {
        const { lecture } = this.state;
        const newState = this.state.lecture;

        const okDate = (moment(lecture.consult.date[0]).format('YYYY,MM,DD,HH,mm')).split(',');
        const newTime = (value.format('HH:mm')).split(':');
        const newDate = moment(`${okDate[0]}-${okDate[1]}-${okDate[2]} ${newTime[0]}:${newTime[1]}`);

        newState.consult.date = [new Date(newDate)];
        // console.log()
        this.setState({
            lecture: newState
        });
        // console.info();
    }
    onChangeTimePub(value) {
        this.setState({
            newPubTime: value
        });
    }

    date_sort(date1, date2) {
        // This is a comparison function that will result in dates being sorted in
        // DESCENDING order.
        if (date1 > date2) return -1;
        if (date1 < date2) return 1;
        return 0;
    }
    descChange(e){
        const newState = this.state.lecture;
        newState.desc = e.target.value;
        this.setState({
            lecture: newState
        });
    }
    onChangeUpload(e){
        const newState = this.state.lecture;
        if(e.target.files[0]) {
            newState.photo = e.target.files[0].name;
            // console.log();
            this.setState({
                fileToUpload: e.target.files[0],
                lecture: newState,
                imgPreview: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    render() {
        const { lecture, req, imgPreview } = this.state;
        const { allFunctions, history } = this.props;
        // const okDate = (moment(lecture.consult.date[0]).format('YYYY,MM,DD,HH,mm')).split(',');
        // console.log(imgPreview);
        const pubtDayPicker = [];
        // eslint-disable-next-line
        lecture.pubLessons.date.sort(this.date_sort).map((item, index)=>{
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
        });
        let imgSrc = '/src/teachers/' + lecture.photo;
        if(imgPreview !== null){
            imgSrc = imgPreview;
        }
        if(req) {
            return (
                <div className="article-news">
                    <div className="news-is">
                        <h2 className='main-h2 main-h2-lect'>
                            <span className="underline">
                                <input type="text" value={lecture.name} onChange={this.changeTitle.bind(this)}/>
                            </span>
                            <span className='little-head'>
                                <span>Level: </span>
                                <input type="number" value={lecture.level} onChange={this.changeLevel.bind(this)}/>
                            <span className="small">
                                *Чем меньше число, тем выше по сортировке
                            </span>
                             </span>
                        </h2>
                        <div className="content content-for-lectures">
                            <div className="upload-photo">
                                <div className="photo" style={{
                                    backgroundImage: `url(${imgSrc})`
                                }} onClick={()=>{
                                    const fff = document.getElementById('file');
                                    fff.click();
                                }}/>
                                <input type="file" name="myImage" onChange= {this.onChangeUpload.bind(this)} id={'file'}/>

                                {/*<div className="btn-uload"></div>*/}
                            </div>
                            <div className="desc">
                                <label htmlFor="desc">Должность, звание, описание:</label>
                                <input type="text" id={'desc'} value={lecture.desc} onChange={this.descChange.bind(this)}/>
                            </div>
                            <div className="consult">
                                <h2><span className="underline">Графiк Консультацій</span></h2>
                                <div className="status">Статус: {lecture.consult.isEmpty ? <span className={'off'}>Выкл</span> : <span>Вкл ({moment(lecture.consult.date[0]).format('dddd, HH:mm')})</span>}</div>
                                <h3>{lecture.name}, зможе прийняти Вас в дати вiдмiченнi на календарi, о {
                                    <TimePicker
                                        value={moment(lecture.consult.date[0])}
                                        showSecond={false}
                                        onChange={this.onChangeTime.bind(this)}
                                        minuteStep={5}
                                        disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 19, 20, 21, 22, 23]}
                                    />
                                }</h3>
                                <h4>Выбери день по которым {lecture.name} проводит консультацию (Если консультаций нету - просто не указывай дату)</h4>
                                <SelfDayPicker
                                    consult={lecture.consult.date[0]}
                                    selectedDay={new Date(lecture.consult.date[0])}
                                    setDay={this.setDay.bind(this)}
                                />
                            </div>


                            <div className="publ-lessons">
                                <h2><span className="underline">Графiк Відкритих Занять</span></h2>
                                <div className="add-pub-less">
                                    <label htmlFor="theme">Тема открытой лекции:</label>
                                    <input type="text" id={'theme'} ref={'theme'}/>
                                    <label htmlFor="aud">Аудитория:</label>
                                    <input type="text" id={'aud'} ref={'aud'}/>
                                    <span className="label">Время проведения</span>
                                    <TimePicker
                                        value={moment(this.state.newPubTime)}
                                        showSecond={false}
                                        onChange={this.onChangeTimePub.bind(this)}
                                        minuteStep={5}
                                        disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 19, 20, 21, 22, 23]}
                                    />
                                    <span className="label">Выберите дату проведения:</span>
                                    <SelfDayPicker
                                        selectedDay={new Date(this.state.newPubDate)}
                                        setDay={this.setDayPub.bind(this)}
                                    />
                                    <div className="btn-add" onClick={()=>{
                                        const { theme, aud } = this.refs;
                                        const { newPubDate, newPubTime } = this.state;

                                        const okDate = (moment(newPubDate).format('YYYY,MM,DD')).split(',');
                                        const newTime = (moment(newPubTime).format('HH:mm')).split(':');
                                        const newDate = moment(`${okDate[0]}-${okDate[1]}-${okDate[2]} ${newTime[0]}:${newTime[1]}`);
                                        if(theme.value.length === 0){
                                            alert('Тема занятия не заполнена!')

                                        }else {
                                            if(aud.value.length === 0){
                                                alert('Аудитория не указана!')
                                            }else{


                                                // console.log(theme.value);
                                                // console.log(aud.value);
                                                // console.log(newDate.format('YYYY,MM,DD'));
                                                const newState = lecture;
                                                newState.pubLessons.date.push(new Date(newDate));
                                                newState.pubLessons.theme.push(theme.value);
                                                newState.pubLessons.aud.push(aud.value);


                                                this.setState({
                                                    lecture: newState
                                                });
                                                theme.value = '';
                                                aud.value = ''
                                            }
                                        }
                                    }}>Добавить открытое занятие</div>

                                </div>
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

                        {
                            this.props.match.params.id === 'empty' ?
                                <div className='btn-add' onClick={() => {

                                    let formData = new FormData();
                                    if(this.state.fileToUpload !== 'null' || this.state.fileToUpload !== null) {
                                        formData.append('myImage', this.state.fileToUpload);
                                    }else{
                                        formData = 'null';
                                    }
                                    console.log(this.state.lecture);
                                    allFunctions('Add lect', {data:this.state.lecture, file:formData}, ()=>{
                                        history.push('/admin/lectures');
                                    });
                                }}>Добавить</div>
                                :
                                <div className="btns">
                                    <div className="btn-save" onClick={() => {

                                        if(lecture.pubLessons.date.length !== 0){
                                            const newState = lecture;
                                            newState.pubLessons.isEmpty = false;
                                            this.setState({
                                                lecture: newState
                                            })
                                        }
                                        // allFunctions('Update Lect By Id', this.state.lecture, () => {
                                        //     alert('Сохраненно!');
                                        //     history.push('/admin/lectures');
                                        // });

                                        let formData = new FormData();
                                        // console.log(this.state.fileToUpload);
                                        // console.log(this.state.fileToUpload !== null);
                                        if(this.state.fileToUpload !== null ) {
                                            formData.append('myImage', this.state.fileToUpload);
                                        }else{
                                            formData = 'null';
                                        }
                                        console.log(this.state.lecture);
                                        allFunctions('Update Lect By Id', {data:this.state.lecture, file:formData}, ()=>{
                                            alert('Сохраненно!');
                                            history.push('/admin/lectures');
                                        });
                                        // console.log(contForSave);
                                    }}>Сохранить
                                    </div>
                                    <div className="btn-delete" onClick={() => {
                                        //eslint-disable-next-line
                                        if(confirm('Удалить?')) {
                                            allFunctions('Delete Lect By Id', {id: this.props.match.params.id}, () => {
                                                history.push('/admin/lectures');
                                            })
                                        }
                                    }}>Удалить
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            )
        }else{
            return ''
        }
    }
}