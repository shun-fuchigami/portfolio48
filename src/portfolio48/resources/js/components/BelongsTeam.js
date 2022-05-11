import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Container,Card,Typography,CardHeader,CardActions,Button,CardContent,List,ListItem,ListItemText,Modal } from '@mui/material';
import axios from 'axios';
import { textNewLine } from '../util';

export default function BelongsTeam (props){


    const listItems = [
        {title:"チーム名", content:'name', newLine:false },
        {title:"紹介文", content:'desc', newLine:true},
        {title:"活動エリア", content:'area', newLine:true},
    ]
    
    const buttons = [
        {title:'チームメンバの確認',href:'/team/members?teamId=', handle:false },
        {title:'チームの詳細確認',href:'/team?teamId=', handle:null },
        {title:'チーム脱退',href:null, handle:true },
    ]


    const[selected,setSelected] = useState()
    const [open, setOpen] = useState(false);
    const handleOpen = (prop) => (e) => {
        console.log(e)
        setOpen(true);
        setSelected(prop);
    }
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: 400,
        minWidth: 200,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const handleTeamLeave = (prop)=>(e)=>{
        e.preventDefault();
        axios.post(`/api/team/leave?teamId=${prop}&userId=${props.authUser.id}`)
        .then(response=>{
            console.log(response);
            props.handleSetMessage(response.data,"success");
            window.location.href = '/account/team';
        })
        .catch(e=>{
            props.handleSetMessage(e.response.data,"error");

            console.log(e);
        })
    }

    return(

        <Card elevation={0} sx={{mt:5}}>
            <CardHeader title={`${props.authUser.name}の所属チーム一覧`}  />

            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Card sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" >
                        チームを脱退します。よろしいですか？
                    </Typography>
                    <Card elevation={0} sx={{ display:'flex', mt:2, p:1, justifyContent:'space-evenly'}}>
                        <Button size="small" color="primary" variant='contained' onClick={handleTeamLeave(selected)} >
                            <Typography>
                                OK
                            </Typography>
                        </Button>
                        <Button size="small" color="primary" variant='contained' onClick={handleClose} >
                            <Typography>
                                キャンセル
                            </Typography>
                        </Button>
                    </Card>
                </Card>
            </Modal>

            { props.belongsTeam.length?
                props.belongsTeam.map ((team,index)=>{
                    return(
                        <Card key={index} sx={{p:2,m:2}} variant="outlined" >
                            <CardContent>
                                <List>
                                {
                                    listItems.map((listItem,index)=>{
                                        return(
                                        <ListItem key={index}>
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
                                buttons.map((button,index)=>{
                                    return(
                                        <Button
                                            key={index}
                                            size="small"
                                            color="primary"
                                            href={button.href ? button.href + team.id : null}
                                            onClick={ button.handle ? handleOpen(team.id) :null }
                                        >
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
                            <Typography variant='caption'>
                                募集を探す
                            </Typography>
                        </Button>
                    </CardActions>
                    </Card>
            }
        </Card>
    );
}
