import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Layout from '../components/Layout';
import Login from './login';
import Loading from './loading';
import AuthHandler from '../components/AuthHandler';
import '../styles/globals.css';

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
