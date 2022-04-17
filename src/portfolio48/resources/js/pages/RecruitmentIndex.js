import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal,Card,Typography,CardHeader,CardActions,Button,CardContent,List,ListItem,ListItemText } from '@mui/material';
import axios from 'axios';
import { Container } from '@mui/material';
import { textNewLine } from '../util';

export default function RecruitmentIndex(props){


    const [recruitments,setRecruitments] = useState([]);
    const [selected,setSelected] = useState();
    const [open, setOpen] = React.useState(false);
    const handleOpen = (props)=> (e) => {
        setSelected(props)
        setOpen(true);
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

    /**
     * メンバ募集のAPI取得
     */
    function getRecruitment(){
        axios.get(`/api/recruitment/index`)
            .then((response)=>{
                console.log(response.data);
                setRecruitments(response.data);
            })
            .catch( e =>{
                console.log(e);
            })
    };

    function appRecruitment(){
        axios.post(`/api/recruitment/app?recruitmentId=${selected}&userId=${props.authUser.id}`)
            .then((response)=>{
                console.log(response.data);
                props.handleSetStatus("success");
                window.location.href = '/recruitment/index';
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
        <CardHeader title={"メンバ募集一覧"} />

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            {props.authUser.isLogin?
                <Card sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
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
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{pb:2}} >
                        応募するにはログインが必要です。
                    </Typography>
                    <Typography id="modal-modal-p-1" variant="caption" component="p">
                        アカウントをお持ちの方はログインページよりログインしてください。
                    </Typography>
                    <Typography id="modal-modal-p-2" variant="caption" component="p">
                        アカウントをお持ちでない方は新規ユーザ登録ページより登録してください。
                    </Typography>
                    <Card elevation={0} sx={{ display:'flex', mt:2, p:1, justifyContent:'space-evenly'}}>
                        <Button size="small" color="primary" variant='contained' href="/login">
                            <Typography>
                                ログイン
                            </Typography>
                        </Button>
                        <Button size="small" color="primary" variant='contained' href="/register" >
                            <Typography>
                                新規ユーザ登録
                            </Typography>
                        </Button>
                    </Card>
                </Card>
            }
        </Modal>

        { recruitments.length?
            recruitments.map ((recruitment,index)=>{
                return(
                    <Card key={index}  sx={{p:2,m:2}} variant="outlined" >
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
                            <Button size="small" color="primary" href={`/recruitment?recruitmentId=${recruitment.id}`} >
                                <Typography>
                                    募集ページ確認
                                </Typography>
                            </Button>
                            <Button size="small" color="primary" onClick={handleOpen(recruitment.id)} >
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
        </Card>
    );
}
