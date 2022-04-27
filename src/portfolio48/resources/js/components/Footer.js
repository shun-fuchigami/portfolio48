import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { AppBar,Container,Typography } from '@mui/material';
import { Link,MenuList,MenuItem } from '@mui/material';
import { common } from '@mui/material/colors';

export default function Footer(props){

    function handleLogout(){
        axios.post('/api/logout')
        .then((response=>{
            console.log('ログアウト');
            console.log(response.data);
            window.location.href = '/';
        }))
        .catch((e)=>{
          console.log(e)
        })
    }

    const displayRule = {
        common:{display:"block" ,},
        guest:{display: props.authUser.isLogin ? "none" : "block", },
        user:{display: props.authUser.isLogin ? "block" : "none", },
    }

    const commonItems = [
        {title:"トップページ", href:"/" , onClick:null},
        {title:"募集を探す", href:"/recruitment/index", onClick:null},
    ];
    const guestItems = [
        {title:"ログイン", href:"/login", onClick:null},
        {title:"ユーザ登録", href:"/register", onClick:null},
    ];
    const userItems1 = [
        {title:"アカウント", href:`/account?userId=${props.authUser.id}`, onClick:null},
        {title:"ログアウト", href:null, onClick:(e)=>{handleLogout();} },
    ];
    const userItems2 = [
        {title:"チーム作成", href:"/team/create", onClick:null},
        {title:"チーム確認", href:"/account/team", onClick:null},
    ];

    const menuLists = [
        {rule:displayRule.common,items:commonItems},
        {rule:displayRule.guest,items:guestItems},
        {rule:displayRule.user,items:userItems1},
        {rule:displayRule.user,items:userItems2},
    ];

    return(
        <AppBar
            position="static"
            component="footer"
            sx={{mt:5, pt:4, pb:4,}}>
            <Container maxWidth='md' sx={{display:'flex', justifyContent:'space-evenly'}}>
                {
                    menuLists.map((menuList,index)=>{
                        return(
                            <MenuList key={index} sx={menuList.rule}>
                                {
                                    menuList.items.map((item,index)=>{
                                        return(
                                            <MenuItem key={index} component={Link} href={item.href} onClick={item.onClick}>
                                                <Typography textAlign="center">{item.title}</Typography>
                                            </MenuItem>
                                        );
                                    })
                                }
                            </MenuList>
                        );
                    })
                }
            </Container>
        </AppBar>
    );
}
