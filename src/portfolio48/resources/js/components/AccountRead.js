import React, { useEffect, useState } from 'react';
import { Container,Card,Avatar,Typography,CardHeader,CardContent,List,ListItem,ListItemText,CardActions,Button,Box,Chip } from '@mui/material';



export default function AccountRead(props){
    const buttons = [
        {title:'パスワード変更',href:null, onClick:()=>{props.setUpdateFlag(true)} },
        {title:'登録情報変更',href:null, onClick:()=>{props.setUpdateFlag(true)}},
        {title:'所属チーム確認',href:'/account/team'},
    ]

    const listItems = [
        {title:"ユーザID", content:props.authUser.id, box:null},
        {title:"ユーザ名", content:props.authUser.name, box:null},
        {title:"登録メールアドレス", content:props.authUser.email, box:null},
        {title:"自己紹介", content:props.authUser.intro, box:null},
        {
            title:"ポジション",
            content:null,
            box:
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {props.authUser.positions ?
                        props.authUser.positions.map((position,index)=>{
                            return(
                                    <Chip key={index} label={position.name}/>
                                )
                            })
                            :null
                        }
                </Box>
        },
    ]

    return(
            <Card elevation={0} sx={{mt:5}}>
                <CardHeader title={`${props.authUser.name}のアカウントページ`}  />
                <Card sx={{p:2,m:2}} variant="outlined" >
                    <CardContent>
                        <List>
                            <ListItem>
                                <Avatar alt={props.authUser.name} src="/" />
                            </ListItem>
                            {   listItems.map((listItem,index)=>{
                                    return(
                                        <ListItem key={index} sx={{display:'block'}}>
                                            <ListItemText primary={listItem.title} secondary={listItem.content} />
                                            {listItem.box}
                                        </ListItem>
                                    )
                                })
                            }
                            <CardActions sx={{pb:0, justifyContent:'end'}}>
                                {
                                    buttons.map((button,index)=>{
                                        return(
                                            <Button
                                                key={index}
                                                size="small"
                                                color="primary"
                                                href={button.href}
                                                onClick={button.onClick}
                                                sx={{ml:1}}
                                            >
                                                <Typography variant='caption'>
                                                    {button.title}
                                                </Typography>
                                            </Button>
                                        );
                                    })
                                }
                            </CardActions>
                        </List>
                    </CardContent>
                </Card>
            </Card>
    );
}
