import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Card, CardHeader, CardContent, TextField, Container } from '@mui/material';
import { InputAdornment,Button, IconButton,  } from '@mui/material';
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

export default function Register(props) {

    const [emailValues, setEmailValues] = React.useState({
        email:'',
        error: false
      });
    const [userNameValues, setUserNameValues] = React.useState({
        name:'',
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
    const [confirmValues, setConfirmValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        error: false,
    });


    /**
     * Email入力フォームの制御
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
     * ユーザ名登録フォームの制御
     * @param {*} prop
     * @returns
     */
    const handleChangeUserName = (prop) => (event) => {
      let pattern = /^.{1,20}$/;

      if( !pattern.test(event.target.value )){
          setUserNameValues({[prop]: event.target.value, error:true,});
      }else{
          setUserNameValues({[prop]: event.target.value, error:false });
      }
    };

    /**
     * パスワード入力フォームの制御
     * @param {*} prop
     * @returns
     */
    const handleChangePassword = (prop) => (event) => {
        let pattern = /^[a-zA-Z0-9!-/:-@¥[-`{-~]{6,12}$/;
        if( !pattern.test(event.target.value) ){
            setValues({ ...values, [prop]: event.target.value, error:true });
        } else{
            setValues({ ...values, [prop]: event.target.value, error:false });
        }
        checkErrorTargetConfirmPassword(event.target.value);
    };

    /**
     * 確認用パスワード入力フォームの制御
     * @param {*} prop
     * @returns
     */
    const handleChangeConfirmPassword = (prop) => (event) => {
        if( values.password !== event.target.value ){
            setConfirmValues({ ...confirmValues, [prop]: event.target.value, error:true });
        } else {
            setConfirmValues({ ...confirmValues, [prop]: event.target.value, error:false });
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
     * 確認用パスワード表示ボタン制御
     */
    const handleClickShowConfirmPassword = () => {
        setConfirmValues({
        ...confirmValues,
        showPassword: !confirmValues.showPassword,
        });
    };

    /**
     * 確認用パスワード表示ボタン制御
     * @param {*} event
     */
    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    /**
     * Emailのエラーチェック関数
     * @returns エラーの場合false
     */
     const checkErrorEmail = () => {
        let pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;

        if( !pattern.test(emailValues.email) ){
            setEmailValues({...emailValues, error:true,});
            return false
        }else{
            setEmailValues({...emailValues, error:false,});
            return true
        }
    };

    /**
     * ユーザ名のエラーチェック関数
     * @returns エラーの場合false
     */
    const checkErrorUserName = () => {
        let pattern = /^.{1,20}$/;

        if( !pattern.test(userNameValues.name )){
            setUserNameValues({...userNameValues, error:true,});
            return false
        }else{
            setUserNameValues({...userNameValues, error:false,});
            return true
        }
      };

    /**
     * パスワードのエラーチェック関数
     * @returns  エラーの場合false
     */
     const checkErrorPassword = () => {
        let pattern = /^[a-zA-Z0-9!-/:-@¥[-`{-~]{6,12}$/;

        if( !pattern.test(values.password) ){
            setValues({ ...values, error:true });
            return false;
        } else{
            setValues({ ...values, error:false });
            return true;
        }
    };

    /**
     * 確認用パスワードのエラーチェック
     * @param {*} prop
     * @returns  エラーの場合false
     */
    const checkErrorConfirmPassword = () => {
        if( values.password !== confirmValues.password ){
            setConfirmValues({ ...confirmValues, error:true });
            return false;
        } else {
            setConfirmValues({ ...confirmValues, error:false });
            return true;
        }
    };

    /**
     * 確認用パスワードのパスワード入力時エラーチェック
     * @param {*} taget
     * @returns  エラーの場合false
     */
    const checkErrorTargetConfirmPassword = (target) => {
        if( target !== confirmValues.password ){
            setConfirmValues({ ...confirmValues, error:true });
        } else {
            setConfirmValues({ ...confirmValues, error:false });
        }
    };

    /**
     * 登録ボタン制御
     */
    function handleRegister(){
        let checkEmail = checkErrorEmail();
        let checkUserName = checkErrorUserName();
        let checkPassword = checkErrorPassword();
        let checkConfirmPassword = checkErrorConfirmPassword();
        if( !checkEmail || !checkUserName  || !checkPassword  || !checkConfirmPassword ){
            return;
        }

        window.axios.post('/api/register',{
            email:emailValues.email,
            name:userNameValues.name,
            password:values.password,
        })
        .then(response=>{
            console.log(response.data);
            props.handleSetStatus("success");
            window.location.href = '/login';
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
            sx={{ p:4, width:'100%' , backgroundImage:`url(${bg})`,backgroundColor:'rgba(0, 0, 0, 0.5)',backgroundBlendMode:'color'}}
        >
            <Card square sx={style}>
                <CardHeader title="ユーザ登録" id="modal-modal-title" variant="h6" component="h2" sx={{ m:0 }} />
                <CardContent sx={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'16px',}}>
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
                        label="ユーザ名"
                        name="name"
                        required
                        value={userNameValues.name}
                        error={userNameValues.error}
                        id="outlined-required-userName"
                        placeholder="20文字以下"
                        helperText={userNameValues.error? "20文字以下で入力してください。":null}
                        sx={{width: '30ch'}}
                        onChange={handleChangeUserName('name')}
                    />

                    <TextField
                        label="パスワード"
                        name='password'
                        required
                        sx={{ width: '30ch' }}
                        error={values.error}
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

                    <TextField
                        label="パスワードの再確認"
                        name='password_confirmation'
                        required
                        sx={{ width: '30ch' }}
                        error={confirmValues.error}
                        type={confirmValues.showPassword ? 'text' : 'password'}
                        value={confirmValues.password}
                        onChange={handleChangeConfirmPassword('password')}
                        placeholder="再度パスワードを入力してください"
                        helperText={confirmValues.error? "パスワードが異なります。":null}
                        InputProps={{
                            endAdornment:(
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownConfirmPassword}
                                    edge="end"
                                    >
                                    {confirmValues.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    </InputAdornment>
                            )
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleRegister}
                        endIcon={<SendIcon />}
                        disabled={
                            emailValues.error ||
                            userNameValues.error ||
                            values.error ||
                            confirmValues.error ? true : false
                        }
                    >
                        新規登録
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

