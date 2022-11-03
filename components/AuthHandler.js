import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { provider, auth } from '../firebase'
import { signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router'
import { login, logout } from '../redux/login/slices'


export default function AuthHandler({ children }) {
    const router = useRouter();
    // const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    //   const reduxUser = useSelector((state) => state)?.user?.user?.email;

    useEffect(() => {
        console.log('useeffectgate authhandler');

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