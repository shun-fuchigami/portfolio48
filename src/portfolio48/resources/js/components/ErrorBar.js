import { Fade,Alert,List,ListItem } from '@mui/material';

const styles={
    position: 'fixed',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex:1,
}

export default function ErrorBar(props){

    return (
        <nav>
            <Fade in={props.error.show} >
                <Alert
                    sx={styles}
                    onClose={() => { props.setError({...props.error,show:false}) }}
                    severity="error"
                >
                    <List>
                    {
                        props.error.messages.map((message,index)=>{
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
