import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal,Card,Typography,CardHeader,CardActions,Button,CardContent,List,ListItem,ListItemText } from '@mui/material';
import { textNewLine } from '../util';


export default function OwnerTeam(props){

    return(
        <Card elevation={0} sx={{mt:5}}>
        <CardHeader title={`${props.authUser.name}がオーナーのチーム一覧`}  />

        { props.ownerTeam.length?
            props.ownerTeam.map ((team,index)=>{
                return(
                    <Card key={index} sx={{p:2,m:2}} variant="outlined" >
                        <CardContent>
                            <List>
                                <ListItem>
                                    <ListItemText primary="チーム名" secondary={team.name} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="紹介文" secondary={textNewLine(team.desc)} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="活動エリア" secondary={textNewLine(team.area)} />
                                </ListItem>
                            </List>
                        </CardContent>
                        <CardActions sx={{pb:0, justifyContent:'end'}}>
                            <Button size="small" color="primary" href={`/team/members?teamId=${team.id}`}>
                                <Typography>
                                    チームメンバの確認
                                </Typography>
                            </Button>
                            <Button size="small" color="primary" href={`/team?teamId=${team.id}`}>
                                <Typography>
                                    チームの詳細確認
                                </Typography>
                            </Button>
                            <Button size="small" color="primary" href={`/recruitment/create?teamId=${team.id}`}>
                                <Typography>
                                    メンバ募集作成
                                </Typography>
                            </Button>
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
                        <Typography>
                            チーム作成
                        </Typography>
                    </Button>
                </CardActions>
             </Card>
        }
        </Card>
    );
}
