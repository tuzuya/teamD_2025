"use client";
import { useState } from "react";
import { supabase } from "../../utils/supabase.js";
import styles from "./SellForm.module.css";

const SUBJECT_MAP = {
    "数学": 1,
    "情報": 2,
    "化学": 3,
    "物理": 4,
    "生物": 5,
    "英語": 6,
    "その他": 7,
}

const STATE_MAP = {
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

const COURSE_MAP = {
    "機械工学課程基幹機械コース": 1,
    "機械工学課程先進機械コース": 2,
    "物質化学課程環境・物質コース": 3,
    "物質化学課程化学・生命工学コース": 4,
    "電気電子工学課程電気・ロボット工学コース": 5,
    "電気電子工学課程先端電子工学コース": 6,
    "情報・通信工学課程情報通信コース": 7,
    "情報・通信工学課程情報工学コース": 8,
    "土木工学課程都市・環境コース": 9,
    "先進国際課程": 10,
    "電気情報システム学科": 11,
    "機械制御システム学科": 12,
    "環境システム学科": 13,
    "生命科学科ー生命科学コース": 14,
    "生命科学科ー生命医工学コース": 15,
    "数理科学科": 16,
    "社会情報システムコース": 17,
    "UXコース": 18,
    "プロダクトコース": 19,
    "SAコース": 20,
    "UAコース": 21,
    "APコース": 22,
    "教職": 23
}

const SEMESTER_MAP = {
    "1年春学期": 1,
    "1年秋学期": 2,
    "2年春学期": 3,
    "2年秋学期": 4,
    "3年春学期": 5,
    "3年秋学期": 6,
    "4年春学期": 7,
    "4年秋学期": 8,
}

export default function SellForm(){
    const [ bookName, setBookName] = useState("");
    const [ imageFile, setImageFile ] = useState(null);
    const [ price, setPrice] = useState("");
    const [ bookSubject, setBookSubject ] = useState("数学");
    const [ bookState, setBookState ] = useState("新品未使用");
    const [ deliveryMethod, setDeliveryMethod ] = useState("豊洲キャンパス");
    const [ description, setDescription ] = useState("");
    const [ course, setCourse ] = useState("機械工学課程基幹機械コース");
    const [ semester, setSemester ] = useState("1年春学期");

    const [ loading, setLoading ] = useState(false);

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
            const stateId = STATE_MAP[bookState];
            const deliveryMethodId = DELIVERYMETHOD_MAP[deliveryMethod];
            const courseId = COURSE_MAP[course];
            const semesterId = SEMESTER_MAP[semester];

            if(!subjectId) throw new Error(`科目IDが見つかりません: ${bookSubject}`);
            if(!stateId) throw new Error(`状態IDが見つかりません: ${bookState}`);
            if(!deliveryMethodId) throw new Error(`受け渡し方法IDが見つかりません: ${deliveryMethod}`);
            if(!courseId) throw new Error(`コースIDが見つかりません: ${course}`);
            if(!semesterId) throw new Error(`学期IDが見つかりません: ${semester}`);

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

            const insertData = {
                title: bookName,
                price: Number(price),
                image_url: urlData.publicUrl,
                seller_id: user.id,   // ← ここがちゃんと入っているか注目！
                description: description,
                subject_id: subjectId,
                state_id: stateId,
                delivery_method_id: deliveryMethodId,
                course_id: courseId,
                semester_id: semesterId
            };
            console.log("【送信データ確認】", insertData);

            const { error: insertError } = await supabase
                .from("merchandises")
                .insert({
                    name: bookName,
                    image_url: urlData.publicUrl,
                    seller_id: user.id,
                    price: Number(price),
                    description: description,

                    subject_id: subjectId,
                    state_id: stateId,
                    deliveryMethod_id: deliveryMethodId,
                    course_id: courseId,
                    semester_id: semesterId
                })
        }
        catch(error){
            console.error(error)
            alert("エラー: " + error.message);
        }
        finally{
            setLoading(false);
        }

    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>商品を出品する</h1>
            <form onSubmit={handleSubmit}>
                
                {/* 商品名 */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>商品名</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                        required
                        placeholder="教科書名など"
                    />
                </div>
                
                {/* 価格 */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>価格 (円)</label>
                    <input
                        type="number"
                        className={styles.input}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        placeholder="1000"
                    />
                </div>
                
                {/* 画像 */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>商品画像</label>
                    <input
                        type="file"
                        accept="image/*"
                        className={styles.input}
                        onChange={(e) => setImageFile(e.target.files[0])}
                        required
                    />
                </div>
                
                {/* 科目 (Subject) */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>科目名</label>
                    <select 
                        className={styles.select}
                        value={bookSubject} 
                        onChange={(e) => setBookSubject(e.target.value)}
                    >
                        {Object.keys(SUBJECT_MAP).map((key) => (
                            <option key={key} value={key}>{key}</option>
                        ))}
                    </select>
                </div>

                {/*コース*/}
                <div className={styles.formGroup}>
                    <label className={styles.label}>使用したコース</label>
                    <select 
                        className={styles.select}
                        value={course} 
                        onChange={(e) => setCourse(e.target.value)}
                    >
                        {Object.keys(COURSE_MAP).map((key) => (
                            <option key={key} value={key}>{key}</option>
                        ))}
                    </select>
                </div>
                
                {/*学期*/}
                <div className={styles.formGroup}>
                    <label className={styles.label}>使用した学期</label>
                    <select 
                        className={styles.select}
                        value={semester} 
                        onChange={(e) => setSemester(e.target.value)}
                    >
                        {Object.keys(SEMESTER_MAP).map((key) => (
                            <option key={key} value={key}>{key}</option>
                        ))}
                    </select>
                </div>

                {/* 状態 (State) */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>状態</label>
                    <select 
                        className={styles.select}
                        value={bookState} 
                        onChange={(e) => setBookState(e.target.value)}
                    >
                        {Object.keys(STATE_MAP).map((key) => (
                            <option key={key} value={key}>{key}</option>
                        ))}
                    </select>
                </div>
                
                {/* 受渡方法 (Delivery) */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>受け渡し方法</label>
                    <select 
                        className={styles.select}
                        value={deliveryMethod} 
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                    >
                        {Object.keys(DELIVERYMETHOD_MAP).map((key) => (
                            <option key={key} value={key}>{key}</option>
                        ))}
                    </select>
                </div>
                
                {/* 説明 (Description) */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>商品説明 (自由記述)</label>
                    <textarea
                        className={styles.textarea}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="5"
                        placeholder="その他、特記事項があればここに書いてください"
                    ></textarea>
                </div>

                <button 
                    type="submit" 
                    className={styles.button}
                    disabled={loading}
                >
                    {loading ? "送信中..." : "出品する"}
                </button>
            </form>
        </div>
    );
}

