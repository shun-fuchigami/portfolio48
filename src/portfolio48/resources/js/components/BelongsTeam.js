import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Container,Card,Typography,CardHeader,CardActions,Button,CardContent,List,ListItem,ListItemText } from '@mui/material';
import axios from 'axios';
import { textNewLine } from '../util';

export default function BelongsTeam (props){

    const handleTeamLeave = (prop)=>(e)=>{
        axios.post(`/api/team/leave?teamId=${prop}&userId=${props.authUser.id}`)
        .then(response=>{
            console.log(response);
            props.handleSetStatus("success");
            window.location.href = '/account/team';
        })
        .catch(e=>{
            console.log(e);
            props.handleSetStatus("error");
        })
    }

    return(
        <Card elevation={0} sx={{mt:5}}>
            <CardHeader title={`${props.authUser.name}の所属チーム一覧`}  />

            { props.belongsTeam.length?
                props.belongsTeam.map ((team,index)=>{
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
                                <Button size="small" color="primary" onClick={handleTeamLeave(team.id)}>
                                    <Typography>
                                        チーム脱退
                                    </Typography>
                                </Button>
                            </CardActions>
                        </Card>
                    );
                })
                :
                <Card sx={{p:2, m:2 }} variant="outlined" >
                    <CardContent>
                        <List>
                            <ListItem>
                                <ListItemText primary="チーム名" secondary="チーム未所属です" />
                            </ListItem>
                        </List>
                    </CardContent>
                    <CardActions sx={{pb:0, justifyContent:'end'}}>
                        <Button size="small" color="primary" href='/recruitment/index' >
                            <Typography>
                                募集を探す
                            </Typography>
                        </Button>
                    </CardActions>
                    </Card>
            }
        </Card>
    );
}
