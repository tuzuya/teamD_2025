"use client";
import { majorDetail } from "../data/arrays";
import styles from "./SerectCategory.module.css";

export default function SerectCategory({imgSorce,categoryWord,onClick,open,insideObject}){
    return (
        <>
            <div className={`${styles.serectCategoryBox} ${open ? styles.active : ""}`}>
            <button className={` ${styles.SerectCategory} ${open ? styles.active : ""}`} onClick={onClick}>
                {imgSorce && 
                <div className={styles.categoryIconBox}>
                    <img src={imgSorce} alt={categoryWord} className={styles.categoryIcon} />
                </div>
                }
            
                <p className={styles.CategoryTxt}>{categoryWord}</p>
            </button>
            {open && insideObject}
            </div>
            
        </>
    );
}

// 遷移する機構は未実装
// 押しているもの以外にもbox-shadowを適用