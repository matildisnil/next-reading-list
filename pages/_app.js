import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Provider } from 'react-redux';
import Layout from '../components/Layout';
import Login from './login';
import Loading from './loading';
import AuthHandlerAndStateLoader from '../components/AuthHandlerAndStateLoader';
import '../styles/globals.css';
import { wrapper } from "../redux/store"

function MyApp({ Component, ...rest }) {
  const [user, loading] = useAuthState(auth);
  const { store, props } = wrapper.useWrappedStore(rest);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  if (loading) return <Loading />;

  return (
    <Provider store={store}>
      {
        user ?
          <AuthHandlerAndStateLoader>
            <Layout >
              <Component {...props.pageProps} />
            </Layout>
          </AuthHandlerAndStateLoader>
          :
          <Login />
      }
    </Provider>
  )
}

export default MyApp;
