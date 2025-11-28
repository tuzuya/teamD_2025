"use client";

import HambargarMenu from "../HambargarMenu/HambargarMenu";


export default function Header( {pageTitle, imgSrc} ){
    return (
        <header className="Header">
            {imgSrc && <img src={imgSrc} alt={pageTitle} />}
            <h2 className="HeaderTitle">{pageTitle}</h2>
            <HambargarMenu/>
        </header>
    );
}