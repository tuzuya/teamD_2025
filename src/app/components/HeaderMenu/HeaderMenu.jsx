"use client";
import HeaderMenuBtn from "../HeaderMenuBtn/HeaderMenuBtn";
import styles from "./HeaderMenu.module.css"

export default function HeaderMenu({open}){
    return (
    <>
    <nav className={`${styles.HambargerMenu} ${open ? styles.active : ""}`}>
        <ul className={styles.MenuList}>
            <li className={styles.MenuItem}><HeaderMenuBtn iconSorce={'/cart.png'} word={'購入する'}/></li>
            <li className={styles.MenuItem}><HeaderMenuBtn iconSorce={'/cart.png'} word={'購入する'}/></li>
            <li className={styles.MenuItem}><HeaderMenuBtn iconSorce={'/cart.png'} word={'購入する'}/></li>
            <li className={styles.MenuItem}><HeaderMenuBtn iconSorce={'/cart.png'} word={'購入する'}/></li>
            <li className={styles.MenuItem}><HeaderMenuBtn iconSorce={'/cart.png'} word={'購入する'}/></li>
        </ul>
    </nav>
    </>
    );  
}