import React, {Component} from 'react';

export default class Enter extends Component {
    render() {
       const  { allFunctions } = this.props;
        return (
            <div className="enter">
                <input type="text" ref={'login'} placeholder={'Login'}/>
                <input type="password" ref={'pass'} placeholder={'Password'}/>
                <div className="btn" onClick={()=>{
                    allFunctions('Check Enter User',{
                        login: this.refs.login.value,
                        password: this.refs.pass.value
                    }, (res)=>{
                        // console.log(res);
                        if(res === 'password'){
                            alert('Не правильный пароль')
                        }else if(res === null){
                            alert('Такого пользователя нету')
                        }else if(res.length > 8){
                            this.props.setCookie('session',res,{
                                path: '/'
                            });
                            this.props.ifEnter(true);
                            this.props.history.push('/admin/news');
                        }
                    })
                }}>Войти</div>
            </div>
        )
    }
}