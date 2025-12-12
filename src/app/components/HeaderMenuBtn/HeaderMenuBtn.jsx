"use client";
import styles from "./HeaderMenuBtn.module.css"

export default function HeaderMenuBtn({iconSorce,word}){
    return (
        <>
            <label>
                <button className={styles.HeaderMenuBtn}>
                    <div className={styles.MenuIconBox}>
                        <img src={iconSorce} alt={word} className={styles.MenuIcon}/>
                    </div>
                    <p className={styles.MenuTxt}>{word}</p>
                </button>
            </label>
        </>
    );
}