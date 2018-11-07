import React, {Component} from 'react';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        props.checkSesion();
        // props.allFunctions('Get Lect',{}, (res)=>{
        //     this.setState({
        //         lecturers: res
        //     })
        // })

    }
    render() {
        return (
            <div className="admin-settings">
                <div className="add-new-user">
                    <input type="text" placeholder={'new login'} ref={'log'}/>
                    <input type="text" placeholder={'new password'} ref={'pass'}/>
                    <input type="password" placeholder={'re-password'} ref={'repass'}/>
                    <div className="btn-add-new" onClick={()=>{
                        const { log, pass, repass } = this.refs;
                        if(log.value.length > 3 && pass.value === repass.value){
                            alert('op');
                        }
                    }}>Добавить пользователя</div>
                </div>
            </div>
        )
    }
}