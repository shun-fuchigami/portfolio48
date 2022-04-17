
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Box,Card,Typography,CardHeader,CardActions,Button,CardContent,List,ListItem,ListItemText } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import { textNewLine } from '../util';

export default function Recruitment(props){

    const search = useLocation().search;
    const query = new URLSearchParams(search);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const[selected,setSelected] = useState()

    const [openConsent, setOpenConsent] = React.useState(false);
    const handleOpenConsent = (prop) => (e) => {
        setOpenConsent(true);
        setSelected(prop);
    }
    const handleCloseConsent = () => setOpenConsent(false);

    const [openDeny, setOpenDeny] = React.useState(false);
    const handleOpenDeny = (prop) => () => {
        setOpenDeny(true);
        setSelected(prop);
    }
    const handleCloseDeny = () => setOpenDeny(false);

    const [recruitments,setRecruitments] = useState([]);
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
     * メンバ募集のAPI取得
     */
    function getRecruitment(){
        axios.get(`/api/recruitment?recruitmentId=${query.get('recruitmentId')}`)
            .then((response)=>{
                console.log(response.data);
                setRecruitments(response.data);
            })
            .catch( e =>{
                console.log(e);
            })
    };

    /**
     * 募集への応募処理
     */
    function appRecruitment(){
        axios.post(`/api/recruitment/app?recruitmentId=${query.get('recruitmentId')}&userId=${props.authUser.id}`)
            .then((response)=>{
                console.log(response.data);
                props.handleSetStatus("success");
                window.location.href = `/recruitment?recruitmentId=${query.get('recruitmentId')}`;
            })
            .catch( e =>{
                console.log(e);
                props.handleSetStatus("error");
            })
    }

    /**
     * 応募の承諾処理
     * @param {*} prop
     */
    const consentApp = (e) => {
        axios.post(`/api/recruitment/app/consent?recruitmentId=${query.get('recruitmentId')}&userId=${selected}`)
            .then((response)=>{
                console.log(response.data);
                props.handleSetStatus("success");
                window.location.href = `/recruitment?recruitmentId=${query.get('recruitmentId')}`;
            })
            .catch( e =>{
                console.log(e);
                props.handleSetStatus("error");
            })
    }

    /**
     * 応募の拒否処理
     * @param {*} prop
     */
    const denyApp = (e) => {
        axios.post(`/api/recruitment/app/deny?recruitmentId=${query.get('recruitmentId')}&userId=${selected}`)
            .then((response)=>{
                console.log(response.data);
                props.handleSetStatus("success");
                window.location.href = `/recruitment?recruitmentId=${query.get('recruitmentId')}`;
            })
            .catch( e =>{
                console.log(e);
                props.handleSetStatus("error");
            })
    }


    useEffect(()=>{
        getRecruitment();
    },[])


    return(
        <Card elevation={0} sx={{maxWidth:'md', mt:5, ml:'auto', mr:'auto'}}>
        <CardHeader title={"メンバ募集一覧"}  />

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            {props.authUser.isLogin?
                <Card sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" >
                        メンバ募集へ応募します。よろしいですか？
                    </Typography>
                    <Card elevation={0} sx={{ display:'flex', mt:2, p:1, justifyContent:'space-evenly'}}>
                        <Button size="small" color="primary" variant='contained' onClick={appRecruitment} >
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
            :
                <Card sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{pb:2}}>
                        応募するにはログインが必要です。
                    </Typography>
                    <Typography id="modal-modal-p-1" variant="caption" component="p">
                        アカウントをお持ちの方はログインページよりログインしてください。
                    </Typography>
                    <Typography id="modal-modal-p-2" variant="caption" component="p">
                        アカウントをお持ちでない方は新規ユーザ登録ページより登録してください。
                    </Typography>
                    <Card elevation={0} sx={{ display:'flex', mt:2, p:1, justifyContent:'space-evenly'}}>
                        <Button size="small" color="primary" variant='text' href="/login">
                            <Typography>
                                ログインへ
                            </Typography>
                        </Button>
                        <Button size="small" color="primary" variant='text' href="/register" >
                            <Typography>
                                新規ユーザ登録へ
                            </Typography>
                        </Button>
                    </Card>
                </Card>
            }
        </Modal>

        <Modal
                    open={openConsent}
                    onClose={handleCloseConsent}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
            <Card sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" >
                    このユーザの参加を承諾します。よろしいですか？
                </Typography>
                <Card elevation={0} sx={{ display:'flex', mt:2, p:1, justifyContent:'space-evenly'}}>
                    <Button size="small" color="primary" variant='contained' onClick={consentApp} >
                        <Typography>
                            OK
                        </Typography>
                    </Button>
                    <Button size="small" color="primary" variant='contained' onClick={handleCloseConsent} >
                        <Typography>
                            キャンセル
                        </Typography>
                    </Button>
                </Card>
            </Card>
        </Modal>
        <Modal
            open={openDeny}
            onClose={handleCloseDeny}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" >
                    このユーザの参加を拒否します。よろしいですか？
                </Typography>
                <Card elevation={0} sx={{ display:'flex', mt:2, p:1, justifyContent:'space-evenly'}}>
                    <Button size="small" color="primary" variant='contained' onClick={denyApp} >
                        <Typography>
                            OK
                        </Typography>
                    </Button>
                    <Button size="small" color="primary" variant='contained' onClick={handleCloseDeny} >
                        <Typography>
                            キャンセル
                        </Typography>
                    </Button>
                </Card>
            </Card>
        </Modal>


        { recruitments.length?
            recruitments.map ((recruitment,index)=>{
                return(
                    <Card key={index} sx={{p:2,m:2}} variant="outlined" >
                        <CardContent>
                            <List>
                                <ListItem>
                                    <ListItemText primary="募集チーム" secondary={recruitment.teams.name} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="活動エリア" secondary={textNewLine(recruitment.teams.area)} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="募集タイトル" secondary={recruitment.title} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="募集内容" secondary={textNewLine(recruitment.desc)} />
                                </ListItem>
                                <ListItem sx={{display:'flex',flexDirection:'column',alignItems:'start'}}>
                                    <ListItemText primary="タグ"/>
                                    <Card elevation={0} sx ={{ display:'flex', flexWrap:'wrap', gap:1, p:1 }}>
                                        {recruitment.tags.length ?
                                            recruitment.tags.map((tag,index)=>{
                                                return(
                                                    <Card key={index} variant="outlined" sx={{display:'flex', p:1}} >
                                                        <Typography variant='caption'>
                                                            {tag.name}
                                                        </Typography>
                                                    </Card>
                                                    )
                                                })
                                                :null
                                            }
                                    </Card>
                                </ListItem>
                            </List>
                        </CardContent>
                        <CardActions sx={{pb:0, justifyContent:'end'}}>
                            <Button size="small" color="primary" href={`/team/?teamId=${recruitment.teams.id}`}>
                                <Typography>
                                    チームの詳細確認
                                </Typography>
                            </Button>
                            <Button size="small" color="primary" onClick={handleOpen}>
                                <Typography>
                                    募集へ応募
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
                            <ListItemText primary="募集がまだありません"/>
                        </ListItem>
                    </List>
                </CardContent>
             </Card>
        }
        {   recruitments.length &&
            recruitments[0].users.length ?
                props.authUser.id === recruitments[0].teams.owner_id ?
                recruitments[0].users.map((user,index)=>{
                    return(
                        <Card key={index} sx={{p:2,m:2}} variant="outlined" >
                            <CardContent>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="応募したユーザ名" secondary={user.name} />
                                    </ListItem>
                                </List>
                            </CardContent>
                            <CardActions sx={{pb:0, justifyContent:'end'}}>
                                <Button size="small" color="primary" onClick={handleOpenConsent(user.id)} >
                                    <Typography>
                                        チーム参加承諾
                                    </Typography>
                                </Button>
                                <Button size="small" color="primary" onClick={handleOpenDeny(user.id)} >
                                    <Typography>
                                        チーム参加拒否
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
                                <ListItemText primary={`応募数`} secondary={recruitments[0].users.length}/>
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
        }
        </Card>
    );
}
