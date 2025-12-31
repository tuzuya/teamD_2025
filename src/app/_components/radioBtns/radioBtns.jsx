"use client";
import styles from "./radioBtns.module.css";

export default function RadioBtns({items,name}){
    if (!items || !Array.isArray(items)) {
        return null;
    }
    return (
        <>
        <div className={styles.radioForm}>
            <dl>
                {items.map((item)=>(
                    <dd key={item.id} className={styles.radioDd}>
                        <input type="radio" id={item.id} name={name} value={item.label}/>
                        <label htmlFor={item.id} className={styles.radioLabel}>{item.label}</label>
                    </dd>
                ))}
            </dl>

        </div>
        </>
    );
}