import React from 'react';
import ReactDOM from 'react-dom';
import { Card,CardHeader,CardMedia,Typography } from '@mui/material';
import { fontSize } from '@mui/system';

export function Home(){
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
        </section>

    );
}


