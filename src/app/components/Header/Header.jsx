"use client";

import HambargarMenu from "../HambargarMenu/HambargarMenu";
import styles from "./Header.module.css";

export default function Header( {pageTitle, imgSrc} ){
    return (
        <header className={styles.Header}>
            <div className={styles.HeaderMeta}>
                <time className={styles.HeaderTime}>9:41</time>
                <div className={styles.HeaderSignalPlaceholder}>
                    <div className={styles.HeaderSignals}>
                        <img className={styles.HeaderSignalMobile} src="/mobile.png" alt="モバイル通信状態" />
                    </div>
                    <div className={styles.HeaderSignals}>
                        <img className={styles.HeaderSignalWifi} src="/wifi.png" alt="wifi通信状態" />
                    </div>
                    <div className={styles.HeaderSignals}>
                        <img className={styles.HeaderSignalBattery} src="/batery.png" alt="バッテリ残量" />
                    </div>
                </div>
            </div>
            <div className={styles.HeaderTitleHolder}>
                <div className={styles.HeaderTitles}>
                    {imgSrc && <img className={styles.HeaderIcon} src={imgSrc} alt={pageTitle} />}
                    <h2 className={styles.HeaderTitle}>{pageTitle}</h2>
                </div>
                <HambargarMenu/>
            </div>
        </header>
    );
}