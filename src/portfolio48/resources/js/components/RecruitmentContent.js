import { Box,Card,Typography,CardActions,Button,CardContent,List,ListItem,ListItemText,Chip } from '@mui/material';
import { textNewLine } from '../util';

export function RecruitmentContent(props){

    const buttons = [
        {title:'チームの詳細確認', href:'/team/?teamId=', teams:true, handle:null },
        {title:'募集ページ確認',href:'/recruitment?recruitmentId=', teams:true, handle:null },
        {title:'募集へ応募', href:null, teams:false, handle: (prop) => props.handleOpenModalAuth(prop) },
    ]

    const listItems = [
        {title:"チーム名", content:'name', teams:true, newLine:false, box:false},
        {title:"活動エリア", content:'area', teams:true, newLine:true, box:false},
        {title:"募集タイトル", content:'title', teams:false, newLine:false, box:false},
        {title:"募集内容", content:'desc', teams:false, newLine:true, box:false},
        {title:"タグ", content:null, teams:false, newLine:false, box:'tags'},
    ]


    return (
        props.recruitments.length ?
            props.recruitments.map ((recruitment,index)=>{
                return(
                    <Card key={index} sx={{p:2,m:2}} variant="outlined" >
                        <CardContent>
                        <List>
                            {
                                listItems.map((listItem,index)=>{
                                    return(
                                        <ListItem key={index} sx={{display:'flex',flexDirection:'column',alignItems:'start'}} >
                                            <ListItemText
                                                primary={listItem.title}
                                                secondary={
                                                    listItem.teams ?
                                                        listItem.newLine ?
                                                            textNewLine(recruitment.teams[listItem.content])
                                                            :recruitment.teams[listItem.content]
                                                    :listItem.newLine ?
                                                        textNewLine(recruitment[listItem.content])
                                                        :recruitment[listItem.content]
                                                }
                                            />
                                            {
                                                listItem.box?
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {recruitment.tags.length ?
                                                        recruitment.tags.map((tag,index)=>{
                                                            return(
                                                                    <Chip key={index} label={tag.name}/>
                                                                )
                                                            })
                                                            :null
                                                        }
                                               </Box>
                                               :null
                                            }
                                        </ListItem>
                                    );
                                })
                            }
                        </List>
                        </CardContent>
                        <CardActions sx={{pb:0, justifyContent:'end'}}>
                            {
                                buttons.map((button,index)=>{
                                    return(
                                        <Button
                                            key={index}
                                            size="small"
                                            color="primary"
                                            href={
                                                button.href ?
                                                    button.teams ?
                                                    button.href + recruitment.teams.id
                                                    :button.href + recruitment.id
                                                :null
                                            }

                                            onClick={button.handle ? button.handle(recruitment.id) : null}
                                        >
                                            <Typography>
                                                {button.title}
                                            </Typography>
                                        </Button>
                                    );
                                })
                            }
                        </CardActions>
                    </Card>
                );
            })
            :
            <Card sx={{p:2, m:2}} variant="outlined" >
                <CardContent>
                    <List>
                        <ListItem>
                            <ListItemText primary="募集がまだありません"/>
                        </ListItem>
                    </List>
                </CardContent>
             </Card>
    )
}
