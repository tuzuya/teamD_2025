"use client";
import CheckKeyword from "../components/CheckKeyWord/Checkkeyword";
import { options } from "../components/data/arrays";
import Header from "../components/Header/Header";
import RadioBtns from "../components/radioBtns/radioBtns";
import SendBtn from "../components/SendBtn/SendBtn";
import SerectCategory from "../components/SerectCategory/SerectCategory";
import UserLog from "../components/UserLog/UserLog";
import styles from "./page.module.css";


export default function HomeMain(){
    const PageTitle ="購入する";
    const ImgSrc="/cart.png";
    const handleSubmit=(e)=>{
        e.preventDefault();
        const data={};
        const formData=new FormData(e.currentTarget);
        formData.forEach((value,key)=>{
            data[key]=value;
        });
        console.log("送信されたデータ：",data);
        alert("コンソールを確認");
    };
    return (
        <>
        <div className={styles.headerWrraper}>
            <Header pageTitle={PageTitle} imgSrc={ImgSrc}/>
        </div>
        <main>
            <UserLog/>
            <form onSubmit={handleSubmit}>
            <div className={styles.CheckKeyword}>
                <CheckKeyword/>
            </div>
                <div className={styles.SerectCategorys}>
                    {options.map((option,index) => (
                        <SerectCategory key={option.id} categoryWord={option.label}>
                            {option.children && option.children.length>0 ? (
                                option.children.map((child)=>(
                                <SerectCategory key={child.id} categoryWord={child.label} imgSorce={child.img}>
                                    <RadioBtns items={child.items} name={`group-${index}`}></RadioBtns>
                                </SerectCategory>
                            ))
                            ):(
                                <RadioBtns items={option.items} name={`group-${index}`}></RadioBtns>
                            )}
                        </SerectCategory>
                    ))}
                </div>
                <div className={styles.sendBtn}><SendBtn/></div>
            </form>
        </main>
        </>
    );
}

