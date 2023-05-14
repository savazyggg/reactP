import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASURMENT_ID,
};

firebase.initializeApp(firebaseConfig);
export const firebaseInstance = firebase;
export const authService = getAuth();
export const dbService = getFirestore();
//보안에 관한건 아님 -> build하면 키로 지정한 api키들이 실제 value로 바뀌어짐 왜냐면 바뀌어야 파이어베이스에 엑세스 가능하기때문
//다만 깃허브에 오픈으로 올라가기 싫어서 저렇게 숨겨둔거
