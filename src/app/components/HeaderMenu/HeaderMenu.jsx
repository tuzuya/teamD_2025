"use client";
import HeaderMenuBtn from "../HeaderMenuBtn/HeaderMenuBtn";
import styles from "./HeaderMenu.module.css"
import { useRouter } from "next/navigation";

export default function HeaderMenu({open}){
    const router = useRouter();

    return (
    <>
    <nav className={`${styles.HambargerMenu} ${open ? styles.active : ""}`}>
        <ul className={styles.MenuList}>
            <li className={styles.MenuItem}><HeaderMenuBtn iconSource={'/cart.png'} word={'購入する'} onClick={() => router.push("/purchase")}/></li>
            <li className={styles.MenuItem}><HeaderMenuBtn iconSorce={'/sell/picturebutton.png'} word={'出品する'} onClick={() => router.push("/sell")}/></li>
            <li className={styles.MenuItem}><HeaderMenuBtn iconSorce={'/like/heart_white.png'} word={'いいね'}/></li>
            <li className={styles.MenuItem}><HeaderMenuBtn iconSorce={'/mypage/person.png'} word={'マイページ'}/></li>
            <li className={styles.MenuItem}><HeaderMenuBtn iconSorce={'/search_result/icon_boy.png'} word={'ログイン・会員登録'} onClick={() => router.push("/signup")}/></li>
        </ul>
    </nav>
    </>
    );  
}