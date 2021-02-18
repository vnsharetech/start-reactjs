import { createReducer } from "../../utilities";
import * as actionTypes from "./constants";
const initialState = {
  isAuthenticated: false,
  user: null,
};

const handleActions = {
  [actionTypes.LOGIN_SUCCESS]: (state, action) => {
    const { user } = action.payload;
    state.isAuthenticated = true;
    state.user = user;
  },
  [actionTypes.LOGIN_FAILED]: (state, action) => {
    state.isAuthenticated = false;
    state.user = null;
  },
  [actionTypes.LOGOUT_SUCCESS]: (state, action) => {
    state.isAuthenticated = false;
    state.user = null;
  },
  [actionTypes.GET_CURRENT_USER_SUCCESS]: (state, action) => {
    const { user } = action.payload;
    state.user = user;
  },
};

export default createReducer(initialState, handleActions);
export { initialState };
