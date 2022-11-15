import React, { useState, useEffect } from 'react';
import BooksList from '../components/BooksList';
import Link from 'next/link';
import { MdAdd } from 'react-icons/md';
import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { selectReadOrUnread, toggleReadOrUnread } from '../redux/readOrUnread/slices';

import { query, where, orderBy } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { loadBooks } from '../redux/books/slices';
import { useRouter } from 'next/router';

const Home = () => {
  // const [readBoolean, setReadBoolean] = useState(false)
  const dispatch = useDispatch();
  const router = useRouter();
  // const [search, setSearch] = useState('');

  const readBoolean = useSelector(selectReadOrUnread);

  // const userUid = useSelector(state => state)?.user?.user?.uid
  // const dispatch = useDispatch();

  // useEffect(() => {

  //   const tempArray = [];
  //   // this could possibly be the cause of hydration errors?
  //   if (userUid /* && books.length === 0 */) {
  //     console.log('books reloaded');
  //     const q = query(collection(db, "Books"), where("createdBy", "==", userUid), orderBy("createdAt", "desc"));
  //     getDocs(q)
  //       .then((entries) => {
  //         entries.forEach(entry => {
  //           tempArray.push({ ...entry.data(), createdAt: entry.data().createdAt.toString(), id: entry.id });
  //         })
  //         dispatch(loadBooks(tempArray/* .sort((a, b) => b.createdAt - a.createdAt) */));
  //       })
  //       .catch(err => {
  //         alert(err);
  //       })
  //     // }
  //   }
  // }, [userUid]);


  const toggleReadBoolean = () => {
    // setReadBoolean(prev => !prev)
    dispatch(toggleReadOrUnread());
  }

  // const handleSearch = (e) =>{
  //   e.preventDefault();
  // }

  const handleNavigate = () => {

    router.push("/books/add");
    if (readBoolean === true){
      dispatch(toggleReadOrUnread());
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        {/* <Link href="/books/add" className={styles.addBooks}>
          <MdAdd className={styles.addIcon} />
          <p className={styles.addBooksText}>Add some books to your reading list!</p>
        </Link> */}
        <div onClick={handleNavigate} className={styles.addBooks}>
          <MdAdd className={styles.addIcon} />
          <p className={styles.addBooksText}>Add some books to your reading list!</p>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={toggleReadBoolean} className={styles.toggleReadButton}>{readBoolean ? 'View list of unread books' : 'View list of finished books'}</button>
        </div>
        {/* <form onSubmit={handleSearch}>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search in your list'/>
          </form> */}
      </div>
      <BooksList readBoolean={readBoolean} />
    </div>
  )
}

export default Home
