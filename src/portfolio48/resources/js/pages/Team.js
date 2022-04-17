import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Container,Card,Typography,CardHeader,CardActions,Button,CardContent,List,ListItem,ListItemText } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { textNewLine } from '../util';

export default function Team(props){

    const search = useLocation().search;
    const query = new URLSearchParams(search);
    const [teams,setTeams] = useState([]);

    /**
     * メンバ募集のAPI取得
     */
    function getTeam(){
        axios.get(`/api/team?teamId=${query.get("teamId")}`)
            .then((response)=>{
                console.log(response.data);
                setTeams(response.data);
            })
            .catch( e =>{
                console.log(e);
            })
    };

    useEffect(()=>{
        getTeam();
    },[])

    return(
        <Card elevation={0} sx={{mt:5, maxWidth:'md', ml:'auto',mr:'auto'}}>
        <CardHeader title="チーム詳細ページ"/>
        {teams.length?
            teams.map ((team,index)=>{
                return(
                    <Card key={index} sx={{p:2,m:2}} variant="outlined" >
                        <CardContent>
                            <List>
                                <ListItem>
                                    <ListItemText primary="チーム名" secondary={team.name} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="チーム紹介文" secondary={textNewLine(team.desc)} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="活動エリア" secondary={textNewLine(team.area)} />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                );
            })
            :
            <Card sx={{p:2, m:2}} variant="outlined" >
                <CardContent>
                    <List>
                        <ListItem>
                            <ListItemText primary="チームが見つかりません。"/>
                        </ListItem>
                    </List>
                </CardContent>
             </Card>
        }
        <CardHeader title="掲載している募集" variant="secondary"/>
        {teams.length && teams[0].recruitments.length?
            teams[0].recruitments.map((recruitment,index)=>{
                return(
                    <Card key={index} sx={{p:2,m:2}} variant="outlined" >
                        <CardContent>
                            <List>
                                <ListItem>
                                    <ListItemText primary="募集タイトル" secondary={recruitment.title} />
                                </ListItem>
                            </List>
                        </CardContent>
                        <CardActions sx={{pb:0, justifyContent:'end'}}>
                            <Button size="small" color="primary" href={`/recruitment?recruitmentId=${recruitment.id}`} >
                                <Typography>
                                    募集ページを見る
                                </Typography>
                            </Button>
                        </CardActions>
                    </Card>
                )
            })
            :
            <Card sx={{p:2, m:2}} variant="outlined" >
                <CardContent>
                    <List>
                        <ListItem>
                            <ListItemText primary="関連する募集がありません。"/>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        }
        </Card>

    );
}
