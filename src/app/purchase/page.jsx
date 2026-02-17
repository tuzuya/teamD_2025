"use client";
import CheckKeyword from "../components/CheckKeyWord/Checkkeyword";
import { options } from "../components/data/arrays";
import Header from "../components/Header/Header";
import RadioBtns from "../components/radioBtns/radioBtns";
import SendBtn from "../components/SendBtn/SendBtn";
import SerectCategory from "../components/SerectCategory/SerectCategory";
import UserLog from "../components/UserLog/UserLog";
import { createClient } from "@/utils/supabase/client";
import CheckKeyword from "../_components/CheckKeyWord/Checkkeyword";
import { getName, getPeriod, getSubject, options } from "../_components/data/arrays";
import Header from "../_components/Header/Header";
import RadioBtns from "../_components/radioBtns/radioBtns";
import SendBtn from "../_components/SendBtn/SendBtn";
import SerectCategory from "../_components/SerectCategory/SerectCategory";
import UserLog from "../_components/UserLog/UserLog";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function purchasePage(){
    const PageTitle ="購入する";
    const ImgSrc="/cart.png";
    const router=useRouter();

    // 検索結果を受け取る箱
    const[serchReasults, setSerachResults]= useState([]);

    // 検索画面と商品選択画面の切り替え

    const[showResults, setShowResults]=useState(false);

    const [searchConditions, setSearchConditions] = useState({
    keyword: "",
    group0: "",
    group1: "",
    group2: ""
    });


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
        setSearchConditions({ keyword, group0, group1, group2 });
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
            if(data.length === 0){
                alert("条件に合う商品はありませんでした。");
            }else if(data.length===1){
                // そのまま商品ページに遷移
                const targetId=data[0].id;
                console.log(`ID: ${targetId} のページへ飛びます`);
                router.push(`/merchandises/${targetId}`);
            }else {
                setSerachResults(data);
                setShowResults(true);
            }
        }

    };

    const handleBackToSearch = () => {
        setShowResults(false);
        setSerachResults([]); // 前の結果をクリア（お好みで）
    };

    const detarmainName =(group,id)=>{
        let searchOption=[];
        if (!id) return "未選択"; // IDがない場合はすぐ返す
        switch(Number(group)){
            case 0:
                {
                    searchOption=getName;
                    break;
                } 
            case 1:
                {
                    searchOption=getPeriod;
                    break;
                } 
            case 2:
                {
                    searchOption=getSubject;
                    break;
                } 
        }
        const match = searchOption.find((item) => item.id == id);    
        return match ? match.label : "不明な項目"; // 見つかればラベル、なければ代わりの文字
    }
    return (
        <>
        <div className={styles.headerWrraper}>
            <Header pageTitle={PageTitle} imgSrc={ImgSrc}/>
        </div>
        {!showResults ? (
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
        ):(
            <main>
                <div className={styles.searchWords}>
                    <h2 className={styles.searchTitle}>検索ワード</h2>
                    <div className={styles.searchElemnts}>
                        <p className={styles.searchWord}>キーワード：{searchConditions.keyword || "未選択"}</p>
                        <p className={styles.searchWord}>学科：{detarmainName(0,searchConditions.group0)}</p>
                        <p className={styles.searchWord}>学期：{detarmainName(1,searchConditions.group1)}</p>
                        <p className={styles.searchWord}>科目：{detarmainName(2,searchConditions.group2)}</p>
                    </div>
                </div>

                <div className={styles.resultsContainer}>
                    <h3 className={styles.resultTitle}>検索結果</h3>
                {serchReasults.map((item)=>(
                    <div key={item.id} className={styles.searchItem} onClick={()=>router.push(`/merchandises/${item.id}`)}>
                        <div className={styles.itemImg}>
                            <img 
                                src={item.image_url ? item.image_url[0] : "/no-image.png"}
                                alt={item.image_url ? item.name : "写真はありません"}
                            />
                        </div>
                        <div className={styles.itemInfo}>
                            <h3 className={styles.itemName}>{item.name}</h3>
                            <p className={styles.itemPrice}>￥{item.price}</p>
                        </div>
                    </div>
                ))}
                </div>
                <button className={styles.backButton} onClick={handleBackToSearch}>検索に戻る</button>
            </main>
        )}
        
        </>
    );
}


