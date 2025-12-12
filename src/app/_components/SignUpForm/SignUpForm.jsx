"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../Header/Header.jsx";
import validateEmail from "../../_validationFunctions/validateEmail.jsx";
import validatePassword from "../../_validationFunctions/validatePassword.jsx";
import validateConfirmPassword from "../../_validationFunctions/validateConfirmPassword.jsx";
import validateRequired from "@/app/_validationFunctions/validateRequired.jsx";
import style from "./SignUpForm.module.css";
import Link from "next/link";

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
        initial:false,
        nickname:false,
        email:false,
        password:false,
        confirmPassword:false,
    });
    const [required, setRequired] = useState({
        initial:null,
        nickname:null,
        email:null,
        password:null,
        confirmPassword:null,
    });

    const router = useRouter();

    //Todo: mock用関数を利用して、データサーバとの通信時の非同期処理の仮型の作成
    const mockSignUp = () => {
        return new Promise((resolve) => {
            setTimeout(()=> {
                console.log("Supabaseとの通信時間として2秒待機");
                resolve();
            }, 2000)
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        //会員登録録ボタンが押されたときに、handleSubmitですべての項目を一括バリデーション
        const emptyRequiredValues ={
            initial: validateRequired(values.initial),
            nickname: null,
            email: validateRequired(values.email),
            password: validateRequired(values.password),
            confirmPassword: validateRequired(values.confirmPassword),
        }
        //必須項目のうち１つでも入力してないと、テキストが返ってくるので、trueになる
        const isEmpty = Object.values(emptyRequiredValues).some(Boolean);
        setRequired(emptyRequiredValues);

        const submitErrors = {
            initial: null,
            nickname: null,
            email: validateEmail(values.email),
            password: validatePassword(values.password),
            confirmPassword: validateConfirmPassword(values.password, values.confirmPassword),
        }
        const isError = Object.values(submitErrors).some(Boolean);
        setErrors(submitErrors);

        if(isEmpty || isError){
            console.log("バリエーション失敗、エラー表示");
        }else{
            await mockSignUp();
            console.log("バリエーション成功、purchaseページへ遷移");
            //Todo:　Supabase認証後に画面が遷移するようにする
            router.push("/purchase");
        }

        //ここでぜe.target.valueとしないのか？
        //A. onSubmitの時は、e.targetは<form>タグを指すので、valueがないから。
        //e.target.valueはonChangeの時に使う
        //Todo: Supabase連携後にデータ送信の処理を追加する
        console.log("入力されたデータ:", values);
        console.log("required:", emptyRequiredValues);
        console.log("errors:", submitErrors);
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
        <form onSubmit={handleSubmit} className={style.formContainer}>
            <label className={style.inputContainer}>
                <label className={style.inputLabel}>
                    イニシャル
                    <span className={style.requiredBadge}>必須</span>
                </label>
                <input
                //Todo: イニシャルの入力ボックスは簡易的にしているので、後で修正する
                    type="text"
                    placeholder="例）山田 太郎→YT"
                    value={values.initial}
                    //入力値が変更されたらStateを更新する
                    onChange = {(e) => handleChange("initial", e.target.value)}
                    className={style.inputBox}
                />
                <div>
                    {required.initial && (<div>{required.initial}</div>)}
                </div>
            </label>

            <label className={style.inputContainer}>
                <label>
                    ニックネーム
                </label>
                <input
                    type="text"
                    placeholder="例) shiba"
                    value={values.nickname}
                    onChange={(e) => handleChange("nickname", e.target.value)}
                    className={style.inputBox}
                />
            </label>

            <label className={style.inputContainer}>
                <label className={style.inputLabel}>
                    G-mail
                    <span className={style.requiredBadge}>必須</span>
                </label>
                <input
                    type="email"
                    placeholder="例) AX00000@shibaura-it.ac.jp"
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
                    className={style.inputBox}
                />
                <div>
                    {touched.email && errors.email && (<div>{errors.email}</div>)}
                    {required.email && (<div>{required.email}</div>)}
                </div>
            </label>

            <label className={style.inputContainer}>
                <label className={style.inputLabel}>
                    パスワード
                    <span className={style.requiredBadge}>必須</span>
                </label>
                <input
                    type="password"
                    placeholder="8文字以上"
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
                    className={style.inputBox}
                />
                <div>
                    {touched.password && errors.password && (<div>{errors.password}</div>)}
                    {required.password && (<div>{required.password}</div>)}
                </div>
            </label>
            
            <label className={style.inputContainer}>
                <label className={style.inputLabel}>
                    パスワード(確認用)
                <span className={style.requiredBadge}>必須</span>
                </label>
                <input
                    type="password"
                    placeholder="もう一度パスワードを入力して下さい"
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
                    className={style.inputBox}
                />
                <div>
                    {touched.confirmPassword && errors.confirmPassword && (<div>{errors.confirmPassword}</div>)}
                    {required.confirmPassword && (<div>{required.confirmPassword}</div>)}
                </div>
            </label>

            <div className={style.signInLinkContainer}>
                <p>すでにアカウントをお持ちですか？</p>
                {/*ここは、nextの機能で「/フォルダ名」でリンクとして使える */}
                <Link href="/signin" className={style.signInLink}>サインインはこちら</Link>
            </div>

            <footer className={style.formFooter}>
                <button type="submit" className={style.setButton}>会&nbsp;員&nbsp;登&nbsp;録</button>
            </footer>
        </form>
            
    )
}
