"use client";
import { useState } from "react";
import CheckKeyword from "../components/CheckKeyWord/Checkkeyword";
import { options } from "../components/data/arrays";
import Header from "../components/Header/Header";
import SerectCategory from "../components/SerectCategory/SerectCategory";
import UserLog from "../components/UserLog/UserLog";
import styles from "./page.module.css";


export default function HomeMain(){
    const PageTitle ="購入する";
    const ImgSrc="/cart.png";
    const [openIndex, setOpenIndex] = useState(null);
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
                {options.map((option,index) =>(
                    <SerectCategory 
                    key={option.label}
                    categoryWord={option.label}
                    onClick={()=>setOpenIndex(openIndex === index ? null : index)}
                    open={openIndex === index}
                    insideObject={
                    <SerectCategory imgSorce={"/enginerring.png"} categoryWord={"工学部"}/>}
                    />
                ))}
            </div>
        </main>
        </>
    );
}

