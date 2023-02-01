import React from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const authContext = React.useMemo(
    () => ({
      updateProfile: async (data) => {
        const uid = auth().currentUser.uid;
        const { description, location, username } = data;
        return firestore()
          .collection("profiles")
          .doc(uid)
          .update({
            username: username,
            location: location,
            description: description,
          })
          .then((response) => {
            console.log("User updated!");
          })
          .catch((error) => {
            console.error(error);
          });
      },
      signIn: async (data) => {
        const { email, password } = data;
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            console.log("User signed in!");
          })
          .catch((error) => {
            console.error(error);
          });
      },
      signOut: async (data) => {
        auth()
          .signOut()
          .then(() => console.log("User signed out!"));
      },
      signUp: async (data) => {
        const { email, password } = data;
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then((response) => {
            console.log(response);
            const uid = response.user.uid;
            console.log("User account created & signed in!");
          })
          .catch((error) => {
            console.error(error);
          });
      },
      sendPasswordResetEmail: async (data) => {
        const { email } = data;

        if (email.length == 0) {
          return alert("Email is blank");
        } else {
          auth()
            .sendPasswordResetEmail(email)
            .then(() => {
              console.log("Password reset email sent.");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode, errorMessage);
            });
        }
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
