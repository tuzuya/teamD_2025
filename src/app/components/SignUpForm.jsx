"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpForm(){
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        //ここでぜe.target.valueとしないのか？
        //A. onSubmitの時は、e.targetは<form>タグを指すので、valueがないから。
        //e.target.valueはonChangeの時に使う
        //Todo: Supabase連携後にデータ送信の処理を追加する
        console.log("入力されたデータ:", { email, name});
        //Todo:　Supabase認証後に画面が遷移するようにする
        router.push("/purchase");
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                大学のgmailを入力して下さい:
                <input
                    type="email"
                    value={email}
                    //入力値が変更されたらStateを更新する
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>

            <label>
                ユーザー名:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>

            <button type="submit">登録</button>
        </form>
            
    )
}
