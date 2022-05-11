import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Card, CardHeader, CardContent, TextField, Container, } from '@mui/material';
import { Button } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import bg from '../../../public/imgs/background-2.jpg';

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
    'name',
    'desc',
    'area',
]

export default function TeamCreate(props) {

    const [values,setValues] = useState({
        name:"",
        desc:"",
        area:"",
        length:{
            desc:0,
            area:0,
        },
        error:{
            name:false,
            desc:false,
            area:false,
        },
        pattern:{
            name:/^.{4,20}$/,
            desc:/^[\s-\S]{1,300}$/,
            area:/^.{1,100}$/,
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

        if(prop==='desc' || prop==='area'){
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
     * 登録ボタン制御
     */
    const handleRegister = (e) => {
        // ログインボタン押下時のエラー再チェック
        e.preventDefault();
        if(allCheckError() === true){
            return;
        }

        window.axios.post('/api/team/create',{
            userId:props.authUser.id,
            name:values.name,
            desc:values.desc,
            area:values.area,
        })
        .then(response=>{
            props.handleSetMessage(response.data,"success");
            window.location.href = `/account/team`;
        })
        .catch((e)=>{
            props.handleSetMessage(e.response.data,"success");
            console.log(e.response)
        })
    }


    return (
        <Container
            maxWidth="false"
            disableGutters
            sx={{ p:4, width:'100%' , backgroundImage:`url(${bg})`,backgroundColor:'rgba(0, 0, 0, 0.5)',backgroundBlendMode:'color'}} >
                <Card square sx={style}>
                    <CardHeader
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ m:0 }}
                        title="チーム登録"
                    />
                    <CardContent>
                        <form onSubmit={handleRegister} style={formStyle}>
                            <TextField
                                label="チーム名"
                                name="name"
                                required
                                value={values.name}
                                error={values.error.name}
                                id="outlined-required-Email"
                                placeholder="4文字以上20文字以下"
                                helperText={values.error.name ? "4文字以上20文字以下で入力してください":null}
                                sx={{width: '100%'}}
                                onChange={handleChange('name')}
                            />
                            <TextField
                                label="チーム紹介文"
                                name="desc"
                                multiline
                                rows='10'
                                value={values.desc}
                                error={values.error.desc}
                                id="outlined-required-userName"
                                placeholder="300文字以下"
                                helperText={
                                    values.error
                                        ? `${values.length.desc}文字です。300文字以下で入力してください。`
                                        : `${values.length.desc}文字`}
                                sx={{width: '100%'}}
                                onChange={handleChange('desc')}
                            />
                            <TextField
                                label="活動エリア"
                                name="area"
                                required
                                multiline
                                rows='3'
                                value={values.area}
                                error={values.error.area}
                                id="outlined-required-userName"
                                placeholder="100文字以下"
                                helperText={
                                    values.error.area
                                        ? `${values.length.area}文字です。100文字以下で入力してください。`
                                        : `${values.length.area}文字`}
                                sx={{width: '100%'}}
                                onChange={handleChange('area')}
                            />

                            <Button
                                variant="contained"
                                type='submit'
                                endIcon={<GroupAddIcon />}
                                disabled={
                                    values.error.name ||
                                    values.error.area ||
                                    values.error.desc ? true : false}
                            >
                                新規登録
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
    );
};

