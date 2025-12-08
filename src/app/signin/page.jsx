import Link from "next/link";
import SignInForm from "../_components/SignInForm/SignInForm.jsx";

export default function SignInPage(){
    return(
        <main>
            <h1>サインイン</h1>
            <SignInForm/>

            <div>
                <p>アカウントをまだ持っていませんか？</p>
                <Link href="/signup" style={{ color: "blue", textDecoration: "underline"}}>
                    サインアップはこちら
                </Link>
            </div>

        </main>
        
    )
}