import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { provider, auth } from '../firebase'
import { signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router'
import { login, logout } from '../redux/login/slices'

export default function Home() {
  const router = useRouter();
  // const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state)?.user?.user?.email;

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // setUser(user);
        console.log(user.uid, 'useeffect')
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
          })
        );
        router.push('/');
      }
    });
    // return () => { };
    return unSubscribe();
  }, []);

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        // setUser(result.user);
        console.log(result.user.uid)
        dispatch(
          login({
            email: result.user.email,
            uid: result.user.uid,
          })
        );
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  const handleNavigate = () => {
    router.push('/readinglist');
  }

  const handleLogOut = () => {
    signOut(auth).then(() => {
      // setUser(null);
      dispatch(logout());
      router.push('/');
    }).catch(err => {
      alert(err.message);
    })
  }

  return (
    <div>
      {
        !reduxUser ?
          <button onClick={handleLogin}>Log in with Google</button>
          :
          <div>
            {/* <button onClick={handleLogOut}>Log out</button> */}
            <button onClick={handleNavigate}>Go to list</button>
            <div>You are logged in as {reduxUser}</div>
          </div>
      }
    </div>
  );
}




// export async function getServerSideProps(ctx) {
//   return {
//     props: {
//       session: await getSession(ctx)
//     }
//   }
// }