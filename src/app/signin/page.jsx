import Link from "next/link";
import SignInForm from "../components/SignInForm";

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