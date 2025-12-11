"use client"
import  { useState } from 'react';
import "./sell-form.css";

export default function SellForm(){
    const [subjectName, setSubjectName] = useState("");
    const [textbookName, setTextbookName] = useState("");
    const [desiredPrice, setDesiredPrice] = useState("");

    const [condition, setCondition] = useState("新品未使用"); 
    const [deliveryMethod, setDeliveryMethod] = useState("大宮キャンパス"); 

    
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('科目名:', subjectName);
        console.log('教科書名:', textbookName);
        console.log('希望価格:', desiredPrice + '円');
        console.log('状態:', condition);
        console.log('受け渡し方法:', deliveryMethod);
    }

return(
    <form className="sell-form" onSubmit={handleSubmit}>
    <div >
        <label className="modal-form">
            科目名:
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
          />
        </label>
       </div>
        <label className="modal-form">
            教科書名:
            <input
                type="text"
                value={textbookName}
                onChange={(e) => setTextbookName(e.target.value)}
                required
            />
        </label>

        <label className="modal-form"　>
            希望価格:
            <input
                type="text"
                value={desiredPrice}
                onChange={(e) => setDesiredPrice(e.target.value)}
                required
            />
        </label>



        <label>
            状態：

            <input 
                type="radio" 
                name="condition" 
                value="新品未使用" 
                checked={condition === "新品未使用"} 
                onChange={(e) => setCondition(e.target.value)} 
            />
            新品未使用
        </label>

        <label>
            <input 
                type="radio" 
                name="condition" 
                value="やや傷・汚れあり" 
                checked={condition === "やや傷・汚れあり"} 
                onChange={(e) => setCondition(e.target.value)} 
            />
            やや傷・汚れあり
        </label>

      <label>
        <input 
          type="radio" 
          name="condition" 
          value="未使用に近い" 
          checked={condition === "未使用に近い"} 
          onChange={(e) => setCondition(e.target.value)} 
        />
        未使用に近い
      </label>

      <label>
        <input 
          type="radio" 
          name="condition" 
          value="傷・汚れあり" 
          checked={condition === "傷・汚れあり"} 
          onChange={(e) => setCondition(e.target.value)} 
        />
        傷・汚れあり
      </label>

      <label>
        <input 
          type="radio" 
          name="condition" 
          value="目立った傷・汚れなし" 
          checked={condition === "目立った傷・汚れなし"} 
          onChange={(e) => setCondition(e.target.value)} 
        />
        目立った傷・汚れなし
      </label>
      <label>
        <input 
          type="radio" 
          name="condition" 
          value="書き込みあり" 
          checked={condition === "書き込みあり"} 
          onChange={(e) => setCondition(e.target.value)} 
        />
        書き込みあり
      </label>

      <label>
        受け渡し方法：
      <input 
        type="radio" 
        name="delivery" 
        value="豊洲キャンパス" 
        checked={deliveryMethod === "豊洲キャンパス"} 
        onChange={(e) => setDeliveryMethod(e.target.value)} 
      />
      豊洲キャンパス
    </label>
    <label>
      <input 
        type="radio" 
        name="delivery" 
        value="大宮キャンパス" 
        checked={deliveryMethod === "大宮キャンパス"} 
        onChange={(e) => setDeliveryMethod(e.target.value)} 
      />
      大宮キャンパス
    </label>
    <label>
      <input 
        type="radio" 
        name="delivery" 
        value="郵送" 
        checked={deliveryMethod === "郵送"} 
        onChange={(e) => setDeliveryMethod(e.target.value)} 
      />
      郵送
    </label>

        <button type="submit">出品</button>
    </form>
)
}
