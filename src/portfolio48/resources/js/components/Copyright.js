import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from "@mui/material";
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';

export default function Copyright(){
    return(
        <small>
            <Container sx={{textAlign:'center'}} >
                <Typography>
                    &copy; 2022 shun.fuchigami
                </Typography>
            </Container>
        </small>
    );
}
