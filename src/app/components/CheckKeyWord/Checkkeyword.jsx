"use client";
import { useState } from "react";
import preWord from "../preword";
import styles from "./Checkkeyword.module.css";

export default function CheckKeyword(){
    const [searchWord, setSearchWord] = useState("");
    return (
        <>          
            
                <div className={styles.TextBox}>
                    <input type="text"
                        placeholder="キーワードで探す"
                        value={searchWord}
                        onChange={(e) => setSearchWord(e.target.value)}
                        className={styles.TextInput}
                        name="key-word"
                    />
                </div>
             
        </>
    );
}