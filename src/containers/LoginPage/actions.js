/**
 * LoginPage actions
 */
import { createAction } from "../../utilities";
import * as actionTypes from "./constants";

export const logInSuccess = (user) =>
  createAction(actionTypes.LOGIN_SUCCESS, { user });

export const logInFailed = (error) =>
  createAction(actionTypes.LOGIN_FAILED, { error }, true);

export const logOutSuccess = () => createAction(actionTypes.LOGOUT_SUCCESS, {});
export const getUserCurrent = (user) =>
  createAction(actionTypes.GET_CURRENT_USER_SUCCESS, { user });
