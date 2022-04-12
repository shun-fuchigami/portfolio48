import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { AppBar, Container } from '@mui/material';
import { Menu,MenuList,MenuItem } from '@mui/material';

export default function Footer(){

    return(
        <AppBar
            position="static"
            sx={{mt:1}}>
             <Container
                maxWidth='md'
                sx={{ display:'flex', flexWrap:'wrap', justifyContent : 'space-around'}}
            >
                <MenuList>
                    <MenuItem>Good Morning Good Morning</MenuItem>
                    <MenuItem>Good Morning Good Morning</MenuItem>
                    <MenuItem>Good Morning Good Morning</MenuItem>
                </MenuList>
                <MenuList>
                    <MenuItem>Good Morning Good Morning</MenuItem>
                    <MenuItem>Good Morning Good Morning</MenuItem>
                    <MenuItem>Good Morning Good Morning</MenuItem>
                </MenuList>
                <MenuList>
                    <MenuItem>Good Morning Good Morning</MenuItem>
                    <MenuItem>Good Morning Good Morning</MenuItem>
                    <MenuItem>Good Morning Good Morning</MenuItem>
                    <MenuItem>Good Morning Good Morning</MenuItem>
                </MenuList>
            </Container>
        </AppBar>


    );
}
