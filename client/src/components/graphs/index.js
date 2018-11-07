import React, {Component} from 'react';

export default class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lecturers: []
        };
        props.callApi('lecturers')
            .then((res)=>{
                console.log(res);
                this.setState({
                    lecturers: res
                })
            })
            .catch(err => console.log(err));
    }

    compareNumeric(a, b) {
        if (a.level > b.level) return 1;
        if (a.level < b.level) return -1;
    }



    render() {
        const { history } = this.props;
        const { lecturers } = this.state;

        const mapedLecturers = lecturers.sort(this.compareNumeric).map((item, index)=>{
            // console.log(item._id);
            return(
                <div key={index} className={`article article-push`} onClick={()=>{
                    history.push(`/oprivet/${item._id}`);
                }}>
                    <div className="img" style={{backgroundImage: `url(/src/teachers/${item.photo})`}}>
                        {/*<img src={`/src/teachers/${item.photo}`} alt=""/>*/}
                    </div>
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
                        {mapedLecturers}
                    </div>
                </div>
            </div>
        )
    }
}