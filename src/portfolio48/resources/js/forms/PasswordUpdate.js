import React, { useEffect, useState } from 'react';
import {Card,CardHeader,CardContent,TextField,CardActions,InputAdornment,Button,IconButton,Typography} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import UpdateIcon from '@mui/icons-material/Update';
import CancelIcon from '@mui/icons-material/Cancel';

/**
 * フォームスタイル
 */
 const formStyle = {
    display:'flex',
    flexDirection:'column',
    alignItems:'start',
    justifyContent:'center',
    gap:'16px',
}

/**
 * チェック対象
 */
let checkList = [
    'prevPassword',
    'password',
    'confirmPassword',
]


export default function PasswordUpdate(props){

    const [values, setValues] = useState({
        prevPassword:"",
        password:"",
        confirmPassword:"",
        error:{
            prevPassword:false,
            password:false,
            confirmPassword:false,
        },
        length:{
            prevPassword:0,
            password:0,
            confirmPassword:0,
        },
        pattern:{
            prevPassword:/^.{1,}$/,
            password:/^[a-zA-Z0-9!-/:-@¥[-`{-~]{6,12}$/,
            confirmPassword:null,
        },
        show:{
            prevPassword:false,
            password:false,
            confirmPassword:false,
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

        setValue = {...values, [prop]: event.target.value};
        setValues(setValue);

        if(prop === 'password'){
            checkError(prop,checkError('confirmPassword',setValue),checkValue);
        }else{
            checkError(prop,setValue,checkValue);
        }
    };

    /**
     * エラーチェック
     * @param {*} prop チェック対象
     * @param {*} prevValue チェック対象外のstate
     * @param {*} checkValue チェック対象の値
     */
    function checkError(prop, prevValue=values, checkValue=values[prop]){
        let setValue;

        if(prop==='confirmPassword'){

            if( checkValue !== prevValue.password ){
                setValues({ ...prevValue, error:{...prevValue.error, [prop]:true} });
                setValue = { ...prevValue, error:{...prevValue.error, [prop]:true} }
            } else {
                setValues({ ...prevValue, error:{...prevValue.error, [prop]:false} });
                setValue = { ...prevValue, error:{...prevValue.error, [prop]:false} }
            }

        }else{

            if( !values.pattern[prop].test(checkValue) ){
                setValues({ ...prevValue, error:{...prevValue.error, [prop]:true} });
                setValue = { ...prevValue, error:{...prevValue.error, [prop]:true} }
            } else {
                setValues({ ...prevValue, error:{...prevValue.error, [prop]:false} });
                setValue = { ...prevValue, error:{...prevValue.error, [prop]:false} }
            }
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
     * 登録ボタン制御
     */
    const handleRegister = (e) => {

        e.preventDefault();
        if(allCheckError() === true){
            return;
        }

        window.axios.post('/api/user/password/update',{
            id:props.authUser.id,
            prevPassword:values.prevPassword,
            password:values.password,
            password_confirmation:values.confirmPassword,
        })
        .then(response=>{
            props.handleSetMessage(response.data,"success");
            props.setUpdateType(null)
        })
        .catch((e)=>{
            console.log(e.response);
            props.handleSetMessage(e.response.data,"error");
        })
    }


    return(
            <Card elevation={0} sx={{mt:5}}>
                <CardHeader title={`${props.authUser.name}のアカウントページ`}  />
                <Card sx={{p:2,m:2}} variant="outlined" >
                    <CardContent >
                        <form onSubmit={handleRegister} style={formStyle}>

                            <TextField
                                label="変更前パスワード"
                                name='prevPassword'
                                required
                                sx={{ width: '28ch' }}
                                error={values.error.prevPassword}
                                type={values.show.prevPassword ? 'text' : 'password'}
                                value={values.prevPassword}
                                onChange={handleChange('prevPassword')}
                                placeholder="変更前のパスワードを入力してください。"
                                helperText={values.error.prevPassword? "変更前のパスワードを入力してください。":null}
                                InputProps={{
                                    endAdornment:(
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle prevPassword visibility"
                                            onClick={handleClickShow('prevPassword')}
                                            onMouseDown={handleMouseDown}
                                            edge="end"
                                            >
                                            {values.show.prevPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                            </InputAdornment>
                                    )
                                }}
                            />

                            <TextField
                                label="変更後パスワード"
                                name='password'
                                required
                                sx={{ width: '28ch' }}
                                error={values.error.password}
                                type={values.show.password ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                placeholder="6文字以上12文字以下の半角英数字"
                                helperText={values.error.password? "6文字以上12文字以下の半角英数字で入力してください":null}
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

                            <TextField
                                label="パスワードの再確認"
                                name='password_confirmation'
                                required
                                sx={{ width: '28ch' }}
                                error={values.error.confirmPassword}
                                type={values.show.confirmPassword ? 'text' : 'password'}
                                value={values.confirmPassword}
                                onChange={handleChange('confirmPassword')}
                                placeholder="再度パスワードを入力してください"
                                helperText={values.error.confirmPassword? "パスワードが異なります。":null}
                                InputProps={{
                                    endAdornment:(
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShow('confirmPassword')}
                                            onMouseDown={handleMouseDown}
                                            edge="end"
                                            >
                                            {values.show.confirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                            </InputAdornment>
                                    )
                                }}
                            />

                            <CardActions sx={{pb:0, alignSelf:'end'}}>
                                <Button
                                    variant="contained"
                                    type='submit'
                                    endIcon={<UpdateIcon />}
                                    disabled={
                                        values.error.prevPassword ||
                                        values.error.password ||
                                        values.error.confirmPassword ? true : false
                                    }
                                >
                                    <Typography variant='caption'>
                                        変更
                                    </Typography>
                                </Button>
                                <Button
                                    variant='outlined'
                                    sx={{ml:1}}
                                    onClick={()=>{props.setUpdateType(null)}}
                                    endIcon={<CancelIcon />}
                                >
                                    <Typography variant='caption'>
                                        キャンセル
                                    </Typography>
                                </Button>
                            </CardActions>
                        </form>
                    </CardContent>
                </Card>
            </Card>
    );
}
