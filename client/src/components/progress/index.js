import React, {Component} from 'react';
import file_src from '../../difSrc/1.pdf';

export default class Progress extends Component {
    render() {
        return (
            <div className="about">
                <div className="content">
                    <h2>
                        <span className='underline'>
                            Програма розвитку кафедри
                        </span>
                    </h2>
                    <h3>Прикладних інформаційних систем, факультету інформаційних технологій, <br/>Київського національного університету імені Тараса Шевченка</h3>
                    <p>Орієнтовний план розвитку кафедри прикладних інформаційних систем підготувала завідувач кафедри прикладних інформаційних систем факультету інформаційних технологій Київського національного університету імені Тараса Шевченка, кандидат технічних наук, доктор економічних наук, професорПлескач Валентина Леонідівна.</p>
                    <p>Обговорено та прийнято за основу рішенням кафедри (витяг із протоколу засідання кафедри № 13 від 24 квітня 2017 р.)</p>
                    <iframe src={file_src} id={'file_frame'} title={'file-frame'} frameBorder="0"/>
                </div>
            </div>
        )
    }
}