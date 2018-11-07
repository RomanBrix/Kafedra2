import Immutable from "immutable";
import { front } from "../actionsAndUrl";
// // eslint-disable-next-line
// function getCookie(name) {
//     // eslint-disable-next-line
//     let matches = document.cookie.match(new RegExp(
//         // eslint-disable-next-line
//         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//     ));
//     return matches ? decodeURIComponent(matches[1]) : undefined;
// }
// const hashOfUsr = getCookie('hash');
const InitialState = Immutable.fromJS({
    request: false,
    news: [],
    events: []
});

const frontReducer = (state = InitialState, action) => {
    switch (action.type) {
        case  front.REQUEST:
            return state.set('request', true);

        case  front.REQ_OFF:
            return state.set('request', false);

        case front.LOGIN:
            return state.set('auth', action.login).set('request', false);

        case 'Get News':
            return state.set('news', action.news).set('request', false);

        case 'Get Events':
            return state.set('events', action.events).set('request', false);




        case front.GET_ALL_IMG:
            return state.set('photosToAlbum', action.photos).set('albums', action.alb).set('request', false);
        case front.GET_ALL_NEWS:
            return state.set('news', action.news).set('request', false);
        case front.GET_ALL_ADV_SERV:
            return state.set('advs', action.adv).set('services', action.serv).set('request', false);
        case front.GET_LANG:
            if(action.language !== 'default') {
                return state.set('lang', action.language).set('request', false);
            }else{
                return state.set('request', false);
            }
        case front.SET_LANG:
            return state.set('lang', action.language).set('request', false);


        default: return state;
    }
};

export default frontReducer;