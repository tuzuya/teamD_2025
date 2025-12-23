"use client"
import  { useState } from 'react';
import "./sell-form.css";

export default function SellForm(){
    const [subjectName, setSubjectName] = useState("");
    const [textbookName, setTextbookName] = useState("");
    const [desiredPrice, setDesiredPrice] = useState("");
    const [description, setDescription] = useState(""); // 商品説明フィールドを追加

    const [condition, setCondition] = useState("新品未使用"); 
    const [deliveryMethod, setDeliveryMethod] = useState("大宮キャンパス"); 

    

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('科目名:', subjectName);
        console.log('教科書名:', textbookName);
        console.log('希望価格:', desiredPrice + '円');
        console.log('状態:', condition);
        console.log('受け渡し方法:', deliveryMethod);
        console.log('商品説明:', description);
    }

return(
  <form className="sell-form" onSubmit={handleSubmit}>
    <div className="modal-form">
        <label >
            科目名
          <div className="color-form">
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            placeholder="例: 情報科学"
            required
          />
          </div>
        </label>
    </div>

    
    <div className="modal-form">
        <label>
            教科書名
            <div className="sell-form">
        
    }

return(
    <form onSubmit={handleSubmit}>
        <label>
            科目名:
            <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                required
            />
        </label>

        <label>
            教科書名:
            <input
                type="text"
                value={textbookName}
                onChange={(e) => setTextbookName(e.target.value)}
                placeholder="例: Python入門"
                required
            />
            </div>
        </label>
    </div>

    
    <div className="modal-form">
        <label>
            希望価格
            <div className="price-input-wrapper">
                <input
                    type="text"
                    value={desiredPrice}
                    onChange={(e) => setDesiredPrice(e.target.value)}
                    placeholder="半角数字"
                    required
                />
                <span className="price-unit">円</span>
            </div>
        </label>
    </div>



    <h2 className="section-header">状態</h2>
    <div className="radio-group">
      
      <label>
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
    </div>

    <h2 className="section-header">受け渡し方法</h2>
    <div className="radio-group">
      
      <label>
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
    </div>
  
    <h2 className="section-header">商品説明</h2>
    <div className="modal-form">
        <label className="modal-form-label">
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
            />
        </label>
    </div>

    <button type="submit">出品</button>
    </form>
)
}
                required
            />
        </label>

        <label>
            希望価格:
            <input
                type="text"
                value={desiredPrice}
                onChange={(e) => setDesiredPrice(e.target.value)}
                required
            />
        </label>

        <button type="submit">出品</button>
    </form>
)
}
