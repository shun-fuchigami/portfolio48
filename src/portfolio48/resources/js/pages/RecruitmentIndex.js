import React, { useEffect, useState } from 'react';
import { Card,CardHeader } from '@mui/material';
import axios from 'axios';
import { RecruitmentContent } from '../components/RecruitmentContent';
import { ModalAuthenticated } from '../components/ModalAuthenticated';

export default function RecruitmentIndex(props){


    const [handler,setHandler] = useState();
    const [selected,setSelected] = useState();
    const [modalText,setModalText] = useState();
    const [recruitments,setRecruitments] = useState([]);
    const [openModalAuth, setOpenModalAuth] = useState(false);


    /**
     * 応募のモーダルを表示
     * OKボタン押下時のハンドラーをセット
     * @param {Integer} prop 応募した募集のid
     * @returns
     */
    const handleOpenModalAuth = (prop) => (e) =>  {
        e.preventDefault();
        setSelected(prop)
        setOpenModalAuth(true);
        setHandler(()=>appRecruitment);
        setModalText("この募集へ応募します。よろしいですか？");
    };

    /**
     * 応募時のモーダルを非表示
     * @returns
     */
    const handleCloseModalAuth = () => setOpenModalAuth(false);


    /**
     * 募集への応募処理
     * @param {Integer} prop 応募する募集のid
     */
    function appRecruitment(prop){
        axios.post(`/api/recruitment/app?recruitmentId=${prop}&userId=${props.authUser.id}`)
            .then((response)=>{
                console.log(response.data);
                props.handleSetMessage(response.data,"success");
                window.location.href = `/recruitment?recruitmentId=${prop}`;
            })
            .catch( e =>{
                console.log(e.response);
                props.handleSetMessage(e.response.data,"error");
                handleClose();
            })
    }

    /**
     * メンバ募集のAPI取得
     */
    function getRecruitment(){
        axios.get(`/api/recruitment/index`)
            .then((response)=>{
                console.log(response.data);
                setRecruitments(response.data);
            })
            .catch( e =>{
                console.log(e);
            })
    };

    useEffect(()=>{
        getRecruitment();
    },[])

    return(
        <Card elevation={0} sx={{maxWidth:'md', mt:5, ml:'auto', mr:'auto'}}>
        <CardHeader title={"メンバ募集一覧ページ"} />

            {/* 応募時のモーダル 未ログイン時はログイン導線へ案内 */}
            <ModalAuthenticated
                    modalText={modalText}
                    openModalAuth={openModalAuth}
                    handleCloseModalAuth={handleCloseModalAuth}
                    handler={handler}
                    selected={selected}
                    authUser={props.authUser}
                />

            {/* 募集情報 */}
            <RecruitmentContent
                recruitments={recruitments}
                authUser={props.authUser}
                handleOpenModalAuth={handleOpenModalAuth}
            />
        </Card>
    );
}
