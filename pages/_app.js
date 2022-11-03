import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import '../styles/globals.css'
import { Provider, useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/login/slices'

import Layout from '../components/Layout';
import Login from './login';
import Loading from './loading';


import { store } from '../redux/store';
import AuthHandler from '../components/AuthHandler';

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;
  // if (!user) return <Login />;

  return (
    <Provider store={store}>
      {
        user ?
          <AuthHandler>
            <Layout >
              <Component {...pageProps} />
            </Layout>
          </AuthHandler>
          :
          <Login />
      }

    </Provider>
  )
}

export default MyApp
