import React, {Component} from 'react';
export default class Lecturers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lecturers: []
        };
        props.callApi('lecturers')
            .then((res)=>{
                // console.log(res);

                this.setState({
                    lecturers: res
                })
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {


    }

    compareNumeric(a, b) {
        if (a.level > b.level) return 1;
        if (a.level < b.level) return -1;
    }
    render() {
        const { lecturers } = this.state;
        // console.log(lecturers);
        const mapedLecturers = lecturers.sort(this.compareNumeric).map((item, index)=>{
            return(
                <div key={index} className={`article`}>
                    <div className="img" style={{backgroundImage: `url(/src/teachers/${item.photo})`}}>
                        {/*<img src={`/src/teachers/${item.photo}`} alt=""/>*/}
                    </div>
                    <div className="text">
                        <div className="name">
                            {item.name}
                        </div>
                        <div className="desc">
                            <p>{item.desc}</p>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className="lecturers">
                <div className="content">

                    {/*<button onClick={()=>{*/}
                        {/*this.props.callApi('setDefaultSettings');*/}
                    {/*}}>reset</button>*/}
                    <div className="lecturers-container">
                        {mapedLecturers}

                    </div>
                </div>
            </div>
        )
    }
}