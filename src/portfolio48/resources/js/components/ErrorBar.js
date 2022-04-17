import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Collapse,Alert } from '@mui/material';
import { getThemeProps } from '@mui/system';

export default function ErrorBar(props){

    return (
        <nav>

        <Collapse in={props.status.error} >
            <Alert
                sx={{
                    position: 'fixed',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex:1,
                }}
                onClose={() => {props.setInitStatus()}}
                severity="error"
            >
                {props.message.error}
            </Alert>
        </Collapse>

        <Collapse in={props.status.warning} >
            <Alert
                sx={{
                    position: 'fixed',
                    top: '80px',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex:1,
                }}
                onClose={() => {props.setInitStatus()}}
                severity="warning"
            >
                {props.message.warning}
            </Alert>
        </Collapse>

        <Collapse in={props.status.info} >
            <Alert
                sx={{
                    position: 'fixed',
                    top: '80px',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex:1,
                }}
                onClose={() => {props.setInitStatus()}}
                severity="info"
            >
                {props.message.info}
            </Alert>
        </Collapse>

        <Collapse in={props.status.success} >
            <Alert
                sx={{
                    position: 'fixed',
                    top: '80px',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex:1,
                }}
                onClose={() => {props.setInitStatus()}}
                severity="success"
            >
                {props.message.success}
            </Alert>
        </Collapse>
        </nav>
    );
}
