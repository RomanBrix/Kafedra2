import React, {Component} from 'react';

export default class AllLect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lecturers: []
        };
        props.checkSesion();
        props.allFunctions('Get Lect',{}, (res)=>{
            this.setState({
                lecturers: res
            })
        })
    }

    compareNumeric(a, b) {
        if (a.level > b.level) return 1;
        if (a.level < b.level) return -1;
    }

    render() {
        const { lecturers } = this.state;
        const { history } = this.props;
        // console.log(lecturers);
        const mapedLecturers = lecturers.sort(this.compareNumeric).map((item, index)=> {
        return (
            <div key={index} className={`article article-push`} onClick={()=>{
                history.push(`/admin/lectures/${item._id}`)
            }}>
                <div className="img" style={{backgroundImage: `url(/src/teachers/${item.photo})`}}/>
                <div className="text">
                    <div className="name">
                        {item.name}
                    </div>
                </div>
            </div>
        )
    });
        return (
            <div className="lecturers">
                <div className="content">
                    <div className="lecturers-container">
                        <div className="btn-add" onClick={()=>{
                            history.push('/admin/lectures/empty');
                        }}>Добавить</div>
                        {mapedLecturers}
                    </div>
                </div>
            </div>
        )
    }
}