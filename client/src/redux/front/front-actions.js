import axios from "axios";
// eslint-disable-next-line
import { front, URL_POST,URL_GET, UploadSlider,UploadGallery } from "../actionsAndUrl";


// function getCookie(name) {
//     let matches = document.cookie.match(new RegExp(
//         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//     ));
//     return matches ? decodeURIComponent(matches[1]) : undefined;
// }
// function setCookie(name, value, options) {
//     options = options || {};
//
//     let expires = options.expires;
//
//     if (typeof expires === "number" && expires) {
//         let d = new Date();
//         d.setTime(d.getTime() + expires * 1000);
//         expires = options.expires = d;
//     }
//     if (expires && expires.toUTCString) {
//         options.expires = expires.toUTCString();
//     }
//
//     value = encodeURIComponent(value);
//
//     let updatedCookie = name + "=" + value;
//
//     for (let propName in options) {
//         updatedCookie += "; " + propName;
//         let propValue = options[propName];
//         if (propValue !== true) {
//             updatedCookie += "=" + propValue;
//         }
//     }
//
//     document.cookie = updatedCookie;
// }


export function addNews(data) {
    return dispatch =>{
        dispatch({type:front.REQUEST,});
        axios.post(`/api/news`, data)
            .then((res) => {
                console.log(res);
                dispatch({type: front.REQ_OFF});

            })
            .catch((error) => {
                console.log(error);
            });
    }
}


export function allFunctions(type, data, options) {
    return dispatch =>{
        dispatch({type:front.REQUEST,});
        switch (type) {
            case "Add news":
                console.log(data);
                axios.post(`/api/news`, {data: data})
                    .then((res) => {
                        console.log(res);
                        dispatch({type: front.REQ_OFF});
                        if(options){
                            options();
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;

            case 'Get News':
                axios.get(`/api/news`)
                    .then((res) => {
                        // console.log(res);
                        dispatch({type: 'Get News', news: res.data.sort((date1, date2) => {
                            // This is a comparison function that will result in dates being sorted in
                            // DESCENDING order.
                            if (date1.created > date2.created) return -1;
                            if (date1.created < date2.created) return 1;
                            return 0;
                        })});

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;

            case 'Get News By Id':
                axios.get(`/api/news/${data.id}`)
                    .then((res) => {
                        options(res.data);
                        dispatch({type: front.REQ_OFF});
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;
            case 'Delete News By Id':
                // console.log('DASDAS');
                axios.delete(`/api/news/${data.id}`)
                    .then((res) => {
                        // console.log(res);
                        options();
                        dispatch({type: front.REQ_OFF});
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;

            case 'Update News By Id':
                // console.log('DASDAS');
                axios.post(`/api/news/${data.id}`, {data: data})
                    .then((res) => {
                        // console.log(res);
                        options();
                        dispatch({type: front.REQ_OFF});
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;





            case 'Get Events By Id':
                console.log(data.id);
                axios.get(`/api/events/${data.id}`)
                    .then((res) => {
                        options(res.data);
                        dispatch({type: front.REQ_OFF});
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;


            case 'Get Events':
                axios.get(`/api/events`)
                    .then((res) => {
                        // console.log(res);
                        // dispatch({type: front.REQ_OFF});

                        dispatch({type: 'Get Events', events: res.data.sort((date1, date2) => {
                                // This is a comparison function that will result in dates being sorted in
                                // DESCENDING order.
                                if (date1.date > date2.date) return -1;
                                if (date1.date < date2.date) return 1;
                                return 0;
                            })});

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;

            case "Add events":
                console.log(data);
                axios.post(`/api/events`, {data: data})
                    .then((res) => {
                        // console.log(res);
                        options();
                        dispatch({type: front.REQ_OFF});

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;
            case 'Delete Event By Id':
                // console.log('DASDAS');
                axios.delete(`/api/events/${data.id}`)
                    .then((res) => {
                        // console.log(res);
                        options();
                        dispatch({type: front.REQ_OFF});
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;

            case 'Update Event By Id':
                // console.log('DASDAS');
                axios.post(`/api/events/${data.id}`, {data: data})
                    .then((res) => {
                        // console.log(res);
                        options();
                        dispatch({type: front.REQ_OFF});
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;











            case 'Get Lect':
                axios.get(`/api/lecturers`)
                    .then((res) => {
                        // console.log(res);
                        options(res.data);
                        dispatch({type: front.REQ_OFF});

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;
                //Get Lect By Id

            case 'Get Lect By Id':
                // console.log(data.id);
                axios.get(`/api/lecturers/${data.id}`)

                    .then((res) => {
                        // console.log(res);

                        options(res.data);
                        dispatch({type: front.REQ_OFF});
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;
            case "Add lect":
                // console.log(data.data);

                if(data.file !== null) {
                    const config = {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    };
                    axios.post(`/api/lecturers`,  data.file, config)
                        .then((res) => {
                            console.log(res);

                            // options();
                            axios.post(`/api/lecturers`, {data: data.data})
                                .then((res) => {
                                    // console.log(res);
                                    options();
                                    dispatch({type: front.REQ_OFF});

                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                            dispatch({type: front.REQ_OFF});
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }else{
                    axios.post(`/api/lecturers`, {data: data.data})
                        .then((res) => {
                            // console.log(res);
                            options();
                            dispatch({type: front.REQ_OFF});

                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                break;
            case 'Update Lect By Id':
                // console.log(data.data);
                // console.log(data.file !== 'null');
                if(data.file !== 'null') {
                    const config = {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    };
                    axios.post(`/api/lecturers/1`, data.file, config)
                        .then((res) => {
                            // console.log(res);
                            axios.post(`/api/lecturers/${data.data._id}`, {data: data.data})
                                .then((res) => {
                                    // console.log(res);
                                    options();
                                    dispatch({type: front.REQ_OFF});
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                            dispatch({type: front.REQ_OFF});
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }else{
                    axios.post(`/api/lecturers/${data.data._id}`, {data: data.data})
                        .then((res) => {
                            // console.log(res);
                            options();
                            dispatch({type: front.REQ_OFF});
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                break;
            case 'Delete Lect By Id':
                // console.log('DASDAS');
                axios.delete(`/api/lecturers/${data.id}`)
                    .then((res) => {
                        // console.log(res);
                        options();
                        dispatch({type: front.REQ_OFF});
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;



            case 'Get Users':
                axios.get(`/api/users`)
                    .then((res) => {
                        console.log(res);
                        options(res.data);
                        dispatch({type: front.REQ_OFF});

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;

            case 'Get Users By Id':
                console.log(data.id);
                axios.get(`/api/users/${data.id}`)
                    .then((res) => {
                        console.log(res);
                        if(res.data !== false) {
                            if (res.data._id === data.if) {
                                options(true);
                            }
                        }else{
                            options(false);
                        }
                        dispatch({type: front.REQ_OFF});

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;

            case 'Check Enter User':
                axios.post(`/api/users/`, {data: data})
                    .then((res) => {
                        // console.log(res);
                        options(res.data);
                        dispatch({type: front.REQ_OFF});

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;

            default: dispatch({type: front.REQ_OFF});
        }
    }
}