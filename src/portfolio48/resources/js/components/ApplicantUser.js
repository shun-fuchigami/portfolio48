import React, { useEffect, useState } from 'react';
import { Card,Typography,CardActions,Button,CardContent,List,ListItem,ListItemText,Chip } from '@mui/material';
import { textNewLine } from '../util';


/**
 * 応募ユーザの情報を表示
 * @param {*} props
 * @returns
 */
export function ApplicantUser(props){

    const listItems = [
        {title:"応募したユーザ", content:'name', newLine:false},
        {title:"自己紹介", content:'intro', newLine:true},
    ]
    const buttons = [
        {title:'チーム参加承諾', handle: (prop) => props.handleOpenConsentModal(prop) },
        {title:'チーム参加拒否', handle: (prop) => props.handleOpenDenyModal(prop) },
    ]


    return(
        props.recruitments.length &&
        props.recruitments[0].users.length ?
            props.authUser.id === props.recruitments[0].teams.owner_id ?
            props.recruitments[0].users.map((user,index)=>{
                return(
                    <Card key={index} sx={{p:2,m:2}} variant="outlined" >
                        <CardContent>
                            <List>
                                {
                                    listItems.map((listItem,index)=>{
                                        return(
                                            <ListItem>
                                                <ListItemText
                                                    primary={listItem.title}
                                                    secondary={
                                                        listItem.newLine?
                                                        textNewLine(user[listItem.content]):
                                                        user[listItem.content]
                                                        }
                                                />
                                            </ListItem>
                                        );
                                    })
                                }
                            </List>
                        </CardContent>
                        <CardActions sx={{pb:0, justifyContent:'end'}}>
                            {
                                buttons.map((button,index)=>{
                                    return(
                                        <Button key={index} size="small" color="primary" onClick={button.handle(user.id)} >
                                            <Typography>
                                                {button.title}
                                            </Typography>
                                        </Button>
                                    );
                                })
                            }
                        </CardActions>
                    </Card>
                )
            })
            :
            <Card sx={{p:2, m:2}} variant="outlined" >
                <CardContent>
                    <List>
                        <ListItem>
                            <ListItemText primary={`応募数`} secondary={props.recruitments[0].users.length}/>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        :
        <Card sx={{p:2, m:2}} variant="outlined" >
            <CardContent>
                <List>
                    <ListItem>
                        <ListItemText primary={"応募がまだありません。"}/>
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
}
