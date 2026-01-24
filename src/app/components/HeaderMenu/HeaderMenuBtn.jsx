"use client";
import styles from "./HeaderMenuBtn.module.css"
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HeaderMenuBtn({iconSorce,word}){
    const router = useRouter();
    
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