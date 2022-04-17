import React, { useEffect, useState } from 'react';
import { Container,Card,Typography,CardHeader,CardContent,List,ListItem,ListItemText,CardActions,Button,Modal } from '@mui/material';
import { useLocation } from 'react-router-dom';


export default function AccountTeamMembers(props){

    const search = useLocation().search;
    const query = new URLSearchParams(search);
    const [selected,setSelected] = useState();
    const[teamMembers,setTeamMembers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = (props) => (e) =>{
        setOpen(true);
        setSelected(props);
    }
    const handleClose = () => setOpen(false);
    const [openKick, setOpenKick] = React.useState(false);
    const handleOpenKick = (props) => (e) =>{
        setOpenKick(true);
        setSelected(props);
    }
    const handleCloseKick = () => setOpenKick(false);

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



    /**
     * メンバの取得API
     */
    function getTeamMembers(){
        axios.get(`/api/team/members?teamId=${query.get('teamId')}`)
            .then((response)=>{
                console.log(response.data);
                setTeamMembers(response.data);
            })
            .catch( e =>{
                console.log(e);
            })
    };

    /**
     * オーナーの変更API
     */
    function handleOwnerChange(){
        axios.post('/api/team/owner/change',{
            teamId:query.get('teamId'),
            userId:selected,
        })
        .then((response)=>{
            console.log(response.data);
            setTeamMembers(response.data);
            window.location.href = `/team/members?teamId=${query.get('teamId')}`;
        })
        .catch( e =>{
            console.log(e);
        })
    }

    /**
     * メンバーの追放API
     */
    function handleOwnerChange(){
        axios.post('/api/team/member/kick',{
            teamId:query.get('teamId'),
            userId:selected,
        })
        .then((response)=>{
            console.log(response.data);
            setTeamMembers(response.data);
            props.handleSetStatus("success");
            window.location.href = `/team/members?teamId=${query.get('teamId')}`;
        })
        .catch( e =>{
            console.log(e);
            props.handleSetStatus("error");
        })
    }


    useEffect(()=>{
        getTeamMembers();
    },[])

    return(
        <Container maxWidth='md'>
            <Card elevation={0} sx={{mt:5}}>
                <CardHeader title="チームメンバー一覧"  />

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Card sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" >
                            このユーザを管理者へ変更します。よろしいですか？
                        </Typography>
                        <Card elevation={0} sx={{ display:'flex', mt:2, p:1, justifyContent:'space-evenly'}}>
                            <Button size="small" color="primary" variant='contained' onClick={handleOwnerChange} >
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
                <Modal
                    open={openKick}
                    onClose={handleCloseKick}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Card sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" >
                            このユーザを追放します。よろしいですか？
                        </Typography>
                        <Card elevation={0} sx={{ display:'flex', mt:2, p:1, justifyContent:'space-evenly'}}>
                            <Button size="small" color="primary" variant='contained' onClick={handleOwnerChange} >
                                <Typography>
                                    OK
                                </Typography>
                            </Button>
                            <Button size="small" color="primary" variant='contained' onClick={handleCloseKick} >
                                <Typography>
                                    キャンセル
                                </Typography>
                            </Button>
                        </Card>
                    </Card>
                </Modal>
                {
                    teamMembers.length?
                            <Card sx={{p:2,m:2}} variant="outlined" >
                                <CardContent>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary="オーナー名" secondary={teamMembers[0].owner_user.name} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="登録メールアドレス" secondary={teamMembers[0].owner_user.email} />
                                        </ListItem>
                                    </List>
                                </CardContent>
                            </Card>
                    :null
                }
                {
                    teamMembers.length?
                        teamMembers[0].users.map((user)=>{
                            return(
                                <Card sx={{p:2,m:2}} variant="outlined" >
                                    <CardContent>
                                        <List>
                                            <ListItem>
                                                <ListItemText primary="ユーザ名" secondary={user.name} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="登録メールアドレス" secondary={user.email} />
                                            </ListItem>
                                            {
                                            teamMembers[0].owner_id === props.authUser.id ?
                                                    <CardActions
                                                        sx={{ pb:0, justifyContent:'end' }} >
                                                        <Button size="small" color="primary" onClick={handleOpen(user.id)}>
                                                            <Typography>
                                                                オーナーへ変更する
                                                            </Typography>
                                                        </Button>
                                                        <Button size="small" color="primary" onClick={handleOpenKick(user.id)}>
                                                            <Typography>
                                                                チーム追放
                                                            </Typography>
                                                        </Button>
                                                    </CardActions>
                                            :null
                                            }
                                        </List>
                                    </CardContent>
                                </Card>
                            );
                        })
                    :
                    <Card sx={{p:2,m:2}} variant="outlined" >
                        <CardContent>
                            <List>
                                <ListItem>
                                    <ListItemText primary="まだメンバー未所属です。" />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                }
            </Card>
        </Container>
    );
}
