import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDjx-SflRv1LNEDAWbD7s5z7tEOk9CCiHc",
  authDomain: "todo-app-194b2.firebaseapp.com",
  projectId: "todo-app-194b2",
  storageBucket: "todo-app-194b2.appspot.com",
  messagingSenderId: "495076710571",
  appId: "1:495076710571:web:b911667539008e3d367fee"
}

firebase.initializeApp(firebaseConfig)

// firebase.auth().useEmulator('http://localhost:9099')
// if(window.location.hostname === 'localhost') {
//   firebase.firestore.useEmulator('http://localhost:8080')
// }
export default firebase