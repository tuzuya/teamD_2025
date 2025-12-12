"use client";
import styles from "./HambargerBtn.module.css"

export default function HambargarBtn({onClick, open}){
    return <>
        <button onClick={onClick} className={` ${styles.HambargarBtn} ${open ? styles.active : ""}`}>
            <span className={`${styles.HambargarBar} ${open ? styles.active : ""}`}></span>
            <span className={`${styles.HambargarBar} ${open ? styles.active : ""}`}></span>
            <span className={`${styles.HambargarBar} ${open ? styles.active : ""}`}></span>           
        </button>
    </>
}