"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../Header/Header.jsx";
import validateEmail from "../../_validationFunctions/validateEmail.jsx";
import validatePassword from "../../_validationFunctions/validatePassword.jsx";
import validateConfirmPassword from "../../_validationFunctions/validateConfirmPassword.jsx";

export default function SignUpForm(){
    const [values, setValues] = useState({
        initial:"",
        nickname:"",
        email:"",
        password:"",
        confirmPassword:"",
    });
    const [errors, setErrors] = useState({
        initial:null,
        nickname:null,
        email:null,
        password:null,
        confirmPassword:null,
    });
    //touchedは、ユーザーが触った項目にのみエラー表示を発火させるためのboolean値
    const [touched, setTouched] = useState({
        email:false,
        password:false,
        confirmPassword:false,
    });

    const router = useRouter();

    //Headerに与える引数定義
    const pageTitle = "会員登録";
    const imgSrc = "";


    //Todo: mock用関数を利用して、データサーバとの通信時の非同期処理の仮型の作成
    const mockSignUp = newPromise((resolve) => {
        setTimeout(() => {
            console.log("supabase通信時間として2秒待機");
            resolve();
        }, 2000)
    })

    const handleSubmit = async(e) => {
        e.preventDefault();

        //会員登録録ボタンが押されたときに、handleSubmitですべての項目を一括バリデーション
        const emailError = validateEmail(values.email);
        const passwordError = validatePassword(values.password);
        const confirmPasswordError = validateConfirmPassword(values.password, values.confirmPassword);
        if(emailError && passwordError && confirmPasswordError === null){
            console.log("バリエーション成功、purchaseページへ遷移");
            //Todo:　Supabase認証後に画面が遷移するようにする
            router.push("/purchase");
        }else{
            console.log("バリエーション失敗、エラー表示")
        }

        //ここでぜe.target.valueとしないのか？
        //A. onSubmitの時は、e.targetは<form>タグを指すので、valueがないから。
        //e.target.valueはonChangeの時に使う
        //Todo: Supabase連携後にデータ送信の処理を追加する
        console.log("入力されたデータ:", values);
    }

    const handleChange = (fieldName, newValue) => {
        setValues((prev) => ({
            ...prev,
            [fieldName]: newValue
        }))
        setErrors((prev) => ({
            ...prev,
            [fieldName]:null//データが変更されたタイミングでの、エラーのクリア
        }))
    }

    return(
        <form onSubmit={handleSubmit}>
            <header>
                <Header pageTitle={pageTitle} imgSrc={imgSrc}/>
            </header>
            <label>
                イニシャル(必須)
                <input
                //Todo: イニシャルの入力ボックスは簡易的にしているので、後で修正する
                    type="text"
                    value={values.initial}
                    //入力値が変更されたらStateを更新する
                    onChange = {(e) => handleChange("initial", e.target.value)}
                    required
                />
            </label>

            <label>
                ニックネーム
                <input
                    type="text"
                    value={values.nickname}
                    onChange={(e) => handleChange("nickname", e.target.value)}
                />
            </label>

            <label>
                G-mail(必須)
                <input
                    type="email"
                    value={values.email}
                    //入力されるたびにstate更新＋errorのクリア
                    //→入力が終わったタイミングでバリデーション実行して、最終的なerrorをstateにセットする
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={(e) => {
                        setErrors((prev) => ({
                            ...prev,
                            email: validateEmail(e.target.value)
                        }));
                        setTouched((prev) => ({
                            ...prev,
                            email: true
                        }));
                    }}
                    required
                />
            </label>

            <label>
                パスワード
                <input
                    type="password"
                    value={values.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    onBlur={(e) => {
                        setErrors((prev) => ({
                            ...prev,
                            password: validatePassword(e.target.value)
                        }));
                        setTouched((prev) => ({
                            ...prev,
                            password: true
                        }));
                    }}
                    required
                />
            </label>
            
            <label>
                パスワード(確認用)
                <input
                    type="password"
                    value={values.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    onBlur={(e) => {
                        setErrors((prev) => ({
                            ...prev,
                            confirmPassword: validateConfirmPassword(values.password, e.target.value)
                        }));
                        setTouched((prev) => ({
                            ...prev,
                            confirmPassword: true
                        }));
                    }}
                    required
                />
            </label>

            <button type="submit">登録</button>
        </form>
            
    )
}
