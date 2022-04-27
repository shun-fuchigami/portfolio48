import * as React from 'react';
import { Container,Button,Fade } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const styles = {bgcolor:'rgba(255,255,255,0.7)'};
const buttons = [
    {title:"トップページ",  href:"/", onClick:null, icon:<HomeIcon />},
    {title:"上へ戻る",  href:null,
        onClick:(e)=>{ e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }, icon:<ArrowCircleUpIcon />},
]

const followStyle = {
    display:'flex',
    position:'relative',
    justifyContent:'center',
    alignItems:'center',
    mt:2,
    gap:2,
    p:0,
    width:'max-content'
}

const fixedStyle ={
    display:'flex',
    position:'fixed',
    justifyContent:'center',
    alignItems:'center',
    bottom: 50,
    right:0,
    left:0,
    gap:2,
    p:0,
    width:'max-content'
}

export default function FooterNavi(props) {

    return (

        <nav>
            <Fade in={ props.inView } >
                <Container sx={ followStyle }>
                    {
                        buttons.map((button,index)=>{
                            return(
                                <Button
                                    key={index}
                                    variant='text'
                                    href={button.href}
                                    startIcon={button.icon}
                                    sx={styles}
                                    onClick={button.onClick}
                                    >
                                    {button.title}
                                </Button>
                            );
                        })
                    }
                </Container>
            </Fade>

            <Fade in={ !props.inView } >
                <Container sx={ fixedStyle }>
                    {
                        buttons.map((button,index)=>{
                            return(
                                <Button
                                    key={index}
                                    variant='text'
                                    href={button.href}
                                    startIcon={button.icon}
                                    sx={styles}
                                    onClick={button.onClick}
                                    >
                                    {button.title}
                                </Button>
                            );
                        })
                    }
                </Container>
            </Fade>
        </nav>

    );
}
