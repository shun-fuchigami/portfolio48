import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Card, CardHeader, CardContent, TextField, Container,CardActionArea,IconButton,Typography } from '@mui/material';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import bg from '../../../public/imgs/background-3.jpg';
import { useLocation } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
  maxWidth:'sm',
  minWidth:'200px',
  m:'0 auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function RecruitmentCreate(props) {

    const search = useLocation().search;
    const query = new URLSearchParams(search);

    const [titleValues,setTitleValues] = useState({
        title:'',
        error:false,
    })
    const [descValues,setDescValues] = useState({
        desc:'',
        length:0,
        error:false,
    })

    const [tags, setTags ] = React.useState(()=>[]);
    const [tagValues, setTagValues ] = React.useState({
        tag:"",
        length:0,
        error:false
    });

    /**
     * タイトルフォームの制御
     * @param {*} event
     */
    const handleChangeTitleValues = (event) => {
        let pattern = /^.{4,20}$/;
        if( !pattern.test(event.target.value) ){
            setTitleValues({...titleValues, title: event.target.value, error: true });
        } else{
            setTitleValues({...titleValues, title: event.target.value, error: false });
        }
    };

    /**
     * 募集内容フォームの制御
     * @param {*} event
     */
    const handleChangeDescValues = (event) => {
        let length = event.target.value.length;

        if( length < 1 ){
            setDescValues({
                ...descValues,
                desc: event.target.value,
                length: length,
                error: true });
        }else if( length <= 300 ){
            setDescValues({
                ...descValues,
                desc: event.target.value,
                length: length,
                error: false });
        } else {
            setDescValues({
                ...descValues,
                desc: event.target.value,
                length: length,
                error: true });
        }
    };

    /**
     * 募集タイトルのエラーチェック
     * @returns エラーがある場合false
     */
    function checkErrorTitle(){
        let pattern = /^.{4,20}$/;
        if( !pattern.test(titleValues.title) ){
            setTitleValues({...titleValues, error: true });
            return false;
        } else{
            setTitleValues({...titleValues, error: false });
            return true;
        }
    }

    /**
     * 募集内容のエラーチェック
     * @returns エラーがある場合false
     */
    function checkErrorDesc(){
        let length = descValues.desc.length;

        if( length < 1 ){
            setDescValues({
                ...descValues,
                error: true });
            return false;
        }else if( length <= 300 ){
            setDescValues({
                ...descValues,
                error: false });
            return true;
        } else {
            setDescValues({
                ...descValues,
                error: true });
            return false;
        }
    }

    /**
     * タグフォームの制御
     * @param {*} event
     */
    function handleChangeTagValues(event){
        let length = event.target.value.length;
        if( length <= 20 ){
            setTagValues({
                ...tagValues,
                tag: event.target.value,
                length: length,
                error: false });
        } else {
            setTagValues({
                ...tagValues,
                tag: event.target.value,
                length: length,
                error: true });
        }}

    /**
     * タグ追加ボタン制御
     */
    function handleTagRegister(){
        // 空白・Nullチェック
        // タグ数チェック
        if(tagValues.tag === "" || tagValues.tag == null){
            return;
        } else if(tags.length > 5){
            return;
        }

        // 入力値の初期化
        setTagValues({
            ...tagValues,
            tag: "",
            length:0,
            error: false });

        // 重複チェック
        let duplicateFlag = false;
        tags.forEach((tag)=>{
            if(tag === tagValues.tag){
                duplicateFlag = true;
            }
        })

        if(duplicateFlag){
            return;
        }

        setTags([...tags,tagValues.tag]);
    }

    /**
     * タグ削除ボタン制御
     * @param {*} prop
     * @returns
     */
    const handleTagDelete = (prop) => (e) =>{

        let newTags = tags.filter((tag)=>{
            return tag !== prop;
        })

        newTags.length ? setTags([...newTags]):setTags([]);
    }

    /**
     * 登録ボタン制御
     */
    function handleRegister(){
        let checkTitle = checkErrorTitle();
        let checkDesc = checkErrorDesc();

        if( !checkTitle || !checkDesc ){
            return;
        }

        window.axios.post('/api/recruitment/create',{
            teamId:query.get("teamId"),
            title:titleValues.title,
            desc:descValues.desc,
            tags:tags
        })
        .then(response=>{
            console.log(response.data);
            props.handleSetStatus("success");
            window.location.href = `/team/?teamId=${query.get("teamId")}`;
        })
        .catch((e)=>{
            console.log(e)
            props.handleSetStatus("error");
        })
    }

    return (
        <Container
            maxWidth="false"
            disableGutters
            sx={{ p:4, width:'100%' , backgroundImage:`url(${bg})`,backgroundColor:'rgba(0,0,0,.5)',backgroundBlendMode:'color'}} >
                <Card square sx={style}>
                    <CardHeader
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ m:0 }}
                        title="メンバ募集作成"
                    />
                    <CardContent sx={{ display:'flex', flexDirection:'column', alignItems:'left', justifyContent:'center', gap:'16px',}}>
                            <TextField
                                label="募集タイトル"
                                name="title"
                                required
                                value={titleValues.title}
                                error={titleValues.error}
                                id="outlined-required-Email"
                                placeholder="4文字以上20文字以下"
                                helperText={titleValues.error? "4文字以上20文字以下で入力してください":null}
                                sx={{width: '100%'}}
                                onChange={handleChangeTitleValues}
                            />
                            <TextField
                                label="募集内容"
                                name="desc"
                                multiline
                                rows='10'
                                required
                                value={descValues.desc}
                                error={descValues.error}
                                id="outlined-required-userName"
                                placeholder="1文字以上300文字以下"
                                helperText={
                                    descValues.error
                                        ? `${descValues.length}文字です。1文字以上300文字以下で入力してください。`
                                        : `${descValues.length}文字`}
                                sx={{width: '100%'}}
                                onChange={handleChangeDescValues}
                            />

                            <TextField
                                label="タグ"
                                name="tag"
                                value={tagValues.tag}
                                error={tagValues.error}
                                id="outlined-required-userName"
                                placeholder="5つまでタグを追加することができます。"
                                helperText={
                                    tagValues.error
                                        ? `${tagValues.length}文字です。20文字以下で入力してください。`
                                        : `${tagValues.length}文字`}
                                sx={{width: '100%'}}
                                onChange={handleChangeTagValues}
                            />
                            <Button
                                variant="contained"
                                onClick={handleTagRegister}
                                sx={{width:'100px'}}
                                disabled ={ tags.length >= 5 || tagValues.error ? true : false }
                                >
                                タグ追加
                            </Button>

                            <Container sx={{display:'flex', flexWrap:'wrap', gap:1}}>
                                    {tags.length ?
                                        tags.map((tag,index)=>{
                                            return(
                                                <Card key={index} variant="outlined" sx={{display:'flex', p:1, alignItems:'center'}} >
                                                    <CardContent sx={{textAlign:'center', pt:0,pb:0}}>
                                                        <Typography variant='caption'>
                                                            {tag}
                                                        </Typography>
                                                    </CardContent>
                                                    <IconButton onClick={handleTagDelete(tag)}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </Card>
                                                )
                                            })
                                        :null
                                    }
                            </Container>

                            <Button
                                variant="contained"
                                onClick={handleRegister}
                                endIcon={<SendIcon />}
                                disabled={
                                    descValues.error ||
                                    titleValues.error ? true : false
                                }
                            >
                                新規作成
                            </Button>
                    </CardContent>
                </Card>
            </Container>
    );
};

