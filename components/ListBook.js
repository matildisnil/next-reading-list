import React from 'react';
import { useDispatch } from 'react-redux';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';
import { toggleBook } from '../redux/books/slices';
// import AddBook from './AddBook';
import styles from '../styles/ListBook.module.css'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { GiBookCover } from 'react-icons/gi'

const ListBook = ({ item }) => {

  const dispatch = useDispatch();
  const router = useRouter();

  const goToDetails = (e, id) => {
    e.stopPropagation();
    router.push(`/books/${id}`);
}

  const handleCheckbox = async (e, uid) => {
    e.stopPropagation();
    try {
        // const index = books.findIndex(book => book.id === uid)
        const bookRef = doc(db, 'Books', uid);
        await setDoc(bookRef, { read: !item.read }, { merge: true });
        dispatch(toggleBook(uid));
    } catch (err) {
        alert(err);
    }
}


  return (
    <div onClick={(e) => goToDetails(e, item.id)} className={styles.book}>
      <input type="checkbox" defaultChecked={item.read} onClick={(e) => handleCheckbox(e, item.id)} className={styles.checkbox} />
      <div className={styles.bookTextContainer}>
        <p className={styles.itemTitle}>{item.title}</p>
        <p className={styles.itemAuthor}>{item.author}</p>
      </div>
      {item.smallThumbnailLink ?
        <Image src={item.smallThumbnailLink} width="64" height="100" alt={`the book ${item.title}`} />
        :
        <div className={styles.imageReplacer}><GiBookCover className={styles.bookIcon} /></div>
      }

    </div>
  )
}

export default ListBook