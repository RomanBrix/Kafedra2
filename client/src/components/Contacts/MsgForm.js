import React, {Component} from 'react';

export default class Title extends Component {
    render() {
        return (
            <div className="msg-form">
                <h3>Надiшлiть нам повiдомлення</h3>
                <input type="text" ref={'name'}  name={'name'} id={'name'} placeholder={'Iм`я'}/>
                <input type="text" ref={'email'} name={'email'} id={'email'} placeholder={'E-mail'}/>
                <input type="text" ref={'tel'} name={'tel'} id={'tel'} placeholder={'Телефон'}/>
                <textarea name="msg" id="msg" ref={'msg'} placeholder={'Повiдомлення'}/>
                <div className="btn-send" onClick={()=>{
                    // eslint-disable-next-line
                    const { name, email, tel, msg } = this.refs;
                }}>Вiдправити</div>
            </div>
        )
    }
}