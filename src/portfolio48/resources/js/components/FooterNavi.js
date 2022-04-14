import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

export default function FooterNavi(props) {

    const style ={
        display:'flex',
        alignItems:'center',
        p:.5,
        pr:1 ,
        borderRadius:'4px' ,
        bgcolor:'rgba(255,255,255,0.7)'

    }

    return (
            <Grid
                container columns = {12}
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={ !props.inView ?
                     { position:'fixed', bottom: 50, right:0, left:0,  }
                     :{ position:'relative', mt:2  }}
            >
                <Grid item >
                    <Link
                        underline='hover'
                        sx={style}
                        color='inherit'
                        href='/'>
                        <HomeIcon sx={{ mr: 0.5 }}  />
                        <Typography>Home</Typography>
                    </Link>
                </Grid>

                <Grid item>
                    <Link
                        underline='hover'
                        sx={style}
                        color='inherit'
                        onClick={(e)=>{
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}>
                        <ArrowCircleUpIcon sx={{ mr: 0.5 }} />
                        <Typography>上へ戻る</Typography>
                    </Link>
                </Grid>
            </Grid>
    );
}
