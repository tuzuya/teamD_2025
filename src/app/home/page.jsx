"use client";
import CheckKeyword from "../components/CheckKeyWord/Checkkeyword";
import Header from "../components/Header/Header";
import SerectCategory from "../components/SerectCategory/SerectCategory";
import UserLog from "../components/UserLog/UserLog";
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
            <SerectCategory categoryWord={"学部・学科から探す"}/>
                <SerectCategory categoryWord={"学年・学期で探す"}/>
                <SerectCategory categoryWord={"科目でさがす"}/>
            </div>
        </main>
        </>
    );
}


