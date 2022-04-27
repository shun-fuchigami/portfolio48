import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Card, CardHeader, CardContent, TextField, Container,Box,Chip } from '@mui/material';
import { Button } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import bg from '../../../public/imgs/background-3.jpg';
import { useLocation } from 'react-router-dom';

const style = {
  maxWidth:'sm',
  minWidth:'200px',
  m:'0 auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const formStyle = {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    gap:'16px',
}

const checkList=[
    'title',
    'desc',
    'tag',
]


export default function RecruitmentCreate(props) {

    const search = useLocation().search;
    const query = new URLSearchParams(search);

    const [values,setValues] = useState({
        title:"",
        desc:"",
        tag:"",
        tags:[],
        length:{
            desc:0,
            tag:0,
        },
        error:{
            title:false,
            desc:false,
            tag:false,
        },
        pattern:{
            title:/^.{4,20}$/,
            desc:/^[\s-\S]{1,300}$/,
            tag:/^.{1,20}$/,
        }
    })

    /**
     * フォームのハンドル
     * @param {*} prop 変更対象
     * @returns
     */
     const handleChange = (prop) => (event) => {
        let setValue;
        let checkValue = event.target.value;

        if(prop==='desc' || prop==='tag'){
            setValue = {...values, [prop]: event.target.value, length:{...values.length,[prop]:event.target.value.length}};
        }else{
            setValue = {...values, [prop]: event.target.value};
        }

        setValues(setValue);
        checkError(prop,setValue,checkValue);
    };

    /**
     * エラーチェック
     * @param {*} prop チェック対象
     * @param {*} prevValue チェック対象外のstate
     * @param {*} checkValue チェック対象の値
     */
    function checkError(prop, prevValue=values, checkValue=values[prop]){
        let setValue;

        if( !values.pattern[prop].test(checkValue) ){
            setValues({ ...prevValue, error:{...prevValue.error, [prop]:true} });
            setValue = { ...prevValue, error:{...prevValue.error, [prop]:true} }
        } else {
            setValues({ ...prevValue, error:{...prevValue.error, [prop]:false} });
            setValue = { ...prevValue, error:{...prevValue.error, [prop]:false} }
        }

        return setValue;
    };

    /**
     * エラーチェックを全て実行
     * @returns エラーがある場合true
     */
    function allCheckError(){
        let checkResult;
        let checkResults = [];

        checkList.forEach((c,index)=>{
            if(index===0){
                checkResult = checkError(c);
            }else{
                checkResult = checkError(c,checkResult);
            }
            checkResults.push(checkResult.error[c])
        })

        if( checkResults.includes(true)){
            return true;
        }else{
            return false;
        }
    }

    /**
     * タグ追加ボタン制御
     */
    function handleTagRegister(){
        // 空白・Nullチェック
        // タグ数チェック
        if(values.tag === "" || values.tag == null){
            return;
        } else if(values.tags.length > 5){
            return;
        }

        // 入力値の初期化
        let setValue = {
            ...values,
            tag: "",
            length:{...values.length, tag : 0},
            error:{...values.error, tag : false }
        }

        setValues(setValue);

        // 重複チェック
        let duplicateFlag = false;
        values.tags.forEach((tag)=>{
            if(tag === values.tag){
                duplicateFlag = true;
            }
        })

        if(duplicateFlag){
            return;
        }

        setValues({...setValue,tags:[...setValue.tags, values.tag]});
    }

    /**
     * タグ削除ボタン制御
     * @param {*} prop
     * @returns
     */
    const handleTagDelete = (prop) => (e) =>{

        let newTags = values.tags.filter((tag)=>{
            return tag !== prop;
        })

        newTags.length ? setValues({...values, tags:[...newTags]}) : setValues({...values, tags:[]});
    }

    /**
     * 登録ボタン制御
     */
    const handleRegister = (e) => {
        // ログインボタン押下時のエラー再チェック
        e.preventDefault();
        if(allCheckError() === true){
            return;
        }

        window.axios.post('/api/recruitment/create',{
            teamId:query.get("teamId"),
            title:values.title,
            desc:values.desc,
            tags:values.tags
        })
        .then(response=>{
            props.handleSetMessage(response.data,"success");
            window.location.href = `/team/?teamId=${query.get("teamId")}`;
        })
        .catch((e)=>{
            console.log(e.response)
            props.handleSetMessage(e.response.data,"error");
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
                    <CardContent >
                        <form onSubmit={handleRegister} style={formStyle}>
                            <TextField
                                label="募集タイトル"
                                name="title"
                                required
                                value={values.title}
                                error={values.error.title}
                                id="outlined-required-Email"
                                placeholder="4文字以上20文字以下"
                                helperText={values.error.title? "4文字以上20文字以下で入力してください":null}
                                sx={{width: '100%'}}
                                onChange={handleChange('title')}
                            />
                            <TextField
                                label="募集内容"
                                name="desc"
                                multiline
                                rows='10'
                                required
                                value={values.desc}
                                error={values.error.desc}
                                id="outlined-required-userName"
                                placeholder="1文字以上300文字以下"
                                helperText={
                                    values.error.desc
                                        ? `${values.length.desc}文字です。1文字以上300文字以下で入力してください。`
                                        : `${values.length.desc}文字`}
                                sx={{width: '100%'}}
                                onChange={handleChange('desc')}
                            />

                            <TextField
                                label="タグ"
                                name="tag"
                                value={values.tag}
                                error={values.error.tag}
                                id="outlined-required-userName"
                                placeholder="5つまでタグを追加することができます。"
                                helperText={
                                    values.error.tag
                                        ? `${values.length.tag}文字です。20文字以下で入力してください。`
                                        : `${values.length.tag}文字`}
                                sx={{width: '100%'}}
                                onChange={handleChange('tag')}
                            />
                            <Button
                                variant="contained"
                                onClick={handleTagRegister}
                                sx={{width:'100px', alignSelf:'start'}}
                                disabled ={ values.tags.length >= 5 || values.error.tag ? true : false }
                                >
                                タグ追加
                            </Button>

                            <Box sx={{display:'flex', flexWrap:'wrap', gap:0.5, alignSelf:'start'}}>
                                {values.tags.length ?
                                    values.tags.map((tag,index)=>{
                                        return(
                                                <Chip key={index} label={tag} onDelete={handleTagDelete(tag)}/>
                                            )
                                        })
                                    :null
                                }
                            </Box>

                            <Button
                                variant="contained"
                                type='submit'
                                endIcon={<PostAddIcon />}
                                disabled={
                                    values.error.title ||
                                    values.error.desc ? true : false
                                }
                            >
                                新規作成
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
    );
};

