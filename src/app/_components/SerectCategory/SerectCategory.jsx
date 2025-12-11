"use client";
import styles from "./SerectCategory.module.css";


export default function SerectCategory({categoryWord}){
    return (
        <>
            <button className={styles.SerectCategory}>
                <div className={styles.CategoryTxt}>{categoryWord}</div>
            </button>
        </>
    );
}

// 遷移する機構は未実装
// 押しているもの以外にもbox-shadowを適用