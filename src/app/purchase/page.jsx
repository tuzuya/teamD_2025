"use client";
import CheckKeyword from "../components/CheckKeyWord/CheckKeyword";
import { options } from "../components/data/arrays";
import Header from "../components/Header/Header";
import RadioBtns from "../components/radioBtns/radioBtns";
import SendBtn from "../components/SendBtn/SendBtn";
import SerectCategory from "../components/SerectCategory/SerectCategory";
import UserLog from "../components/UserLog/UserLog";
import { createClient } from "@/utils/supabase/client";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PurchasePage(){
    const PageTitle ="購入する";
    const ImgSrc="/cart.png";
    const router=useRouter();

    // 検索結果を受け取る箱
    const[serchReasults, setSerachResults]= useState([]);

    // Supabeseにアクセスする
    const supabase=createClient();

    // supabeseからデータを取る＊asyncで時間のかかる作業を宣言し、awaitでポーズ
    const handleSubmit= async (e) =>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const keyword = formData.get("key-word"); // CheckKeywordのname
        const group0 = formData.get("group-0");   // 1つ目のアコーディオン
        const group1 = formData.get("group-1");   // 2つ目のアコーディオン
        const group2 = formData.get("group-2");   // 3つ目のアコーディオン
        console.log("検索条件：",{keyword,group0,group1,group2});
        // query制作
        let query=supabase.from('merchandises').select('*');
        if(keyword){
            query=query.ilike('name',`%${keyword}%`);
        }
        if (group0) {
            // ★【重要】'category' を1つ目のカラム名に変えてください
            query = query.eq('course_id', group0);
        }

        // カテゴリ2の絞り込み（必要ならコメントアウトを外して設定）
        if (group1) {
            query = query.eq('semester_id', group1);
        }

        if (group2) {
            query = query.eq('subject_id', group2);
        }

        const {data,error} = await query;
        if(error){
           console.error("エラーだ！:", error);
            alert("データの取得に失敗しました"); 
        }else{
            console.log("取れたデータ：",data);
            if(data.length===1){
                // そのまま商品ページに遷移
                const targetId=data[0].id;
                console.log(`ID: ${targetId} のページへ飛びます`);
                router.push(`/merchandises/${targetId}`);
            }
        }

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
