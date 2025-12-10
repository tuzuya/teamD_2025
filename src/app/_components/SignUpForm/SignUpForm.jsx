"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../Header/Header.jsx";
import validateEmail from "../../_validationFunctions/validateEmail.jsx";
import validatePassword from "../../_validationFunctions/validatePassword.jsx";
import validateConfirmPassword from "../../_validationFunctions/validateConfirmPassword.jsx";
import validateRequired from "@/app/_validationFunctions/validateRequired.jsx";

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

    //Headerに与える引数定義
    const pageTitle = "会員登録";
    const imgSrc = "";


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
                />
                <div>
                    {required.initial && (<span>{required.initial}</span>)}
                </div>
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
                />
                <div>
                    {touched.email && errors.email && (<span>{errors.email}</span>)}
                    {required.email && (<span>{required.email}</span>)}
                </div>
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
                />
                <div>
                    {touched.password && errors.password && (<span>{errors.password}</span>)}
                    {required.password && (<span>{required.password}</span>)}
                </div>
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
                />
                <div>
                    {touched.confirmPassword && errors.confirmPassword && (<span>{errors.confirmPassword}</span>)}
                    {required.confirmPassword && (<span>{required.confirmPassword}</span>)}
                </div>
            </label>

            <button type="submit">登録</button>
        </form>
            
    )
}
