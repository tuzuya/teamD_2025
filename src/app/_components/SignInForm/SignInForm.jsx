"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../Header/Header.jsx";
import validateEmail from "../../_validationFunctions/validateEmail.jsx";
import validatePassword from "../../_validationFunctions/validatePassword.jsx";
import style from "./SignInForm.module.css";
import Link from "next/link";

export default function SignInForm(){
    const [values, setValues] = useState({
        email:"",
        password:"",
    })
    const [errors, setErrors] = useState({
        email:null,
        password:null,
    });
    //touchedは、ユーザーが触った項目にのみエラー表示を発火させるためのboolean値
    const [touched, setTouched] = useState({
        email:false,
        password:false,
    });
    const [required, setRequired] = useState({
        email:null,
        password:null,
    });
    
    const isLoading = false; //Todo: ローディング状態の管理

    const router  = useRouter();

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

        const emptyRequiredValues = {
            email: validateRequired(values.email),
            password: validateRequired(values.password)
        }
        const isEmpty = Object.values(emptyRequiredValues).some(Boolean);
        setRequired(emptyRequiredValues);

        const submitErrors = {
            email: validateEmail(values.email),
            password: validatePassword(values.password),
        };
        setErrors(submitErrors);

        if(isEmpty || isError){
            console.log("バリデーション失敗、エラー表示");
        }else{
            await mockSignUp();
            console.log("バリデーション成功、purchaseページへ遷移");
            //Todo: Supabase認証後に画面が遷移するようにする
            router.push("/purchase");
        }

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
        <>
            <form onSubmit={handleSubmit} className={style.formContainer}>
                <h1 className={style.appName}>芝浦教科書フリマ</h1>
                <div className={style.inputDiv}>
                    <label className={style.inputLabel}>
                        <input
                            type="email"
                            placeholder="大学のGmail"
                            value={values.email}
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
                        <div className={style.errorMessage}>
                            {touched.email && errors.email && (<span>{errors.email}</span>)}
                            {required.email && (<span>{required.email}</span>)}
                        </div>
                    </label>

                    <label className={style.inputLabel}>
                        <input
                            type="password"
                            placeholder="パスワード"
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
                        <div className={style.errorMessage}>
                            {touched.password && errors.password && (<span>{errors.password}</span>)}
                            {required.password && (<span>{required.password}</span>)}
                        </div>
                    </label>
                    <div>
                        <p>初めてのご利用ですか？</p>
                        <Link href="/signup" className={style.signUpLink}>会員登録はこちらから</Link>
                    </div>
                </div>
                

                <footer className={style.formFooter}> 
                    <button type="submit" className={style.setButton}>ロ&nbsp;グ&nbsp;イ&nbsp;ン</button>
                </footer>
            </form>
        </>
    )
}