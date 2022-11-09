import React from 'react';
import { useDispatch } from 'react-redux';
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase';
import { toggleBook, removeBook } from '../redux/books/slices';
// import AddBook from './AddBook';
import styles from '../styles/ListBook.module.css'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { GiBookCover } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr';
import { AiFillDelete } from 'react-icons/ai';


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
const handleDelete = async (e) => {
  e.stopPropagation();
  try {
    // const index = books.findIndex(book => book.id === uid)
    const bookRef = doc(db, 'Books', item.id);
    await deleteDoc(bookRef);
    dispatch(removeBook(item.id));
  } catch (err) {
    alert(err);
  }
}


  return (
    <div onClick={(e) => goToDetails(e, item.id)} className={styles.book}>
            {item.smallThumbnailLink ?
        <Image src={item.smallThumbnailLink} width="64" height="100" alt={`the book ${item.title}`} />
        :
        <div className={styles.imageReplacer}><GiBookCover className={styles.bookIcon} /></div>
      }

      <input type="checkbox" defaultChecked={item.read} onClick={(e) => handleCheckbox(e, item.id)} className={styles.checkbox} />
      <div className={styles.bookTextContainer}>
        <p className={styles.itemTitle}>{item.title}</p>
        <p className={styles.itemAuthor}>{item.author}</p>
      </div>
      <GrClose onClick={handleDelete} className={styles.deleteIcon} />
      

    </div>
  )
}

export default ListBook