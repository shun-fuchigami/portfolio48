import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import { Home } from "./pages/Home";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import FollowNavi from './components/FollowNavi';
import Footer from './components/Footer';
import Copyright from './components/Copyright';
import { useInView } from 'react-intersection-observer';
import { ThemeProvider } from '@mui/material';
import {theme} from './theme';

function App(){
    const [ref,inView,entry] = useInView({
    })


    return(
        <ThemeProvider theme={theme}>

            {/* ヘッダーナビ */}
            <ResponsiveAppBar />

            {/* ルーティング */}
            <Routes>
                <Route path="/" element={ <Home /> } />
            </Routes>

            {/* フッター */}
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>

            {/* 追従ナビ */}
            <FollowNavi inView={inView}/>

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
