import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import { useInView } from 'react-intersection-observer';
import { ThemeProvider } from '@mui/material';
import { Home } from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';
import Header from "./components/Header";
import FooterNavi from './components/FooterNavi';
import Footer from './components/Footer';
import Copyright from './components/Copyright';
import {theme} from './theme';
import axios from 'axios';
import ErrorBar from './components/ErrorBar';
import Team from './pages/Team';
import TeamCreate from './pages/TeamCreate';
import Account from './pages/Account';
import AccountTeam from './pages/AccountTeam';
import AccountTeamMembers from './pages/AccountTeamMembers';
import RecruitmentCreate from './pages/RecruitmentCreate';
import RecruitmentIndex from './pages/RecruitmentIndex';
import Recruitment from './pages/Recruitment';

function App(){
    /**
     * 交差監視API
     */
    const [ref,inView,entry] = useInView({
        threshold:0,
        rootMargin:'0px 0px 150px 0px',
    })

    /**
     * ログインユーザ
     */
    const [authUser,setAuthUser] = useState(()=> {
        const initialState = initAuthUser();
        return initialState
    })

    /**
     * ログインユーザの所属チーム
     */
    const [belongsTeam,setBelongsTeam] = useState([]);
    const [ownerTeam,setOwnerTeam] = useState([]);

    /**
     * エラーステータス・エラーメッセージ
     */
    const [status,setStatus] = useState({});
    const [message,setMessage] = useState({
        error:"エラーが発生しました。",
        warning:"入力が誤っていないか確認してください。",
        info:"This is an info alert — check it out!",
        success:"実行に成功しました。",
    });

    /**
     * ログインユーザの初期化処理
     * @returns
     */
    function initAuthUser(){
        return {
            id:0,
            name:"guest",
            email:"",
            isLogin:false,
        }
    };

    /**
     * エラーステータスの初期化処理
     */
    function setInitStatus(){
        setStatus({
            error:false,
            warning:false,
            info:false,
            success:false,
        });
    }

    /**
     * エラーステータスのハンドリング
     * @param {*} target
     */
    function handleSetStatus(target){
        setStatus({...status, [target]:true});
    };

    /**
     * ログインユーザのAPI取得
     */
    function getAuthUser(){
        axios.get(`/api/user`)
            .then((response)=>{
                console.log(response.data);
                setAuthUser ({
                    id:response.data.id,
                    name:response.data.name,
                    email:response.data.email,
                    isLogin:true,
                });
            })
            .catch( e =>{
                console.log(e);
                setAuthUser = ({
                    id:0,
                    name:"guest",
                    email:"",
                    isLogin:false,
                });
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
            console.log(e)
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
            console.log(e)
        })
    }

    useEffect(()=>{
        getAuthUser();
        setInitStatus();
    },[]);

    useEffect(()=>{
        getBelongsTeam();
        getOwnerTeam();
    },[authUser.id])

    return(
        <ThemeProvider theme={theme}>
            {/* ヘッダーナビ */}
            <Header authUser={authUser}  handleSetStatus={handleSetStatus}/>

            <ErrorBar status={status} setInitStatus={setInitStatus} message={message}/>

            {/* ルーティング */}
            <Routes>

                <Route path="/" element={
                     <Home authUser={authUser}  handleSetStatus={handleSetStatus} /> } />

                <Route path="/login" element={
                     <Login authUser={authUser}  handleSetStatus={handleSetStatus} /> } />

                <Route path="/register" element={
                     <Register authUser={authUser}  handleSetStatus={handleSetStatus} /> } />

                <Route path="/account" element={
                     <Account authUser={authUser}  handleSetStatus={handleSetStatus} /> } />

                <Route path="/account/team" element={
                    <AccountTeam
                        authUser={authUser}
                        handleSetStatus={handleSetStatus}
                        belongsTeam={belongsTeam}
                        ownerTeam={ownerTeam}
                        getBelongsTeam={getBelongsTeam}
                        getOwnerTeam={getOwnerTeam}/> }/>

                <Route path="/team/members" element={
                    <AccountTeamMembers
                        authUser={authUser}
                        handleSetStatus={handleSetStatus}
                        belongsTeam={belongsTeam}
                        ownerTeam={ownerTeam}
                        getBelongsTeam={getBelongsTeam}
                        getOwnerTeam={getOwnerTeam}/> }/>

                <Route path="/team/create" element={
                     <TeamCreate authUser={authUser}  handleSetStatus={handleSetStatus}  /> } />

                <Route path="/team" element={
                    <Team
                        authUser={authUser}
                        handleSetStatus={handleSetStatus}
                        belongsTeam={belongsTeam}
                        ownerTeam={ownerTeam}
                        getBelongsTeam={getBelongsTeam}
                        getOwnerTeam={getOwnerTeam}/> }/>

                <Route path="/recruitment/index" element={
                     <RecruitmentIndex
                        authUser={authUser}
                        handleSetStatus={handleSetStatus}
                        belongsTeam={belongsTeam}
                        ownerTeam={ownerTeam}
                        getBelongsTeam={getBelongsTeam}
                        getOwnerTeam={getOwnerTeam}/> }/>

                <Route path="/recruitment/create" element={
                     <RecruitmentCreate
                        authUser={authUser}
                        handleSetStatus={handleSetStatus}
                        belongsTeam={belongsTeam}
                        ownerTeam={ownerTeam}
                        getBelongsTeam={getBelongsTeam}
                        getOwnerTeam={getOwnerTeam}/> }/>

                <Route path="/recruitment" element={
                     <Recruitment
                        authUser={authUser}
                        handleSetStatus={handleSetStatus}
                        belongsTeam={belongsTeam}
                        ownerTeam={ownerTeam}
                        getBelongsTeam={getBelongsTeam}
                        getOwnerTeam={getOwnerTeam}/> }/>

                <Route element={
                     <Home authUser={authUser}  handleSetStatus={handleSetStatus} /> } />

            </Routes>

            {/* 追従ナビ */}
            <FooterNavi inView={inView}/>

            <div ref={ref}>
                {/* フッター */}
                <Footer authUser={authUser} handleSetStatus={handleSetStatus}/>

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
