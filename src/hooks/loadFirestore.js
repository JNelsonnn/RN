import React, {useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const loadFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = firestore().collection(collection)
      .orderBy('created', 'desc')
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
        if (doc.exists) {
          documents.push({...doc.data(), id: doc.id});
        }
        else {
                 console.log("No such document!");
            }
        }).catch(function(error) {
           console.log("Error getting document:", error);
        });
        setDocs(documents);
      });

    return () => unsub();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, [collection]);

  return { docs };
}

export default loadFirestore;
