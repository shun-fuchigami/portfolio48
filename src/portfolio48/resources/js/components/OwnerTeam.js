import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal,Card,Typography,CardHeader,CardActions,Button,CardContent,List,ListItem,ListItemText } from '@mui/material';
import { textNewLine } from '../util';


export default function OwnerTeam(props){

    const listItems = [
        {title:"チーム名", content:'name', newLine:false },
        {title:"紹介文", content:'desc', newLine:true},
        {title:"活動エリア", content:'area', newLine:true},
    ]
    const buttons = [
        {title:'チームメンバの確認',href:'/team/members?teamId=',},
        {title:'チームの詳細確認',href:'/team?teamId=',},
        {title:'メンバ募集作成',href:'/recruitment/create?teamId='},
    ]



    return(
        <Card elevation={0} sx={{mt:5}}>
        <CardHeader title={`${props.authUser.name}がオーナーのチーム一覧`}  />

        { props.ownerTeam.length?
            props.ownerTeam.map ((team,index)=>{
                return(
                    <Card key={index} sx={{p:2,m:2}} variant="outlined" >
                        <CardContent>
                            <List>
                                {
                                    listItems.map(listItem=>{
                                        return(
                                        <ListItem>
                                            <ListItemText
                                                primary={listItem.title}
                                                secondary={listItem.newLine ? textNewLine(team[listItem.content]) : team[listItem.content]}
                                            />
                                        </ListItem>
                                        );
                                    })
                                }
                            </List>
                        </CardContent>
                        <CardActions sx={{pb:0, justifyContent:'end'}}>
                            {
                                buttons.map((button)=>{
                                    return(
                                        <Button size="small" color="primary" href={button.href + team.id}>
                                            <Typography variant='caption'>
                                                {button.title}
                                            </Typography>
                                        </Button>
                                    );
                                })
                            }
                        </CardActions>
                    </Card>
                );
            })
            :
            <Card sx={{p:2, m:2}} variant="outlined" >
                <CardContent>
                    <List>
                        <ListItem>
                            <ListItemText primary="チーム名" secondary="チーム未所有です" />
                      </ListItem>
                    </List>
                </CardContent>
                <CardActions sx={{pb:0, justifyContent:'end'}}>
                    <Button size="small" color="primary" href="/team/create">
                        <Typography variant='caption'>
                            チーム作成
                        </Typography>
                    </Button>
                </CardActions>
             </Card>
        }
        </Card>
    );
}
