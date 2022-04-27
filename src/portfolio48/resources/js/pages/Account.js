import React, { useEffect, useState } from 'react';
import AccountRead from '../components/AccountRead';
import AccountUpdate from '../forms/AccountUpdate';
import { Container,Card,Avatar,Typography,CardHeader,CardContent,List,ListItem,ListItemText,CardActions,Button,Box,Chip } from '@mui/material';



export default function Account(props){

    const [updateFlag, setUpdateFlag] = useState(false);

    return(
            <Container maxWidth='md'>
                {
                    updateFlag ?
                        <AccountUpdate authUser={props.authUser} handleSetMessage={props.handleSetMessage} setUpdateFlag={setUpdateFlag} />
                        : <AccountRead authUser={props.authUser} handleSetMessage={props.handleSetMessage} setUpdateFlag={setUpdateFlag} />
                }
            </Container>
    );
}
