"use client";
import { useState } from "react";
import { supabase } from "../utils/supabase/client.js";
import styles from "./SellPage.module.css";

const SUBJECT_MAP = {
    "数学": 1,
    "情報": 2,
    "化学": 3,
    "物理": 4,
    "生物": 5,
    "英語": 6,
    "その他": 7,
}

const STATUS_MAP = {
    "新品未使用": 1,
    "やや傷・汚れあり": 2,
    "未使用に近い": 3,
    "傷・汚れあり": 4,
    "目立った傷・汚れなし": 5,
    "書き込みあり": 6,
}

const DELIVERYMETHOD_MAP = {
    "豊洲キャンパス": 1,
    "大宮キャンパス": 2,
    "郵送": 3,
}

export default function SellPage(){
    const [ bookName, setBookName] = useState("");
    const [ imageFile, setImageFile ] = useState(null);
    const [ price, setPrice] = useState("");
    const [ bookSubject, setBookSubject ] = useState("数学");
    const [ bookState, setBookState ] = useState("新品未使用");
    const [ deliveryMethod, setDeliveryMethod ] = useState("豊洲キャンパス");
    const [ description, setDescription ] = useState("");

    const [ loading, seLoading ] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        try{
            //ログインチェック＆画像チェック
            const { data: { user } } = await supabase.auth.getUser();
            if(!user) throw new Error("ログインしていません");
            if(!imageFile) throw new Error("画像が選択されていません");

            //supabaseのidを使う項目については、stateで管理しているものから変換する 
            const subjectId = SUBJECT_MAP[bookSubject];
            const statusId = STATUS_MAP[bookState];
            const deliveryMethodId = DELIVERYMETHOD_MAP[deliveryMethod];

            if(!subjectId) throw new Error(`科目IDが見つかりません: ${bookSubject}`);
            if(!statusId) throw new Error(`状態IDが見つかりません: ${bookState}`);
            if(!deliveryMethodId) throw new Error(`受け渡し方法IDが見つかりません: ${deliveryMethod}`);

            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Math.random().toString(32).substring(2)}.${fileExt}`;

            const { error: uploadError } = await supabase
                .storage
                .from("images")
                .upload(fileName, imageFile);
            if(uploadError) throw uploadError;

            const { data: urlData } = supabase
                .storage
                .from("images")
                .getPublicUrl(fileName);

            const { error: insertError } = await supabase
                .from("merchandises")
                .insert({
                    name: bookName,
                    image_url: urlData.publicUrl,
                    seller_id: user.id,
                    price: Number(price),
                    description: description,

                    subjectId: subjectId,
                    statusId: statusId,
                    deliveryMethodId: deliveryMethodId,

                })
        }
        catch(error){
            console.error(error)
            alert("エラー: " + error.message);
        }
        finally{
            setLoading(false);}

    }

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>商品名</label>
                    <input
                        type="text"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                    />
                </div>
                <div>
                    <label>価格</label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label>商品画像</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />
                </div>
                <div>
                    <label>科目名</label>
                    <select value={bookSubject} onChange={(e) => setBookSubject(e.target.velue)}>
                        <option>数学</option>
                        <option>情報</option>
                        <option>化学</option>
                        <option>物理</option>
                        <option>生物</option>
                        <option>英語</option>
                        <option>その他</option>
                    </select>
                </div>
                <div>
                    <label>状態</label>
                    <select value={bookState} onChange={(e) => setBookState(e.target.value)}>
                        <option>新品未使用</option>
                        <option>やや傷・汚れあり</option>
                        <option>未使用に近い</option>
                        <option>傷・汚れあり</option>
                        <option>目立った傷・汚れなし</option>
                        <option>書き込みあり</option>
                    </select>
                </div>
                <div>
                    <label>受け渡し方法</label>
                    <select value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
                        <option>豊洲キャンパス</option>
                        <option>大宮キャンパス</option>
                        <option>郵送</option>
                    </select>
                </div>
                <div>
                    <label>商品説明</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <button type="submit">出品する</button>
            </form>
        </>
    );
}

