import { Modal,Card,Typography,Button } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    minWidth: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export function ModalCommon(props){
    return(
        <Modal
            open={props.openModal}
            onClose={props.handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" >
                    {props.modalText}
                </Typography>
                <Card elevation={0} sx={{ display:'flex', mt:2, p:1, justifyContent:'space-evenly'}}>
                <Button size="small" color="primary" variant='contained' onClick={()=> props.handler(props.selected)} >
                    <Typography>
                        OK
                    </Typography>
                </Button>
                <Button size="small" color="primary" variant='contained' onClick={props.handleCloseModal} >
                    <Typography>
                        キャンセル
                    </Typography>
                </Button>
                </Card>
            </Card>
        </Modal>

    );
}
