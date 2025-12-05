"use client"
import  { useState } from 'react';

export default function SellForm(){
    const [subjectName, setSubjectName] = useState("");
    const [textbookName, setTextbookName] = useState("");
    const [desiredPrice, setDesiredPrice] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('科目名:', subjectName);
        console.log('教科書名:', textbookName);
        console.log('希望価格:', desiredPrice + '円');
        
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
