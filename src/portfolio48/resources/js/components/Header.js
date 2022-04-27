import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from '@mui/material';
import axios from 'axios';
import { ListItemIcon } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

const Header = (props) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const appName = "FOOTBAR";
  const userMenus = [
    {
        title:"ログイン" ,
        href:"/login" ,
        sx:{display: props.authUser.isLogin ? "none" : "flex"} ,
        onClick:handleCloseUserMenu,
        icon:<LoginIcon/>,
    },
    {
        title:"ユーザ登録" ,
        href:"/register" ,
        sx:{display: props.authUser.isLogin ? "none" : "flex"} ,
        onClick:handleCloseUserMenu,
        icon:<PersonAddAltIcon/>,
    },
    {
        title:"アカウント" ,
        href:`/account?userId=${props.authUser.id}` ,
        sx:{display: props.authUser.isLogin ? "flex" : "none"},
        onClick:handleCloseUserMenu,
        icon:<AccountCircleIcon/>,
    },
    {
        title:"チーム確認" ,
        href:"/account/team" ,
        sx:{display: props.authUser.isLogin ? "flex" : "none"},
        onClick:handleCloseUserMenu,
        icon:<GroupsIcon/>,
    },
    {
        title:"チーム作成" ,
        href:"/team/create" ,
        sx:{display: props.authUser.isLogin ? "flex" : "none"},
        onClick:handleCloseUserMenu,
        icon:<GroupAddIcon/>,
    },
    {
        title:"ログアウト" ,
        href:"" ,
        sx:{display: props.authUser.isLogin ? "flex" : "none"},
        onClick:(e)=>{ handleCloseUserMenu(); handleLogout(); },
        icon:<LogoutIcon/>,
    },
  ];
  const headerMenus = [
      {title:"トップページ" , href:"/", icon:<HomeIcon/>},
      {title:"募集を探す" , href:"/recruitment/index", icon:<ContentPasteSearchIcon sx={{mr:'2px'}}/>},
  ]


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleLogout(){
      axios.post('/api/logout')
      .then((response=>{
          console.log('ログアウト');
          props.handleSetMessage(response.data,"success");
          window.location.href = '/';
      }))
      .catch((e)=>{
        console.log(e.response)
      })
  }


    /**
     * ユーザ名に応じてアバターの背景色生成
     * @param {*} string
     * @returns
     */
    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
      }

    /**
     * ユーザ名に応じて先頭2文字を抽出し、アバターに設定
     * @param {*} name
     * @returns
     */
    function stringAvatar(name) {
        return {
            sx: {
            bgcolor: stringToColor(name),
            },
            children: `${name.split()[0][0]}`,
        };
    }

    return (
        <AppBar position="static" >
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    {/* ヘッダーアプリ名 */}
                    <Box sx={{display: { xs: 'none', md: 'flex', alignItems:'center'} }}>
                        <SportsSoccerIcon sx={{mb:'3px'}}/>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            fontWeight="Bold"
                            sx={{ mr: 2}}
                            >
                            {appName}
                        </Typography>
                    </Box>

                    {/* ヘッダープルダウンメニュー */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                width:300,
                            }}
                        >
                            {
                                headerMenus.map((headerMenu,index)=>{
                                    return(
                                        <MenuItem
                                            key={index}
                                            onClick={handleCloseNavMenu}
                                            component={Link}
                                            href={headerMenu.href}
                                        >
                                            <ListItemIcon> {headerMenu.icon} </ListItemIcon>
                                            <Typography textAlign="center">{headerMenu.title}</Typography>
                                        </MenuItem>
                                    );
                                })
                            }
                        </Menu>
                    </Box>

                    {/* ヘッダー中央アプリ名 */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', }, alignItems:'center' }}>
                        <SportsSoccerIcon sx={{mb:'3px'}}/>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            fontWeight="Bold"
                        >
                            {appName}
                        </Typography>
                    </Box>

                    {/* ヘッダーメニュー */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {
                            headerMenus.map((headerMenu,index)=>{
                                return(
                                    <Button
                                        key={index}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'flex' }}
                                        href={headerMenu.href}
                                    >
                                        {headerMenu.icon}
                                        {headerMenu.title}
                                    </Button>

                                );
                            })
                        }
                    </Box>

                    {/* ユーザアイコン */}
                    <Box sx={{ flexGrow: 0  }} >
                        <Tooltip title="ユーザメニュー">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={props.authUser.name} src="/" {...stringAvatar(props.authUser.name)} />
                                <Typography textAlign="center" sx={{pl:.5, color:'white'}}> {props.authUser.name} </Typography>
                            </IconButton>
                        </Tooltip>
                        {/* ユーザプルダウンメニュー */}
                        <Menu
                            sx={{mt:{xs:.5,sm:1.5},display:'block',width:300 }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {
                                userMenus.map((userMenu,index)=>{
                                    return(
                                        <MenuItem
                                            key={index}
                                            onClick={userMenu.onClick}
                                            component={Link} href={userMenu.href}
                                            sx={userMenu.sx}
                                            >
                                            <ListItemIcon>{userMenu.icon}</ListItemIcon>
                                            <Typography textAlign="center">{userMenu.title}</Typography>
                                        </MenuItem>
                                    );
                                })
                            }
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
