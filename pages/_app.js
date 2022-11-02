import '../styles/globals.css'
import { Provider, useSelector } from 'react-redux';
import Layout from '../components/Layout';


import { store } from '../redux/store';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout >
      <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp