import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Container } from '@mui/material';
import BelongsTeam from '../components/BelongsTeam';
import OwnerTeam from '../components/OwnerTeam';


export default function AccountTeam(props){

    return(
        <Container maxWidth='md'>
            <OwnerTeam
                authUser={props.authUser}
                belongsTeam={props.belongsTeam}
                ownerTeam={props.ownerTeam}
                handleSetMessage={props.handleSetMessage}
                />
            <BelongsTeam
                authUser={props.authUser}
                belongsTeam={props.belongsTeam}
                ownerTeam={props.ownerTeam}
                handleSetMessage={props.handleSetMessage}
                />
        </Container>
    );
}
