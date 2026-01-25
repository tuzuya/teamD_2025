import SellForm from "../components/SellForm/SellForm.jsx";
import Header from "../components/Header/Header.jsx";

export default function SellPage() {
    const pageTitle = "出品する";
    const imgSrc = "/sell/picturebutton.png";
    return (
        <div>
            <Header pageTitle={pageTitle} imgSrc={imgSrc}/>
            
            <SellForm />
        </div>
    );
}