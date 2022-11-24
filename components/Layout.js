import Navbar from './Navbar'
import Head from 'next/head'
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Please-Read-Me</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <main className={styles.main}>{children}</main>
    </>
  )
}