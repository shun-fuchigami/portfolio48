import React, { useState } from 'react';
import AccountRead from '../components/AccountRead';
import AccountUpdate from '../forms/AccountUpdate';
import PasswordUpdate from '../forms/PasswordUpdate';
import { Container, } from '@mui/material';


export default function Account(props){

    const [updateType, setUpdateType] = useState(null);


    return(
        <Container maxWidth='md'>
            {
                !updateType ?
                    <AccountRead authUser={props.authUser} handleSetMessage={props.handleSetMessage} setUpdateType={setUpdateType} />
                    :updateType==="user" ?
                        <AccountUpdate authUser={props.authUser} handleSetMessage={props.handleSetMessage} setUpdateType={setUpdateType} />
                        :<PasswordUpdate authUser={props.authUser} handleSetMessage={props.handleSetMessage} setUpdateType={setUpdateType} />
            }
        </Container>
    );
}
