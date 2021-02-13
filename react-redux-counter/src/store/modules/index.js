import { combineReducers } from 'redux' ;
import counter from './counter' ;

export default combineReducers({
    counter,
    //다른 리듀서를 만들게 되면 여기에 import
}) ;