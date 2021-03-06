import React, { useEffect,useState } from 'react';
import { Card,CardHeader,CardMedia,Typography,Container,CardContent,Divider,CardActions,Button,Chip,Box } from '@mui/material';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { textNewLine } from '../util';


export function Home(){

    const [recruitments,setRecruitments] = useState([]);
    /**
     * メンバ募集のAPI取得
     */
         function getRecruitment(){
            axios.get(`/api/recruitment/index`)
                .then((response)=>{
                    console.log(response.data);
                    setRecruitments(response.data);
                })
                .catch( e =>{
                    console.log(e);
                })
        };

    useEffect(()=>{
        getRecruitment();
    },[])

    return (
        <section>
            <Card square sx={{ mt:0, position:'relative'}}>
                <CardHeader
                    title="FOOTBARで仲間を集おう"
                    titleTypographyProps={{ color:'white', fontWeight:'bold', variant:"h1", fontSize:{xs:"24px", sm:"32px", md:"48px",lg:"64px"} }}
                    sx={{position:'absolute' , top:100, pl:4}}
                    />
                <CardMedia
                    component="img"
                    height="500"
                    image='/imgs/hero-1.jpg'
                    alt="green iguana"
                    />
            </Card>

            <Container maxWidth="100%">
                <Typography
                    sx={{
                        mt:4,
                        ml:2,
                        mb:2,
                        display:'inline-block',
                        textAlign:'center',
                        color:"#002419",
                        fontSize:"24px",
                        borderBottom:"1px solid rgba(0,0,0,0.12)" }}
                    variant="h2"
                >
                    新着のメンバ募集
                </Typography>
                <Container
                    maxWidth='lg'
                    sx={{
                        mt:0,
                        p:5,
                        pb:6,
                        overflowX:'scroll',
                        border:"1px solid rgba(0,0,0,0.12)",
                        borderRadius:1,
                        display:'flex',
                        }}
                >
                    {
                        recruitments.length?
                            recruitments.map((recruitment,index)=>{
                                return(
                                    <Card
                                        elevation={4}
                                        key={index}
                                        raised
                                        sx={{
                                            display:'flex',
                                            flexDirection:'column',
                                            position:'relative',
                                            height:'450px',
                                            minWidth:'350px',
                                            ml:2,mr:2 }}
                                    >
                                        <FiberNewIcon fontSize='medium' sx={{display:'block', mt:1,ml:'15px', color:"#f44336"}}/>
                                        <CardHeader
                                            title={recruitment.title}
                                            titleTypographyProps={{pb:0}}
                                            subheader={`${recruitment.teams.name}`}
                                            subheaderTypographyProps={{variant:"caption"}}
                                            sx={{pt:1}}
                                            />
                                        <Divider variant="middle"/>
                                        <CardContent sx={{mt:1}}>
                                            {   recruitment.desc.length <= 55?
                                                    <Typography variant='caption' >
                                                        {textNewLine(recruitment.desc)}
                                                    </Typography>
                                                :
                                                    <div sx={{mb:2}}    >
                                                        <Typography variant='caption'>
                                                            {textNewLine(recruitment.desc.substr(0,55))}
                                                        </Typography>
                                                        <Typography variant='caption' sx={{color:'rgba(0,0,0,0.6)'}}>
                                                            {' ...(続きは詳細ページ)... '}
                                                        </Typography>
                                                    </div>
                                            }
                                        </CardContent>
                                        <CardContent sx={{mt:'auto'}}>
                                            <Box sx={{display:'flex', flexWrap:'wrap', gap:0.5, alignSelf:'start'}}>
                                                {recruitment.tags.length ?
                                                    recruitment.tags.map((tag,index)=>{
                                                        return(
                                                            <Chip size='small' key={index} label={tag.name} sx={{fontSize:'12px'}}/>
                                                            )
                                                        })
                                                        :null
                                                    }
                                            </Box>
                                        </CardContent>
                                        <CardActions
                                            sx={{pb:0, justifyContent:'center', ml:'auto',mr:'auto',mt:'auto',mb:1}}
                                        >
                                            <Button size="small" href={`/team/?teamId=${recruitment.teams.id}`}>
                                                <Typography variant='caption'>
                                                    チームの詳細確認
                                                </Typography>
                                            </Button>
                                            <Button size="small" sx={{mr:1}} href={`/recruitment?recruitmentId=${recruitment.id}`} >
                                                <Typography variant='caption'>
                                                    募集ページ確認
                                                </Typography>
                                            </Button>
                                        </CardActions>
                                    </Card>
                                )
                            })
                            :null
                    }
                </Container>
            </Container>
        </section>

    );
}


