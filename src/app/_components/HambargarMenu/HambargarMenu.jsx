"use client";
import styles from "./HambargarMenu.module.css"

export default function HambargarMenu(){
    return <>
        <div className={styles.HambargarMenu}>
            <span className={styles.HambargarBar}></span>
            <span className={styles.HambargarBar}></span>
            <span className={styles.HambargarBar}></span>
        </div>
    </>
}