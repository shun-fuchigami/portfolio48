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

    // email入力
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

    // ユーザ名入力
    const [userNameValues, setUserNameValues] = React.useState({
        name:'',
        error: false
    });

    const handleChangeUserName = (prop) => (event) => {
      let pattern = /^.{1,20}$/;

      if( !pattern.test(event.target.value )){
          setUserNameValues({[prop]: event.target.value, error:true,});
      }else{
          setUserNameValues({[prop]: event.target.value, error:false });
      }
    };

    // パスワード入力
    const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
    error: false,
  });


  const handleChangePassword = (prop) => (event) => {
    let pattern = /^[a-zA-Z0-9!-/:-@¥[-`{-~]{6,12}$/;

    if( !pattern.test(event.target.value) ){
        setValues({ ...values, [prop]: event.target.value, error:true });
    } else{
        setValues({ ...values, [prop]: event.target.value, error:false });

    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

    // 2回目パスワード入力
    const [confirmValues, setConfirmValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
    error: false,
  });

  const handleChangeConfirmPassword = (prop) => (event) => {
    if( !values.password == event.target.value ){
        setConfirmValues({ ...confirmValues, [prop]: event.target.value, error:true });
    } else {
        setConfirmValues({ ...confirmValues, [prop]: event.target.value, error:false });
    }
  };

  const handleClickShowConfirmPassword = () => {
    setConfirmValues({
      ...confirmValues,
      showPassword: !confirmValues.showPassword,
    });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };


  function handleRegister(){
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
      <Container maxWidth="false" disableGutters sx={{ p:4, width:'100%' ,height:'600px', backgroundImage:`url(${bg})`}} >
        <Container
            maxWidth="false"
            disableGutters
            sx={{p:4, position:'relative',top:'-32px',left:'-32px', width:'calc(100% + 64px)' ,height:'600px',backgroundColor:'rgba(0, 0, 0, 0.5)'}}
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
                        <Button variant="contained" onClick={handleRegister} endIcon={<SendIcon />}>
                            新規登録
                        </Button>
                </CardContent>
            </Card>
        </Container>
      </Container>
  );
};

