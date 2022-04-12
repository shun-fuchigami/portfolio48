import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

export default function FollowNavi(props) {

    return (
            <Grid
                container columns = {12}
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={ !props.inView&&{ position:'fixed', bottom: 50, right:0, left:0  }}
            >
                <Grid item >
                    <Link
                        underline='hover'
                        sx={{ display:'flex', alignItems:'center'}}
                        color='inherit'
                        href='/'>
                        <HomeIcon sx={{ mr: 0.5 }}  />
                        <Typography>Home</Typography>
                    </Link>
                </Grid>

                <Grid item>
                    <Link
                        underline='hover'
                        sx={{ display:'flex', alignItems:'center'}}
                        color='inherit'
                        href='/'
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
