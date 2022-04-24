import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from "./actions";

const reducer = (state, action) => {
  // REGISTER_USER
  // BEGIN
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state };
  }

  // SUCCESS
  if (action.type === REGISTER_USER_SUCCESS) {
    return { ...state, token: action.payload.token, user: action.payload.user };
  }

  // ERROR
  if (action.type === REGISTER_USER_ERROR) {
    return { ...state };
  }

  // LOGIN_USER
  // BEGIN
  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state };
  }

  // SUCCESS
  if (action.type === LOGIN_USER_SUCCESS) {
    return { ...state, token: action.payload.token, user: action.payload.user };
  }
  // ERROR
  if (action.type === LOGIN_USER_ERROR) {
    return { ...state };
  }
  throw new Error(`Nessuna azione ${action.type}`);
};

export default reducer;
