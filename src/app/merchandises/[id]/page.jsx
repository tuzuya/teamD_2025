"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation"; 
import Header from "@/app/_components/Header/Header";
import styles from "./page.module.css";

export default function MerchandiseDetail() {
  const PageTitle ="購入する";
  const ImgSrc="/cart.png";
  const [item, setItem] = useState(null);
  const params = useParams();
  const id = params.id; // フォルダ名の [id] がここに入ってくる！

  useEffect(() => {
    const fetchItem = async () => {
      const supabase = createClient();
      
      // IDを使って、その商品1つだけを取得する
      const { data, error } = await supabase
        .from("merchandises") 
        .select("*")
        .eq("id", id) 
        .single(); 

      if (error) {
        console.error("エラー:", error);
      } else {
        setItem(data);
      }
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

  if (!item) return <div>読み込み中... (ID: {id})</div>;
  console.log(item);
  return (
    <>
      <Header pageTitle={PageTitle} imgSrc={ImgSrc}/>
      <main>
        <h1>商品名: {item.name}</h1>
        <p>価格：{item.price}円</p>
        <p>状態：{item.state}</p>
        <div>
          <img src={item.image_url} alt={item.description} width="200px" height="200px"/>
        </div>
        <p>商品説明：{item.description}</p>
        <button onClick={() => window.history.back()}>戻る</button>
      </main>
    </>
  );
}