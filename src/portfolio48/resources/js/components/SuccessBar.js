import { Fade,Alert,List,ListItem } from '@mui/material';

const styles={
    position: 'fixed',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex:1,
}

export default function SuccessBar(props){

    return (
        <nav>
            <Fade in={props.success.show} >
                <Alert
                    sx={styles}
                    onClose={() => { props.setSuccess({...props.success,show:false}) }}
                    severity="success"
                >
                    <List>
                    {
                        props.success.messages.map((message,index)=>{
                            return(
                                    <ListItem key={index}>{message}</ListItem>
                            );
                        })
                    }
                    </List>
                </Alert>
            </Fade>
        </nav>
    );
}
