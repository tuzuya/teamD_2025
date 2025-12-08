import Link from "next/link";
//./はダメ→../でOK, ./だと、現在いるディレクトリ、つまりsignupの中しか見れないので注意
import SignUpForm from "../components/SignUpForm/SignUpForm.jsx";

export default function SignUpPage(){
    return(
        <main>
            <SignUpForm/>
            <div>
                <p>すでにアカウントをお持ちですか？</p>
                {/*ここは、nextの機能で「/フォルダ名」でリンクとして使える */}
                <Link href="/signin" style={{ color: "blue", textDecoration: "underline"}}>
                    サインインはこちら
                </Link>
            </div>
        </main>
    )
}



