// src/store/sagas/authSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} from "../slices/authSlice";

interface LoginAction {
  type: string;
  payload: { email: string; password: string };
}

interface RegisterAction {
  type: string;
  payload: { user: { email: string; firstName: string; lastName: string }; password: string };
}

// Mock API (replace with real API later)
const fakeApi = {
  login: ({ email, password }: { email: string; password: string }) =>
    new Promise((resolve, reject) => {
      const stored = localStorage.getItem(email);
      if (stored) {
        const parsed = JSON.parse(stored);
        parsed.password === password ? resolve(parsed.user) : reject("Invalid password");
      } else {
        reject("User not found");
      }
    }),
  register: ({ user, password }: { user: any; password: string }) =>
    new Promise((resolve) => {
      localStorage.setItem(user.email, JSON.stringify({ user, password }));
      resolve(user);
    }),
};

function* handleLogin(action: LoginAction): Generator<any, void, any> {
  try {
    const user = yield call(fakeApi.login, action.payload);
    yield put(loginSuccess(user));
  } catch (error: any) {
    yield put(loginFailure(error));
  }
}

function* handleRegister(action: RegisterAction): Generator<any, void, any> {
  try {
    const user = yield call(fakeApi.register, action.payload);
    yield put(registerSuccess(user));
  } catch (error: any) {
    yield put(registerFailure(error));
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
}
