"use client";
import HeaderMenuBtn from "../HeaderMenu/HeaderMenuBtn";
import styles from "./HambargerMenu.module.css"

export default function HambargerMenu({open}){
    return (
    <>
    <nav className={`${styles.HambargerMenu} ${open ? styles.active : ""}`}>
        <ul className={styles.MenuList}>
            <li className={styles.MenuItem}><HeaderMenuBtn iconSorce={'/cart.png'} word={'購入する'}/></li>
            <li className={styles.MenuItem}><HeaderMenuBtn iconSorce={'/sell/picturebutton.png'} word={'出品する'}/></li>
            <li className={styles.MenuItem}><HeaderMenuBtn iconSorce={'/like/heart_white.png'} word={'いいね'}/></li>
            <li className={styles.MenuItem}><HeaderMenuBtn iconSorce={'/mypage/person.png'} word={'マイページ'}/></li>
            <li className={styles.MenuItem}><HeaderMenuBtn iconSorce={'/search_result/icon_boy.png'} word={'ログイン・会員登録'}/></li>
        </ul>
    </nav>
    </>
    );  
}