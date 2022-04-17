import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Container,Button } from '@mui/material';
import { Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

export default function FooterNavi(props) {

    return (
            <Container
            sx={ !props.inView ?
                {   display:'flex',
                    position:'fixed',
                    justifyContent:'center',
                    alignItems:'center',
                    bottom: 50,
                    right:0,
                    left:0,
                    gap:2,
                    p:0,
                    width:'max-content'}
                :
                {   display:'flex',
                    position:'relative',
                    justifyContent:'center',
                    alignItems:'center',
                    mt:2,
                    gap:2,
                    p:0,
                    width:'max-content'}
                }
            >
                    <Button variant="text" href="/" startIcon={<HomeIcon />} sx={{bgcolor:'rgba(255,255,255,0.7)'}}>
                        トップページ
                    </Button>
                    <Button
                        variant="text"
                        startIcon={<ArrowCircleUpIcon />}
                        sx={{bgcolor:'rgba(255,255,255,0.7)'}}
                        onClick={(e)=>{
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>
                        上へ戻る
                    </Button>
            </Container>
    );
}
