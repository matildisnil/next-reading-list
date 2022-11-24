import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router'
import { login } from '../redux/login/slices'
import { query, where, orderBy } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { loadBooks } from '../redux/books/slices';

export default function AuthHandler({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(
          login({
            email: user.email,
            displayName: user?.displayName,
            photoURL: user?.photoURL,
            uid: user.uid,
          })
        );

        if (user.uid) {
          const tempArray = [];
          // console.log('books reloaded');
          const q = query(collection(db, "Books"), where("createdBy", "==", user.uid), orderBy("createdAt", "desc"));
          getDocs(q)
            .then((entries) => {
              entries.forEach(entry => {
                tempArray.push({ ...entry.data(), createdAt: entry.data().createdAt.toString(), id: entry.id });
              })
              dispatch(loadBooks(tempArray));
            })
            .catch(err => {
              alert(err);
            })
          // }
        }
      }
      else {
        router.push('/loading');
      }
    });
    
    return unSubscribe();
  }, []);

  return (
    <>
      {children}
    </>
  )
}