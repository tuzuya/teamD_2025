//./はダメ→../でOK, ./だと、現在いるディレクトリ、つまりsignupの中しか見れないので注意
import SignUpForm from "../_components/SignUpForm/SignUpForm.jsx";
import Header from "../_components/Header/Header.jsx";

//Headerに与える引数定義
const pageTitle = "会 員 登 録";
const imgSrc = "";

export default function SignUpPage(){
    return(
        <main>
             <header>
                <Header pageTitle={pageTitle} imgSrc={imgSrc}/>
            </header>
            <SignUpForm/>
        </main>
    )
}



