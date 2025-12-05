"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../Header/Header.jsx";


export default function SignUpForm(){
    const [initial, setInitial] = useState("");
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    
    const router = useRouter();

    //Headerに与える引数定義
    const pageTitle = "会員登録";
    const imgSrc = "";

    const mockSignUp = async() => {
        setTimeout(() => {
            console.log("mock用待機時間2秒が終了しました。");
        }, 2000);
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setError("パスワードが一致しません");
            return;
        }
        //ここでぜe.target.valueとしないのか？
        //A. onSubmitの時は、e.targetは<form>タグを指すので、valueがないから。
        //e.target.valueはonChangeの時に使う
        //Todo: Supabase連携後にデータ送信の処理を追加する
        console.log("入力されたデータ:", { initial, email, nickname, password, confirmPassword });
        //Todo:　Supabase認証後に画面が遷移するようにする
        router.push("/purchase");
    }

    return(
        <form onSubmit={handleSubmit}>
            <header>
                <Header pageTitle={pageTitle} imgSrc={imgSrc}/>
            </header>
            <label>
                イニシャル(必須)
                <input
                    type="text"
                    value={initial}
                    //入力値が変更されたらStateを更新する
                    onChange={(e) => setInitial(e.target.value)}
                    required
                />
            </label>

            <label>
                ニックネーム
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
            </label>

            <label>
                G-mail(必須)
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>

            <label>
                パスワード
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            
            <label>
                パスワード(確認用)
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </label>

            <button type="submit">登録</button>
        </form>
            
    )
}
