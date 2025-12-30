"use client";
import CheckKeyword from "../_components/CheckKeyWord/Checkkeyword";
import { options } from "../_components/data/arrays";
import Header from "../_components/Header/Header";
import SerectCategory from "../_components/SerectCategory/SerectCategory";
import UserLog from "../_components/UserLog/UserLog";
import styles from "./page.module.css";


export default function HomeMain(){
    const PageTitle ="購入する";
    const ImgSrc="/cart.png";
    return (
        <>
        <header>
            <Header className="Header" pageTitle={PageTitle} imgSrc={ImgSrc}/>
        </header>
        <main>
            <UserLog/>
            <div className={styles.CheckKeyword}>
                <CheckKeyword/>
            </div>
            <div className={styles.SerectCategorys}>
                {options.map((option) => (
                    <SerectCategory key={option.id} categoryWord={option.label}>
                        {option.children.map((child)=>{
                            console.log(child);
                            return (
                            <SerectCategory key={child.id} categoryWord={child.label} imgSorce={child.img}></SerectCategory>
                        )})}
                    </SerectCategory>
                ))}
            </div>
        </main>
        </>
    );
}
