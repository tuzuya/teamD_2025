"use client";

export const options = [
    { 
        id:1,
        label:"学部・学科",
        children:[
            {
                id:11, label:"工学部" , img: "/enginerring.png",
                items:[
                        {id:111,label:"機械工学課程基幹機械コース"},
                        {id:112,label:"機械工学課程先進機械コース"},
                        {id:113,label:"物質化学課程環境・物質コース"},
                        {id:114,label:"物質化学課程化学・生命工学コース"},
                        {id:115,label:"電気電子工学課程電気・ロボット工学コース"},
                        {id:116,label:"電気電子工学課程先端電子工学コース"},
                        {id:117,label:"情報・通信工学課程情報通信コース"},
                        {id:118,label:"情報・通信工学課程情報工学コース"},
                        {id:119,label:"土木工学課程都市・環境コース"},
                        {id:1111,label:"先進国際課程"},
                    ]
            },
            {
                id:12, label:"システム理工学部" , img: "/enginerring.png",
                items:[
                        {id:121,label:"電気情報システム学科"},
                        {id:122,label:"機械制御システム学科"},
                        {id:123,label:"環境システム学科"},
                        {id:124,label:"生命科学科ー生命科学コース"},
                        {id:125,label:"生命科学科ー生命医工学コース"},
                        {id:126,label:"数理科学科"},
                    ]
            },
            {
                id:13, label:"デザイン工学部" , img: "/enginerring.png",
                items:[
                        {id:131,label:"社会情報システムコース"},
                        {id:132,label:"UXコース"},
                        {id:133,label:"プロダクトコース"}
                    ]
            },
            {
                id:14, label:"建築学部" , img: "/enginerring.png",
                items:[
                        {id:141,label:"SAコース"},
                        {id:142,label:"UAコース"},
                        {id:143,label:"APコース"}
                    ]                
            },
            {
                id:15, label:"教職" , img: "/enginerring.png",
                items:[
                        {id:151,label:"教職"}
                    ]  
            },
        ]
    },
    { 
        id:2,
        label:"学年・学期",
        children:[
            {
                id:21, label:"春学期" , img: "/enginerring.png",
                items:[
                    {id:211, label:"１年", forSearch:"spring_1"},
                    {id:212, label:"２年", forSearch:"spring_2"},
                    {id:213, label:"３年", forSearch:"spring_3"},
                    {id:214, label:"４年", forSearch:"spring_4"},
                ]
            },
            {
                id:22, label:"秋学期" , img: "/enginerring.png",
                items:[
                    {id:221, label:"１年", forSearch:"autumn_1"},
                    {id:222, label:"２年", forSearch:"autumn_2"},
                    {id:223, label:"３年", forSearch:"autumn_3"},
                    {id:224, label:"４年", forSearch:"autumn_4"},
                ]
            },
        ]
    },
    {
        id:3,
        label:"科目",
        children:[],
        items:[
                    {id:31, label:"数学"},
                    {id:32, label:"情報"},
                    {id:33, label:"化学"},
                    {id:34, label:"物理"},
                    {id:35, label:"生物"},
                    {id:36, label:"英語"},
                    {id:37, label:"その他"}
                ]
    }
];


