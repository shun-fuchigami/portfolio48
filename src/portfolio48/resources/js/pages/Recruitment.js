import React, { useEffect, useState } from 'react';
import { Card,CardHeader, } from '@mui/material';
import axios from 'axios';
import { ApplicantUser } from '../components/ApplicantUser';
import { RecruitmentContent } from '../components/RecruitmentContent';
import { useLocation } from 'react-router-dom';
import { ModalAuthenticated } from '../components/ModalAuthenticated';
import { ModalCommon } from '../components/ModalCommon';


/**
 * メンバ募集の個別詳細ページ
 * @param {*} props
 * @returns
 */
export default function Recruitment(props){

    const [recruitments,setRecruitments] = useState([]);

    const search = useLocation().search;
    const query = new URLSearchParams(search);

    const [selected,setSelected] = useState();
    const [handler,setHandler] = useState();
    const [modalText,setModalText] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [openModalAuth, setOpenModalAuth] = useState(false);

    /**
     * 応募のモーダルを表示
     * OKボタン押下時のハンドラーをセット
     * @param {Integer} prop 応募した募集のid
     * @returns
     */
     const handleOpenModalAuth = (prop) => (e) =>  {
        e.preventDefault();
        setSelected(prop);
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
     * 応募許可のモーダルを表示
     * 応募ユーザのIdをセット
     * OKボタン押下時のハンドラーをセット
     * @param {Integer} prop 応募したユーザのid
     * @returns
     */
    console.log(handler);
    console.log(selected);

    const handleOpenConsentModal = (prop) => (e) => {
        e.preventDefault();
        setSelected(prop);
        setOpenModal(true);
        setModalText("このユーザの応募を許可します。よろしいですか？");
        setHandler(()=>consentApp);
    };

    /**
     * 応募拒否のモーダルを表示
     * 応募ユーザのIdをセット
     * OKボタン押下時のハンドラーをセット
     * @param {Integer} prop 応募したユーザのid
     * @returns
     */
    const handleOpenDenyModal = (prop) => (e) => {
        e.preventDefault();
        setSelected(prop);
        setOpenModal(true);
        setModalText("このユーザの応募を拒否します。よろしいですか？");
        setHandler(()=>denyApp);
    };

    /**
     * 応募許可・拒否のモーダルを非表示
     * @returns
     */
    const handleCloseModal = () => setOpenModal(false);


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
     * 応募の許可処理
     * @param {Integer} prop 応募したユーザのid
     */
    const consentApp = (prop) => {
    axios.post(`/api/recruitment/app/consent?recruitmentId=${query.get('recruitmentId')}&userId=${prop}`)
        .then((response)=>{
            console.log(response.data);
            props.handleSetMessage(response.data,"success");
            window.location.href = `/recruitment?recruitmentId=${query.get('recruitmentId')}`;
        })
        .catch( e =>{
            console.log(e.response);
            props.handleSetMessage(e.response.data,"error");
        })
    }

    /**
     * 応募の拒否処理
     * @param {Integer} prop 応募したユーザのid
     */
    const denyApp = (prop) => {
        axios.post(`/api/recruitment/app/deny?recruitmentId=${query.get('recruitmentId')}&userId=${prop}`)
            .then((response)=>{
                console.log(response.data);
                props.handleSetMessage(response.data,"success");
                window.location.href = `/recruitment?recruitmentId=${query.get('recruitmentId')}`;
            })
            .catch( e =>{
                console.log(e.response);
                props.handleSetMessage(e.response.data,"error");
            })
    }

    /**
     * メンバ募集のAPI取得
     */
    function getRecruitment(){
        axios.get(`/api/recruitment?recruitmentId=${query.get('recruitmentId')}`)
            .then((response)=>{
                console.log(response.data);
                setRecruitments(response.data);
            })
            .catch( e =>{
                console.log(e.response);
            })
    };

    /**
     * ページ読み込み完了後に募集情報を取得
     */
    useEffect(()=>{
        getRecruitment();
    },[])

    return(
        <Card elevation={0} sx={{maxWidth:'md', mt:5, ml:'auto', mr:'auto'}}>
        <CardHeader title={"メンバ募集詳細ページ"}  />
            {/* 応募許可・拒否時のモーダル */}
            <ModalCommon
                modalText={modalText}
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                handler={handler}
                selected={selected}
                />

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


            {/* 応募者情報 オーナーユーザでない場合は応募数のみ表示 */}
            <ApplicantUser
                recruitments={recruitments}
                authUser={props.authUser}
                handleOpenConsentModal={handleOpenConsentModal}
                handleOpenDenyModal={handleOpenDenyModal}
            />
        </Card>
    );
}
