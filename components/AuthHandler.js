import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { provider, auth } from '../firebase'
import { signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router'
import { login, logout } from '../redux/login/slices'

// import { query, where } from "firebase/firestore";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from '../firebase';
// import { loadBooks } from '../redux/books/slices';


export default function AuthHandler({ children }) {
    const router = useRouter();
    // const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    //   const reduxUser = useSelector((state) => state)?.user?.user?.email;

    useEffect(() => {

        const unSubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // setUser(user);
                dispatch(
                    login({
                        email: user.email,
                        uid: user.uid,
                    })
                );
                // router.push('/');
                console.log('useeffectgate authhandler');
                // const tempArray = [];

                // if (user.uid) {
                //     console.log('books reloaded');
                //     const q = query(collection(db, "Books"), where("createdBy", "==", user.uid));
                //     getDocs(q)
                //         .then((entries) => {
                //             entries.forEach(entry => {
                //                 tempArray.push({ ...entry.data(), id: entry.id });
                //             })
                //             dispatch(loadBooks(tempArray));
                //         })
                //         .catch(err => {
                //             alert(err);
                //         })
                //     // }
                // }
            }
            else {
                router.push('/loading');
            }
        });
        // return () => { };
        return unSubscribe();
    }, []);

    return (
        <>
            {children}
        </>
    )
}