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

    /**
     * Email入力制御
     */
    const [emailValues, setEmailValues] = React.useState({
        email:'',
        error: false
      });

    const handleChangeEmail = (prop) => (event) => {
        let pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;

        if( !pattern.test(event.target.value) ){
            setEmailValues({[prop]: event.target.value, error:true,});
        }else{
            setEmailValues({[prop]: event.target.value, error:false });
        }
    };

    function checkErrorEmail(){
        let pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
        if( !pattern.test(emailValues.email) ){
            setEmailValues({ ...emailValues, error:true });
            return true;
        } else{
            setEmailValues({ ...emailValues, error:false });
            return false
        }
    };

        /**
         * パスワード入力制御
         */
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        error: false,
    });

    const handleClickShowPassword = () => {
        setValues({
        ...values,
        showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChangePassword = (prop) => (event) => {
        let pattern = /^[a-zA-Z0-9!-/:-@¥[-`{-~]{6,12}$/;
        if( !pattern.test(event.target.value) ){
            setValues({ ...values, [prop]: event.target.value, error:true });
        } else{
            setValues({ ...values, [prop]: event.target.value, error:false });
        }
    };

    function checkErrorPassword(){
        let pattern = /^[a-zA-Z0-9!-/:-@¥[-`{-~]{6,12}$/;
        if( !pattern.test(values.password) ){
            setValues({ ...values, error : true });
            return true;
        } else{
            setValues({ ...values, error : false });
            return false;
        }
    };

    /**
     * ログイン制御
     * @returns
     */

    function handleLogin(){
        let checkEmail = checkErrorEmail()
        let checkPassword =  checkErrorPassword()
        if ( checkEmail || checkPassword ){
            return;
        } else {
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
                                placeholder="6文字以上12文字以下の半角英数字"
                                helperText={values.error? "6文字以上12文字以下の半角英数字で入力してください":null}
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
                                endIcon={<SendIcon />}>
                                ログイン
                            </Button>
                    </CardContent>
                </Card>
            </Container>
        </Container>
    );
};

