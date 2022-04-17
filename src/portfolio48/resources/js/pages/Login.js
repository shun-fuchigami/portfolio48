import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Card, CardHeader, CardContent, TextField, Container } from '@mui/material';
import { FormControl, InputLabel, OutlinedInput, InputAdornment,Button, IconButton, MenuItem } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SendIcon from '@mui/icons-material/Send';
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

export default function Login(props) {


    const [emailValues, setEmailValues] = React.useState({
        email:'',
        error: false
      });

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        error: false,
    });


    /**
     * Email入力フォーム制御
     * @param {*} prop
     * @returns
     */
    const handleChangeEmail = (prop) => (event) => {
        let pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;

        if( !pattern.test(event.target.value) ){
            setEmailValues({[prop]: event.target.value, error:true,});
        }else{
            setEmailValues({[prop]: event.target.value, error:false });
        }
    };

    /**
     * パスワード入力フォーム制御
     * @param {*} prop
     * @returns
     */
    const handleChangePassword = (prop) => (event) => {
        if( event.target.value.length ){
            setValues({ ...values, [prop]: event.target.value, error:false });
        } else{
            setValues({ ...values, [prop]: event.target.value, error:true });
        }
    };

    /**
     * パスワード表示ボタン制御
     */
     const handleClickShowPassword = () => {
        setValues({
        ...values,
        showPassword: !values.showPassword,
        });
    };

    /**
     * パスワード表示ボタン制御
     * @param {*} event
     */
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    /**
     * Emailのエラーチェック関数
     * @returns エラーがある場合false
     */
    function checkErrorEmail(){
        let pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
        if( !pattern.test(emailValues.email) ){
            setEmailValues({ ...emailValues, error:true });
            return false;
        } else{
            setEmailValues({ ...emailValues, error:false });
            return true;
        }
    };

    /**
     * パスワードのエラーチェック関数
     * @returns エラーがある場合false
     */
    function checkErrorPassword(){
        if( !values.password.length ){
            setValues({ ...values, error:true });
            return false;
        } else{
            setValues({ ...values, error:false });
            return true;
        }
    };

    /**
     * ログイン制御
     * @returns
     */
    function handleLogin(){
        // ログインボタン押下時のエラー再チェック
        let checkEmail = checkErrorEmail();
        let checkPassword =  checkErrorPassword();
        if ( !checkEmail || !checkPassword ){
            return;
        }

        window.axios.get('/sanctum/csrf-cookie')
        .then(response => {
            console.log("トークン取得");
            console.log(response);
            window.axios.post('/api/login',{
                email:emailValues.email,
                password:values.password,
            })
            .then(response=>{
                console.log("ログイン完了");
                console.log(response.data);
                props.handleSetStatus("success");
                console.log(response.statusText);
                window.location.href = '/';
            })
            .catch((e)=>{
                console.log(e)
                props.handleSetStatus("error");
            })
        });
    }

    return (
        <Container maxWidth="false" disableGutters sx={{ p:4, width:'100%' ,height:'500px', backgroundImage:`url(${bg})`}} >
            <Container
                maxWidth="false"
                disableGutters
                sx={{p:4, position:'relative',top:'-32px',left:'-32px', width:'calc(100% + 64px)' ,height:'500px',backgroundColor:'rgba(0, 0, 0, 0.5)'}}
            >
                <Card square sx={style}>
                    <CardHeader title="ログイン" id="modal-modal-title" variant="h6" component="h2" sx={{ m:0 }} />
                    <CardContent sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'16px',}}>
                            <TextField
                                label="Email"
                                name="email"
                                required
                                error={emailValues.error}
                                id="outlined-required-Email"
                                placeholder="メールアドレス"
                                helperText={emailValues.error? "正しい形式で入力してください。":null}
                                value={emailValues.email}
                                sx={{width: '30ch'}}
                                onChange={handleChangeEmail('email')}
                            />

                            <TextField
                                label="パスワード"
                                name='password'
                                sx={{ width: '30ch' }}
                                error={values.error}
                                required
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChangePassword('password')}
                                placeholder="パスワードを入力してください"
                                helperText={values.error? "パスワードが未入力です。":null}
                                InputProps={{
                                    endAdornment:(
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                            </InputAdornment>
                                    )
                                }}
                            />
                            <Button
                                variant="contained"
                                onClick={handleLogin}
                                endIcon={<SendIcon />}
                                disabled={
                                    emailValues.error || values.error ? true : false
                                }
                            >
                                ログイン
                            </Button>
                    </CardContent>
                </Card>
            </Container>
        </Container>
    );
};

