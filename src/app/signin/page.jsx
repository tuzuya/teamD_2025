import SignInForm from "../_components/SignInForm/SignInForm.jsx";
import Header from "../_components/Header/Header.jsx";

//Headerに与える引数定義
const pageTitle = "ロ グ イ ン";
const imgSrc = "";

export default function SignInPage(){
    return(
        <main>
            <header>
                <Header pageTitle={pageTitle} imgSrc={imgSrc} />
            </header>
            <SignInForm/>
        </main>   
    )
}

