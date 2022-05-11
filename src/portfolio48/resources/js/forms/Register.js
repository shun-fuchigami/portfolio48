import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {Card,CardHeader,CardContent,TextField,Container,OutlinedInput,InputLabel,MenuItem,FormControl,Select,Chip,InputAdornment,Button,IconButton,Box,} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import bg from '../../../public/imgs/background-1.jpg';
import { POSITIONS } from '../const';

/**
 * ユーザ登録カードスタイル
 */
const style = {
  maxWidth:'sm',
  minWidth:'200px',
  m:'0 auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

/**
 * フォームスタイル
 */
const formStyle = {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    gap:'16px',
}

/**
 * ポジション選択メニューのスタイル
 */
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '30ch',
    },
  },
};


/**
 * チェック対象
 */
let checkList = [
    'name',
    'email',
    'intro',
    // 'position', *ポジションはエラーチェック不要
    'password',
    'confirmPassword',
]

/**
 * 選択済みのメニューアイテムの装飾変更
 * @param {*} position
 * @param {*} positions
 * @param {*} theme
 * @returns
 */
function getStyles(position, positions, theme) {
    return {
      fontWeight:
        positions.indexOf(position) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

export default function Register(props) {
    const theme = useTheme();
    const [values, setValues] = useState({
        name:"",
        email: "",
        intro: "",
        positions: ["未選択"],
        password:"",
        confirmPassword:"",
        error:{
            name:false,
            email:false,
            intro:false,
            positions:false,
            password:false,
            confirmPassword:false,
        },
        length:{
            name:0,
            email:0,
            intro:0,
            positions:0,
            password:0,
            confirmPassword:0,
        },
        pattern:{
            name:/^.{1,20}$/,
            email:/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
            positions:null,
            intro:/^[\s-\S]{1,100}$/,
            password:/^[a-zA-Z0-9!-/:-@¥[-`{-~]{6,12}$/,
            confirmPassword:null,
        },
        show:{
            name:null,
            email:null,
            intro:null,
            positions:null,
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

        if(prop === 'positions'){
            setValue = {
                ...values,
                [prop]: event.target.value.length ? event.target.value.filter( value => value!=="未選択") : ["未選択"]};
        }else if(prop==='intro'){
            setValue = {...values, [prop]: event.target.value, length:{...values.length,[prop]:event.target.value.length}};
        }else{
            setValue = {...values, [prop]: event.target.value};
        }

        setValues(setValue);

        if(prop === 'positions'){
            return;

        }else if(prop === 'password'){
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

        window.axios.post('/api/register',{
            email:values.email,
            name:values.name,
            intro:values.intro,
            positions:values.positions,
            password:values.password,
            password_confirmation:values.confirmPassword,
        })
        .then(response=>{
            props.handleSetMessage(response.data,"success");
            window.location.href = '/login';
        })
        .catch((e)=>{
            console.log(e.response);
            props.handleSetMessage(e.response.data,"error");
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
                <CardContent >
                    <form onSubmit={handleRegister} style={formStyle}>
                        <TextField
                            id="outlined-required-Email"
                            label="Email"
                            name="email"
                            required
                            error={values.error.email}
                            placeholder="メールアドレス"
                            helperText={values.error.email? "正しい形式で入力してください。":null}
                            value={values.email}
                            sx={{width: '28ch'}}
                            onChange={handleChange('email')}
                        />
                        <TextField
                            id="outlined-required-userName"
                            label="ユーザ名"
                            name="name"
                            required
                            value={values.name}
                            error={values.error.name}
                            placeholder="20文字以下"
                            helperText={values.error.name? "20文字以下で入力してください。":null}
                            sx={{width: '28ch'}}
                            onChange={handleChange('name')}
                        />
                        <TextField
                            id="outlined-required-intro"
                            label="自己紹介"
                            name="intro"
                            required
                            multiline
                            rows={5}
                            value={values.intro}
                            error={values.error.intro}
                            placeholder="100文字以下で入力してください。応募時の自己紹介として利用されます。"
                            helperText={
                                values.error.intro?
                                    `${values.length.intro}文字です。100文字以下で入力してください。`
                                    :`${values.length.intro}文字です。`}
                            sx={{width: '28ch'}}
                            onChange={handleChange('intro')}
                        />

                        <FormControl sx={{ width: '28ch' }}>
                            <InputLabel id="multiple-chip-label">ポジション</InputLabel>
                            <Select
                                labelId="multiple-chip-label"
                                id="multiple-chip"
                                multiple
                                name="positions"
                                value={values.positions}
                                onChange={handleChange('positions')}
                                input={<OutlinedInput id="select-multiple-chip" label="ポジション" />}
                                renderValue={
                                    (selected) => (
                                        selected.length?
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                        :
                                        <Box>
                                            <Chip label="未選択"/>
                                        </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                            {POSITIONS.map((position) => (
                                <MenuItem
                                key={position}
                                value={position}
                                style={getStyles(position, values.positions, theme)}
                                >
                                {position}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="パスワード"
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

                        <Button
                            variant="contained"
                            type='submit'
                            endIcon={<PersonAddAltIcon />}
                            disabled={
                                values.error.name ||
                                values.error.email ||
                                values.error.intro ||
                                values.error.password ||
                                values.error.confirmPassword ? true : false
                            }
                        >
                            新規登録
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

