import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { AppBar,Container,Typography } from '@mui/material';
import { Link,MenuList,MenuItem } from '@mui/material';

export default function Footer(props){

    function handleLogout(){
        axios.post('/api/logout')
        .then((response=>{
            console.log('ログアウト');
            console.log(response.data);
            props.handleSetStatus("success");
            window.location.href = '/';
        }))
        .catch((e)=>{
          console.log(e)
          props.handleSetStatus("error");
        })
    }

    return(
        <AppBar
            position="static"
            sx={{mt:5, pt:4, pb:4}}>
             <Container
                maxWidth='md'
                sx={{ display:'flex', flexWrap:'wrap', justifyContent : 'space-around'}}
            >
                <MenuList>

                    <MenuItem component={Link} href="/">
                        <Typography textAlign="center">トップページ</Typography>
                    </MenuItem>

                    <MenuItem component={Link} href="/recruitment/index">
                        <Typography textAlign="center">募集を探す</Typography>
                    </MenuItem>

                </MenuList>

                <MenuList sx={{ display: props.authUser.isLogin ? "none" : "block"}}>

                    <MenuItem component={Link} href="/login">
                        <Typography textAlign="center">ログイン</Typography>
                    </MenuItem>

                    <MenuItem component={Link} href="/register">
                         <Typography textAlign="center">ユーザ登録</Typography>
                    </MenuItem>

                </MenuList>

                <MenuList sx={{ display: props.authUser.isLogin ? "block" : "none"}}>

                    <MenuItem
                        component={Link} href={`/account?userId=${props.authUser.id}`}>
                        <Typography textAlign="center">アカウント</Typography>
                    </MenuItem>

                    <MenuItem
                        onClick={(e)=>{
                            handleLogout();
                            }}
                        component={Link}
                    >
                        <Typography textAlign="center">ログアウト</Typography>
                    </MenuItem>

                </MenuList>

                <MenuList sx={{ display: props.authUser.isLogin ? "block" : "none"}}>

                    <MenuItem component={Link} href="/team/create">
                        <Typography textAlign="center">チーム作成</Typography>
                    </MenuItem>

                    <MenuItem component={Link} href={`/account/team`}>
                        <Typography textAlign="center">チーム確認</Typography>
                    </MenuItem>

                </MenuList>
            </Container>
        </AppBar>


    );
}
