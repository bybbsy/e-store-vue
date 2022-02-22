import firebase from "firebase/compat";

function userIsAuthorized(): (string | null) {
    return firebase.auth().currentUser?.uid ?? null;
}

export  { userIsAuthorized }
