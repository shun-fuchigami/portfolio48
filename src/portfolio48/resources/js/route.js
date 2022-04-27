import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route,Link, } from "react-router-dom";
import { useInView } from 'react-intersection-observer';
import { ThemeProvider,Box,Fade } from '@mui/material';
import { Home } from "./pages/Home";
import Login from './forms/Login';
import Register from './forms/Register';
import Header from "./components/Header";
import FooterNavi from './components/FooterNavi';
import Footer from './components/Footer';
import Copyright from './components/Copyright';
import {theme} from './theme';
import axios from 'axios';
import ErrorBar from './components/ErrorBar';
import SuccessBar from './components/SuccessBar';
import Team from './pages/Team';
import TeamCreate from './forms/TeamCreate';
import Account from './pages/Account';
import AccountTeam from './pages/AccountTeam';
import AccountTeamMembers from './pages/AccountTeamMembers';
import RecruitmentCreate from './forms/RecruitmentCreate';
import RecruitmentIndex from './pages/RecruitmentIndex';
import Recruitment from './pages/Recruitment';
import { GUEST, ERROR, SUCCESS } from './const';

function App(){
    /**
     * 交差監視API
     */
    const [ref,inView,entry] = useInView({
        threshold:0,
        rootMargin:'0px 0px 100px 0px',
    })

    /**
     * ログインユーザ
     */
    const [authUser,setAuthUser] = useState(()=>GUEST)

    /**
     * ログインユーザの所属チーム・所持チーム
     */
    const [belongsTeam,setBelongsTeam] = useState([]);
    const [ownerTeam,setOwnerTeam] = useState([]);

    /**
     * エラーメッセージ
     */
    const [error,setError] = useState(ERROR)
    /**
     * 成功時メッセージ
     */
    const [success,setSuccess] = useState(SUCCESS)

    const [loading,setLoading] = useState(false);

    /**
     * ログインユーザの初期化処理
     */

    function setInitAuthUser(){
        setAuthUser(GUEST);
    }

    /**
     * エラーメッセージの初期化処理
     */
    function setInitError(){
        setError(ERROR);
    }

    /**
     * 成功メッセージの初期化処理
     */
    function setInitSuccess(){
        setSuccess(SUCCESS);
    }

    /**
     * メッセージのハンドリング
     * @param {*} response
     * @param {String} target "success" or "error"
     */
    function handleSetMessage(response,target){

        let newMessage = [];

        Object.keys(response).map(key => {
            response[key].map(message => {
                newMessage.push(message);
            })
        })

        if(target === "error"){
            setError({ show:true, messages:newMessage, });
        } else {
            setSuccess({ show:true, messages:newMessage, });
        }
    }


    /**
     * ログインユーザのAPI取得
     */
    function getAuthUser(){
        axios.get(`/api/user`)
            .then((response)=>{
                setAuthUser ({
                    id:response.data[0].id,
                    name:response.data[0].name,
                    email:response.data[0].email,
                    intro:response.data[0].intro,
                    positions:response.data[0].positions,
                    isLogin:true,
                });
            })
            .catch( e =>{
                console.log(e.response);
                setInitAuthUser();
            })
    };

    /**
     * ログインユーザの所属チームのAPI取得
     */
    function getBelongsTeam(){
        if(authUser.id === 0){
            return;
        }
        axios.get(`/api/user/belongs/?userId=${authUser.id}`)
        .then(response=>{
            setBelongsTeam(response.data);
        })
        .catch(e=>{
            console.log(e.response)
        })
    }

    /**
     * ログインユーザのオーナーチームのAPI取得
     */
    function getOwnerTeam(){
        if(authUser.id === 0){
            return;
        }
        axios.get(`/api/user/owner/?userId=${authUser.id}`)
        .then(response=>{
            setOwnerTeam(response.data);
        })
        .catch(e=>{
            console.log(e.response)
        })
    }

    useEffect(()=>{
        // getAuthUser();
        setInitError();
        setInitSuccess();
    },[]);

    useEffect(()=>{
        getAuthUser();
        getBelongsTeam();
        getOwnerTeam();
    },[authUser.id])

    return(
        <ThemeProvider theme={theme}>
            {/* ヘッダーナビ */}
            <Header authUser={authUser}  handleSetMessage={handleSetMessage}/>

            <ErrorBar error={error} setError={setError}/>
            <SuccessBar success={success} setSuccess={setSuccess}/>

            {/* ルーティング */}
            <Routes>

                <Route path="/" element={
                     <Home authUser={authUser}  handleSetMessage={handleSetMessage} /> } />

                <Route path="/login" element={
                     <Login authUser={authUser}  handleSetMessage={handleSetMessage} /> } />

                <Route path="/register" element={
                     <Register authUser={authUser}  handleSetMessage={handleSetMessage} /> } />

                <Route path="/account" element={
                     <Account authUser={authUser}  handleSetMessage={handleSetMessage} /> } />

                <Route path="/account/team" element={
                    <AccountTeam
                        authUser={authUser}
                        handleSetMessage={handleSetMessage}
                        belongsTeam={belongsTeam}
                        ownerTeam={ownerTeam}
                        getBelongsTeam={getBelongsTeam}
                        getOwnerTeam={getOwnerTeam}/> }/>

                <Route path="/team/members" element={
                    <AccountTeamMembers
                        authUser={authUser}
                        handleSetMessage={handleSetMessage}
                        belongsTeam={belongsTeam}
                        ownerTeam={ownerTeam}
                        getBelongsTeam={getBelongsTeam}
                        getOwnerTeam={getOwnerTeam}/> }/>

                <Route path="/team/create" element={
                     <TeamCreate authUser={authUser}  handleSetMessage={handleSetMessage}  /> } />

                <Route path="/team" element={
                    <Team
                        authUser={authUser}
                        handleSetMessage={handleSetMessage}
                        belongsTeam={belongsTeam}
                        ownerTeam={ownerTeam}
                        getBelongsTeam={getBelongsTeam}
                        getOwnerTeam={getOwnerTeam}/> }/>

                <Route path="/recruitment/index" element={
                     <RecruitmentIndex
                        authUser={authUser}
                        handleSetMessage={handleSetMessage}
                        belongsTeam={belongsTeam}
                        ownerTeam={ownerTeam}
                        getBelongsTeam={getBelongsTeam}
                        getOwnerTeam={getOwnerTeam}/> }/>

                <Route path="/recruitment/create" element={
                     <RecruitmentCreate
                        authUser={authUser}
                        handleSetMessage={handleSetMessage}
                        belongsTeam={belongsTeam}
                        ownerTeam={ownerTeam}
                        getBelongsTeam={getBelongsTeam}
                        getOwnerTeam={getOwnerTeam}/> }/>

                <Route path="/recruitment" element={
                     <Recruitment
                        authUser={authUser}
                        handleSetMessage={handleSetMessage}
                        belongsTeam={belongsTeam}
                        ownerTeam={ownerTeam}
                        getBelongsTeam={getBelongsTeam}
                        getOwnerTeam={getOwnerTeam}/> }/>

                <Route element={
                     <Home authUser={authUser}  handleSetMessage={handleSetMessage} /> } />

            </Routes>

            {/* 追従ナビ */}
                    <FooterNavi inView={inView}/>

            <div ref={ref}>
                {/* フッター */}
                <Footer authUser={authUser} handleSetMessage={handleSetMessage}/>

                {/* コピーライト */}
                <Copyright/>
            </div>
        </ThemeProvider>

    );
}


ReactDOM.render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    ,document.getElementById('app'));
