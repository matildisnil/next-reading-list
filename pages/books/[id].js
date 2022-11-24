import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeBook } from '../../redux/books/slices';
import { selectOneBook } from '../../redux/books/slices';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/BooksId.module.css'
import { MdArrowBack } from 'react-icons/md'
import BookDetails from '../../components/BookDetails';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { AiOutlineDelete } from 'react-icons/ai';

const Book = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const book = useSelector(state => selectOneBook(state, router.query.id));

  const handleDelete = async () => {
    try {
      const bookRef = doc(db, 'Books', book.id);
      await deleteDoc(bookRef);
      dispatch(removeBook(book.id));
      router.push('/');
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        {book ? <BookDetails book={book} /> : 'loading...'}
        <div className={styles.iconContainer}>
          <Link href="/"><MdArrowBack className="backIcon" /></Link>
          <AiOutlineDelete onClick={handleDelete} className="backIcon" />
        </div>
      </div>
    </div>
  )
}



export default Book