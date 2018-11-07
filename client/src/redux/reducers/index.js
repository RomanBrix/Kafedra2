import { combineReducers } from 'redux';
import frontReducer from '../front/front-reducer';
// import profileReducers from '../profile/profile-reducer';
// import adminReducers from '../admin/admin-reducer';

export default combineReducers({
    front: frontReducer,
    // profile: profileReducers,
    // admin: adminReducers
});
