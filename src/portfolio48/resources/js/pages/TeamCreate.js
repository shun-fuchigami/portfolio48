import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Card, CardHeader, CardContent, TextField, Container, } from '@mui/material';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
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

export default function TeamCreate(props) {

      const [nameValues,setNameValues] = useState({
        name:'',
        error:false,
      })

      const [descValues,setDescValues] = useState({
        desc:'',
        length:'',
        error:false,
      })

      const [areaValues,setAreaValues] = useState({
        area:'',
        length:'',
        error:false,
      })

    /**
     * チーム名入力フォームの制御
     * @param {*} event
     */
    const handleChangeNameValues = (event) => {
        let pattern = /^.{4,20}$/;
        if( !pattern.test(event.target.value) ){
            setNameValues({...nameValues, name: event.target.value, error: true });
        } else{
            setNameValues({...nameValues, name: event.target.value, error: false });
        }
    };

    /**
     * チームの説明文入力フォームの制御
     * @param {*} event
     */
    const handleChangeDescValues = (event) => {
        let length = event.target.value.length;

        if( length <= 300 ){
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
     * チームの活動エリア入力フォームの制御
     * @param {*} event
     */
    const handleChangeAreaValues = (event) => {
        let length = event.target.value.length;

        if( length < 1 ){
            setAreaValues({
                ...areaValues,
                area: event.target.value,
                length: length,
                error: true,});
        } else if (length <= 100 ){
            setAreaValues({
                ...areaValues,
                area: event.target.value,
                length: length,
                error: false,});
        } else {
            setAreaValues({
                ...areaValues,
                area: event.target.value,
                length: length,
                error: true,});
        }
    };

    /**
     * チーム名のエラーチェック関数
     * @returns エラーがある場合false
     */
     const checkErrorNameValues = () => {
        let pattern = /.{4,20}/;

        if( !pattern.test(nameValues.name) ){
            setNameValues({ ...nameValues, error: true });
            return false;
        } else {
            setNameValues({...nameValues, error: false });
            return true;
        }
    };

    /**
     * チーム説明のエラーチェック関数
     * @returns エラーがある場合false
     */
     const checkErrorDescValues = () => {
        let length = descValues.length;

        if( length <= 300 ){
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
    };


    /**
     * 活動エリアのエラーチェック関数
     * @returns エラーがある場合false
     */
     const checkErrorAreaValues = () => {
        let length = areaValues.length;

        if( length <= 1 ){
            setAreaValues({
                ...areaValues,
                error: true,});
            return false;
        } else if (length <= 100 ){
            setAreaValues({
                ...areaValues,
                error: false,});
            return true;
        } else {
            setAreaValues({
                ...areaValues,
                error: true,});
            return false;
        }
    };

    /**
     * 登録ボタン制御
     */
    function handleRegister(){
        // 登録ボタン押下時のエラー再チェック
        let checkName = checkErrorNameValues();
        let checkDesc = checkErrorDescValues();
        let checkArea = checkErrorAreaValues();

        if( !checkName || !checkDesc || !checkArea ){
            return;
        }

        window.axios.post('/api/team/create',{
            userId:props.authUser.id,
            name:nameValues.name,
            desc:descValues.desc,
            area:areaValues.area,
        })
        .then(response=>{
            console.log(response.data);
            props.handleSetStatus("success");
            window.location.href = `/account/team`;
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
            sx={{ p:4, width:'100%' , backgroundImage:`url(${bg})`,backgroundColor:'rgba(0, 0, 0, 0.5)',backgroundBlendMode:'color'}} >
                <Card square sx={style}>
                    <CardHeader
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ m:0 }}
                        title="チーム登録"
                    />
                    <CardContent sx={{ display:'flex', flexDirection:'column', alignItems:'left', justifyContent:'center', gap:'16px',}}>
                            <TextField
                                label="チーム名"
                                name="name"
                                required
                                value={nameValues.name}
                                error={nameValues.error}
                                id="outlined-required-Email"
                                placeholder="4文字以上20文字以下"
                                helperText={areaValues.error? "4文字以上20文字以下で入力してください":null}
                                sx={{width: '100%'}}
                                onChange={handleChangeNameValues}
                            />
                            <TextField
                                label="チーム紹介文"
                                name="desc"
                                multiline
                                rows='10'
                                value={descValues.desc}
                                error={descValues.error}
                                id="outlined-required-userName"
                                placeholder="300文字以下"
                                helperText={
                                    descValues.error
                                        ? `${descValues.length}文字です。300文字以下で入力してください。`
                                        : `${descValues.length}文字`}
                                sx={{width: '100%'}}
                                onChange={handleChangeDescValues}
                            />
                            <TextField
                                label="活動エリア"
                                name="area"
                                required
                                multiline
                                rows='3'
                                value={areaValues.area}
                                error={areaValues.error}
                                id="outlined-required-userName"
                                placeholder="100文字以下"
                                helperText={
                                    areaValues.error
                                        ? `${areaValues.length}文字です。100文字以下で入力してください。`
                                        : `${areaValues.length}文字`}
                                sx={{width: '100%'}}
                                onChange={handleChangeAreaValues}
                            />

                            <Button
                                variant="contained"
                                onClick={handleRegister}
                                endIcon={<SendIcon />}
                                disabled={
                                    nameValues.error ||
                                    descValues.error ||
                                    areaValues.error ? true : false}
                            >
                                新規登録
                            </Button>
                    </CardContent>
                </Card>
            </Container>
    );
};

