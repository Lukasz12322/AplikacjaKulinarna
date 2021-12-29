import firebase from 'firebase/app'
import 'firebase/storage'

export const URL = 'https://test-91925-default-rtdb.firebaseio.com/'
export const API_KEY = 'AIzaSyCT3m_vxVvzyB_MQGH6rWZyOqPtSatn02U'
export const SING_UP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY
export const SING_IN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY
export const RESET_PASSWORD_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' + API_KEY
export const REFRESH_TOKEN_URL = 'https://securetoken.googleapis.com/v1/token?key=' + API_KEY



var firebaseConfig = {
    apiKey: "AIzaSyCT3m_vxVvzyB_MQGH6rWZyOqPtSatn02U",
    authDomain: "test-91925.firebaseapp.com",
    databaseURL: "https://test-91925-default-rtdb.firebaseio.com",
    projectId: "test-91925",
    storageBucket: "test-91925.appspot.com",
    messagingSenderId: "444680359563",
    appId: "1:444680359563:web:28090b255ffa79ecbace8e"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export { storage, firebase as default }