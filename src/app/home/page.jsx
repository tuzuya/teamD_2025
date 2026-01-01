"use client";
import { useState } from "react";
import CheckKeyword from "../_components/CheckKeyWord/Checkkeyword";
import { options } from "../_components/data/arrays";
import Header from "../_components/Header/Header";
import SerectCategory from "../_components/SerectCategory/SerectCategory";
import UserLog from "../_components/UserLog/UserLog";


export default function HomeMain(){
    const PageTitle ="購入する";
    const ImgSrc="/cart.png";
    const [openIndex, setOpenIndex] = useState(null);
    return (
        <>
        <header>
            <Header pageTitle={PageTitle} imgSrc={ImgSrc}/>
        </header>
        <main>
            <UserLog/>
            <div>
                <CheckKeyword/>
            </div>
            <div>
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

