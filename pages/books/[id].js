import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeBook } from '../../redux/books/slices';

import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/BooksId.module.css'
import { MdArrowBack } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai';
import BookDetails from '../../components/BookDetails';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase';


const Book = () => {
  const books = useSelector(state => state).books;

  const dispatch = useDispatch();
  const router = useRouter();
  const index = books.findIndex(book => book.id === router.query.id)
  const book = books[index];
  //const book = books.find(b => b.id === router.query.id);

  const handleDelete = async () => {
    try {
      // const index = books.findIndex(book => book.id === uid)
      const bookRef = doc(db, 'Books', book.id);
      await deleteDoc(bookRef);
      dispatch(removeBook(book.id));
      router.push('/');
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className={styles.detailsContainer}>

      {book && <BookDetails book={book} />}
      <div className={styles.iconContainer}>
        <Link href="/"><MdArrowBack className="backIcon" /></Link>
        <AiFillDelete onClick={handleDelete} className="backIcon" />
      </div>
    </div>
  )
}



export default Book