import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, TextField, Container } from '@mui/material';
import { InputAdornment,Button, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import bg from '../../../public/imgs/background-1.jpg';

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
    'email',
    'password'
]

export default function Login(props) {

    const [values, setValues] = useState({
        email: "",
        password:"",
        error:{
            email:false,
            password:false,
        },
        pattern:{
            email:/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
            password:/^.{1,}$/,
        },
        show:{
            password:false,
        },
    })

    /**
     * フォームのハンドル
     * @param {*} prop 変更対象
     * @returns
     */
    const handleChange = (prop) => (event) => {
        let setValue = {...values, [prop]: event.target.value};
        let checkValue = event.target.value;
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

        if( !values.pattern[prop].test(checkValue) ){
            setValues({ ...prevValue, error:{...prevValue.error, [prop]:true} });
            return { ...prevValue, error:{...prevValue.error, [prop]:true} }
        } else {
            setValues({ ...prevValue, error:{...prevValue.error, [prop]:false} });
            return { ...prevValue, error:{...prevValue.error, [prop]:false} }
        }
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
     * パスワード表示ボタン制御
     */
     const handleClickShow = (prop) =>(event) => {
        setValues({
        ...values,
        show:{...values.show, [prop]:!values.show[prop]}
        });
    };

    /**
     * パスワード表示ボタン制御
     * @param {*} event
     */
    const handleMouseDown = (event) => {
        event.preventDefault();
    };

    /**
     * ログイン制御
     * @returns
     */
    const handleLogin = (e) => {
        // ログインボタン押下時のエラー再チェック
        e.preventDefault();
        if(allCheckError() === true){
            return;
        }

        window.axios.get('/sanctum/csrf-cookie')
        .then(response => {
            console.log("トークンを取得しました");
            window.axios.post('/api/login',{
                email:values.email,
                password:values.password,
            })
            .then(response=>{
                props.handleSetMessage(response.data,"success");
                window.location.href = '/';
            })
            .catch((e)=>{
                console.log(e.response)
                props.handleSetMessage(e.response.data,"error");
            })
        });
    }


    return (
        <Container
            maxWidth="false"
            disableGutters
            sx={{ p:4, width:'100%' , backgroundImage:`url(${bg})`,backgroundColor:'rgba(0, 0, 0, 0.5)',backgroundBlendMode:'color'}}
        >
            <Card square sx={style}>
                <CardHeader title="ログイン" id="modal-modal-title" variant="h6" component="h2" sx={{ m:0 }} />
                <CardContent >
                    <form onSubmit={handleLogin} style = {formStyle}>
                        <TextField
                            label="Email"
                            name="email"
                            required
                            error={values.error.email}
                            placeholder="Email"
                            helperText={ values.error.email ? "正しい形式で入力してください。" : null }
                            value={values.email}
                            sx={{width: '28ch'}}
                            onChange={handleChange('email')}
                        />

                        <TextField
                            label="パスワード"
                            name='password'
                            sx={{ width: '28ch' }}
                            error={values.error.password}
                            required
                            type={values.show.password ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            placeholder="パスワードを入力してください"
                            helperText={ values.error.password ? "パスワードが未入力です。": null }
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShow('password')}
                                        onMouseDown={handleMouseDown}
                                        edge="end"
                                        >
                                        {values.show.password ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                        </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            variant="contained"
                            type='submit'
                            endIcon={<LoginIcon />}
                            disabled={ values.error.email || values.error.password ? true : false }
                        >
                            ログイン
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

