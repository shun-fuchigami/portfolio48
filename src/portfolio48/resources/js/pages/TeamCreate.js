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


    // チーム情報
    const [teamValues, setTeamValues] = React.useState({
        name:'',
        nameError:false,
        desc:'',
        descLength:0,
        descError:false,
        area:'',
        areaError:false,
        areaLength:0,
      });


    /**
     * 各フォームの制御
     */
    const handleChangeTeamValuesName = (event) => {
        let pattern = /^.{4,20}$/;
        if( !pattern.test(event.target.value) ){
            setTeamValues({...teamValues, name: event.target.value, error: true });
        } else{
            setTeamValues({...teamValues, name: event.target.value, error: false });
        }
    };

    const handleChangeTeamValuesDesc = (event) => {
        let length = event.target.value.length;

        if( length < 300 ){
            setTeamValues({
                ...teamValues,
                desc: event.target.value,
                descLength: length,
                descError: false });
        } else {
            setTeamValues({
                ...teamValues,
                desc: event.target.value,
                descLength: length,
                descError: true });
        }
    };

    const handleChangeTeamValuesArea = (event) => {
        let length = event.target.value.length;

        if( length <= 1 ){
            setTeamValues({
                ...teamValues,
                area: event.target.value,
                areaLength: length,
                areaError: true,});
        } else if (length <= 100 ){
            setTeamValues({
                ...teamValues,
                area: event.target.value,
                areaLength: length,
                areaError: false,});
        } else {
            setTeamValues({
                ...teamValues,
                area: event.target.value,
                areaLength: length,
                areaError: true,});
        }
    };

    /**
     * 登録ボタン制御
     */
    function handleRegister(){
        window.axios.post('/api/team/create',{
            userId:props.authUser.id,
            name:teamValues.name,
            desc:teamValues.desc,
            area:teamValues.area,
        })
        .then(response=>{
            console.log(response.data);
            props.handleSetStatus("success");
            window.location.href = '/team';
        })
        .catch((e)=>{
            console.log(e)
            props.handleSetStatus("error");
        })
    }


    return (
        <Container maxWidth="false" disableGutters sx={{ p:4, width:'100%' ,height:'900px', backgroundImage:`url(${bg})`}} >

            <Container
                maxWidth="false"
                disableGutters
                sx={{p:4, position:'relative',top:'-32px',left:'-32px', width:'calc(100% + 64px)' ,height:'900px',backgroundColor:'rgba(0, 0, 0, 0.5)'}}
            >
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
                                value={teamValues.name}
                                error={teamValues.nameError}
                                id="outlined-required-Email"
                                placeholder="4文字以上20文字以下"
                                helperText={teamValues.nameError? "4文字以上20文字以下で入力してください":null}
                                sx={{width: '100%'}}
                                onChange={handleChangeTeamValuesName}
                            />
                            <TextField
                                label="チーム紹介文"
                                name="desc"
                                multiline
                                rows='10'
                                value={teamValues.desc}
                                error={teamValues.descError}
                                id="outlined-required-userName"
                                placeholder="300文字以下"
                                helperText={
                                    teamValues.descError
                                        ? `${teamValues.descLength}文字です。300文字以下で入力してください。`
                                        : `${teamValues.descLength}文字`}
                                sx={{width: '100%'}}
                                onChange={handleChangeTeamValuesDesc}
                            />
                            <TextField
                                label="活動エリア"
                                name="area"
                                required
                                multiline
                                rows='3'
                                value={teamValues.area}
                                error={teamValues.areaError}
                                id="outlined-required-userName"
                                placeholder="100文字以下"
                                helperText={
                                    teamValues.areaError
                                        ? `${teamValues.areaLength}文字です。100文字以下で入力してください。`
                                        : `${teamValues.areaLength}文字`}
                                sx={{width: '100%'}}
                                onChange={handleChangeTeamValuesArea}
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

