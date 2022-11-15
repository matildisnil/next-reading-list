import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/login/slices'
import { selectUser } from '../redux/login/slices';
import { provider, auth } from '../firebase'
import { signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router'
import styles from '../styles/Login.module.css'

export default function Home() {
  const router = useRouter();
  // const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const reduxUser = useSelector(selectUser)?.email;

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
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
    router.push('/');
  }

// do something about this, I think we ever only see the loginbutton
  return (
    <div className={styles.container}>
      {
        !reduxUser ?
        <div className={styles.loginContainer}>
          <h1 className={styles.header}>Welcome to Please-Read-Me</h1>
          <h2 className={styles.subHeader}>- an app to keep track of the books in your life</h2>
          <button onClick={handleLogin} className={styles.loginButton}>Log in with Google</button>
        </div>
          :
          <div className={styles.loggedIn}>
            {/* <button onClick={handleLogOut}>Log out</button> */}
            <div>You are logged in as {reduxUser}</div>
            <button onClick={handleNavigate} className={styles.goToListButton}>Go to list</button>
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