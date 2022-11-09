import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Layout from '../components/Layout';
import Login from './login';
import Loading from './loading';
import AuthHandler from '../components/AuthHandler';
import '../styles/globals.css';
import { wrapper } from "../redux/store"

function MyApp({ Component, ...rest }) {
  const [user, loading] = useAuthState(auth);
  const { store, props } = wrapper.useWrappedStore(rest);

  if (loading) return <Loading />;
  // if (!user) return <Login />;

  return (
    <Provider store={store}>
      {
        user ?
          <AuthHandler>
            <Layout >
              <Component {...props.pageProps} />
            </Layout>
          </AuthHandler>
          :
          <Login />
      }
</Provider>
  )
}

export default MyApp;
