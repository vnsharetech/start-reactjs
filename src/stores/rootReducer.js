/**
 * Root reducer
 */

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { history } from "../utilities/history";
import language from "../containers/LanguageProvider/reducer";

export default function createReducer() {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    language
  });

  return rootReducer;
}
