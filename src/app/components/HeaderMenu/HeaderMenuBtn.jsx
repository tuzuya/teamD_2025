"use client";
import styles from "./HeaderMenuBtn.module.css"

export default function HeaderMenuBtn({iconSource, word, onClick}){

    return (
        <>
            <label>
                {/* アロー関数としてonClickとして親からのonClickを受け取ることで、その受け取った処理のonClickへのセットのみ即時実行されて、セットされた方の関数の実行はブラウザのonClickによって管理されるようになる*/}
                <button className={styles.HeaderMenuBtn} onClick={() => onClick?.()}>
                    <div className={styles.MenuIconBox}>
                        <img src={iconSource} alt={word} className={styles.MenuIcon}/>
                    </div>
                    <p className={styles.MenuTxt}>{word}</p>
                </button>
            </label>
        </>
    );
}