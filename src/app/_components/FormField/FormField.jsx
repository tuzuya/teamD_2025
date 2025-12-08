"use client";
import { useId, useState } from "react";
import styles from "./FormField.module.css";


//Todo: cssのためのclassNameは今後追加すること
export default function FormField({
    inputTitle,
    instructionalText = "",
    inputType,
    inputValue,
    inputFunction,
    isRequired=false,
    }){
        const inputId = useId("");
    return(
        <div>
            <label htmlFor={inputId}>
                <span>
                    <span>{inputTitle}</span>
                    {isRequired && (<span>必須</span>)}
                    {instructionalText && (<small>※{instructionalText}</small>)}
                </span>
                <input
                    id={inputId}
                    placeholder={inputTitle}
                    type={inputType}
                    value={inputValue}
                    onChange={(e) => inputFunction(e.target.value)}
                    required={isRequired}
                />
            </label>
        </div>
    );
}

