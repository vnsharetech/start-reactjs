/**
 *
 * Root saga
 *
 */
import { all, fork } from "redux-saga/effects";

const rootSaga = function* rootSaga() {
  yield all(
    [
     
      // sagas
    ].map((saga) => fork(saga)),
  );
};

export default rootSaga;
