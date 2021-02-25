import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import auth from './auth';
import location from './location';
import hotels from './hotels';
import ui from './ui';
import room from './room';
import equipment from './equipment';
import user from './user';
import transaction from './transaction';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    location,
    hotels,
    room,
    ui,
    equipment,
    user,
    transaction,
  });
export default rootReducer;
