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

/**
 * 未ログイン時にはログイン導線を案内するモーダル
 * @param {*} props
 * @returns
 */
export function ModalAuthenticated(props){
    return(
        <Modal
            open={props.openModalAuth}
            onClose={props.handleCloseModalAuth}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
    {
        props.authUser.isLogin?
            <Card sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" >
                    {props.modalText}
                </Typography>
                <Card elevation={0} sx={{ display:'flex', mt:2, p:1, justifyContent:'space-evenly'}}>
                    <Button size="small" color="primary" variant='contained' onClick={()=>props.handler(props.selected)} >
                        <Typography>
                            OK
                        </Typography>
                    </Button>
                    <Button size="small" color="primary" variant='contained' onClick={props.handleCloseModalAuth} >
                        <Typography>
                            キャンセル
                        </Typography>
                    </Button>
                </Card>
            </Card>
        :
            <Card sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{pb:2}}>
                    ログインが必要です。
                </Typography>
                <Typography id="modal-modal-p-1" variant="caption" component="p">
                    アカウントをお持ちの方はログインページよりログインしてください。
                </Typography>
                <Typography id="modal-modal-p-2" variant="caption" component="p">
                    アカウントをお持ちでない方は新規ユーザ登録ページより登録してください。
                </Typography>
                <Card elevation={0} sx={{ display:'flex', mt:2, p:1, justifyContent:'space-evenly'}}>
                    <Button size="small" color="primary" variant='text' href="/login">
                        <Typography>
                            ログインへ
                        </Typography>
                    </Button>
                    <Button size="small" color="primary" variant='text' href="/register" >
                        <Typography>
                            新規ユーザ登録へ
                        </Typography>
                    </Button>
                </Card>
            </Card>
    }
    </Modal>

    );
}
