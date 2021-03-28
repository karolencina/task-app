/* 
This file connects the app to Firebase. It has been written 
based on two tutorials - by DesignIntoCode and LogRocker - and changed 
to fit my project
*/

import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWA93LO6yghTkwysaTPyfAiHMBXj7Ylk8",
  authDomain: "karo-task-app.firebaseapp.com",
  projectId: "karo-task-app",
  storageBucket: "karo-task-app.appspot.com",
  messagingSenderId: "949139062474",
  appId: "1:949139062474:web:101bff8add1da0d94d3e33",
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }

  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }

  /* 
  The following code retrieves folders data from Firebase,
  orders them alphabetically
  */

  getFolders(callback) {
    let ref = this.ref.orderBy("name");

      this.unsubscribe = ref.onSnapshot(snapshot => {
          folders = [];

          snapshot.forEach(doc => {
              folders.push({id: doc.id, ...doc.data()});
          });

          callback(folders)
      });
  }

  addFolder(folder) {
      let ref = this.ref;

      ref.add(folder);
  }

  /*
  I did not manage to create a working deleteFolder function
  but I will keep on trying:

  deleteFolder(folder) {
      let ref = this.ref;
      ref.doc(folder.id).delete()
  }
  */

  updateFolder(folder) {
      let ref = this.ref

      ref.doc(folder.id).update(folder)
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  get ref() {
      return firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("folders");
  }

  detach() {
      this.unsubscribe()
  }
}


export default Fire;
