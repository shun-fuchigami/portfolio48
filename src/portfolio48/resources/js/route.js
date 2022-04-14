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
import Account from './pages/Account';
import axios from 'axios';
import ErrorBar from './components/ErrorBar';
import TeamCreate from './pages/TeamCreate';


function App(){
    const [ref,inView,entry] = useInView({
        threshold:0,
        rootMargin:'0px 0px 100px 0px',
    })

    const [authUser,setAuthUser] = useState({
        id:0,
        name:"guest",
        email:"",
        isLogin:false,
    })

    const [status,setStatus] = useState({});
    const [message,setMessage] = useState({
        error:"エラーが発生しました。",
        warning:"入力が誤っていないか確認してください。",
        info:"This is an info alert — check it out!",
        success:"実行に成功しました。",
    });

    function setInitStatus(){
        setStatus({
            error:false,
            warning:false,
            info:false,
            success:false,
        });
    }

    function handleSetStatus(target){
        setStatus({...status, [target]:true});
    };

    /**
     * 認証されたユーザを取得する
     */
    function getAuthUser(){
        axios.get(`/api/user`)
            .then((response)=>{
                console.log(response.data);
                setAuthUser({
                    id:response.data.id,
                    name:response.data.name,
                    email:response.data.email,
                    isLogin:true,
                });
            })
            .catch( e =>{
                console.log(e);
                setAuthUser({
                    id:0,
                    name:"guest",
                    email:"",
                    isLogin:false,
                });
            })
    };

    useEffect(()=>{
        getAuthUser();
        setInitStatus();
    },[]);

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

                <Route path="/account/:username" element={
                     <Account authUser={authUser}  handleSetStatus={handleSetStatus} /> } />

                <Route path="/team/create" element={
                     <TeamCreate authUser={authUser}  handleSetStatus={handleSetStatus} /> } />

            </Routes>

            {/* 追従ナビ */}
            <FooterNavi inView={inView}/>

            <div ref={ref}>
                {/* フッター */}
                <Footer/>

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
