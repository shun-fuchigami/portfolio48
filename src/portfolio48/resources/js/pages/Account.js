import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Container,Card,Avatar,Typography,CardHeader,CardContent } from '@mui/material';


export default function Account(props){
    return(
        <Container maxwidth='md' sx={{height:"600px"}}>
            <Card maxwidth= 'sm' sx={{height:'500px', mt:5}}>
                <CardHeader title={`${props.authUser.name}のアカウントページ`}/>
                <CardContent sx={{p:4}}>
                        <Avatar alt={props.authUser.name} src="/" />
                        <Typography textAlign="left" sx={{pt:1}} > ユーザID:{props.authUser.id} </Typography>
                        <Typography textAlign="left" sx={{pt:1}} > ユーザ名:{props.authUser.name} </Typography>
                        <Typography textAlign="left" sx={{pt:1}} > 登録メールアドレス:{props.authUser.email} </Typography>
                        <Typography textAlign="left" sx={{pt:1}} > 所属チーム： </Typography>
                        <Typography textAlign="left" sx={{pt:1}} > 応募したメンバ募集： </Typography>
                </CardContent>
            </Card>
        </Container>
    );
}
