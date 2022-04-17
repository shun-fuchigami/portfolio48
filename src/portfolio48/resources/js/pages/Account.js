import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Container,Card,Avatar,Typography,CardHeader,CardContent,List,ListItem,ListItemText,CardActions,Button } from '@mui/material';


export default function Account(props){
    return(
            <Container maxWidth='md'>
                <Card elevation={0} sx={{mt:5}}>
                    <CardHeader title={`${props.authUser.name}のアカウントページ`}  />
                    <Card sx={{p:2,m:2}} variant="outlined" >
                        <CardContent>
                            <List>
                                <ListItem>
                                    <Avatar alt={props.authUser.name} src="/" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="ユーザID" secondary={props.authUser.id} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="ユーザ名" secondary={props.authUser.name} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="登録メールアドレス" secondary={props.authUser.email} />
                                </ListItem>
                                <CardActions sx={{pb:0, justifyContent:'end'}}>
                                    <Button size="small" color="primary" href={`/account/team`}>
                                        <Typography>
                                            所属チーム確認
                                        </Typography>
                                    </Button>
                                </CardActions>
                            </List>
                        </CardContent>
                    </Card>
                </Card>
            </Container>
    );
}
