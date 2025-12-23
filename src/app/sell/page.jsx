import SellForm from "../_components/sellForm/sellForm.jsx";
import Header from "../_components/Header/Header.jsx";

export default function SellPage() {
    const pageTitle = "出品ページ";
    const imgSrc = "/sell/picturebutton.png";
    return (
        <div>
            <Header pageTitle={pageTitle} imgSrc={imgSrc}/>
            
            <SellForm />
        </div>
    );
}