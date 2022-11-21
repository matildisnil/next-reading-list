import { useState } from "react";
import styles from '../styles/Checkbox.module.css';
import { useDispatch } from "react-redux";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { toggleBook } from "../redux/books/slices";

const Checkbox = ({ label, item }) => {
  const dispatch = useDispatch();
  // const defaultChecked = checked ? checked : false;
  // const [isChecked, setIsChecked] = useState(defaultChecked);

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
    <div className={styles.checkboxWrapper}>
      <label>
        <input type="checkbox" defaultChecked={item.read} onClick={(e) => handleCheckbox(e, item.id)} className={styles.input} />
        <span>{label}</span>
      </label>
      <p>{item.read ? "Selected" : "Unchecked"}</p>
    </div>
  );
};
export default Checkbox;