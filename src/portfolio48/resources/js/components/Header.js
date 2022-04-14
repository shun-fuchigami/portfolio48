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
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import axios from 'axios';

const pages = ['トップページ','募集を探す',];

const Header = (props) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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
          console.log(response.data);
          props.handleSetStatus("success");
          window.location.href = '/';
      }))
      .catch((e)=>{
        console.log(e)
        props.handleSetStatus("error");
      })
  }

  /**
   * Todo 後で色を保持するよう修正
   */
  const [randomColor,setRandomColor] = useState(()=>{
    let r = Math.floor(Math.random() * 150);
    let g = Math.floor(Math.random() * 150);
    let b = Math.floor(Math.random() * 150);
    let color = `rgb(${r},${g},${b})`;
    return color
    })

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

        {/* アプリ名 */}
          <SportsSoccerIcon sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}/>
          <Typography
            variant="h5"
            noWrap
            component="div"
            fontWeight="Bold"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            FOOTBAR
          </Typography>

        {/* プルダウンメニュー */}
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
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} sx={{width:300}} onClick={handleCloseNavMenu } component={Link} href="/" >
                    <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        {/* 中央アプリ名 */}
          <SportsSoccerIcon sx={{display: { xs: 'flex', md: 'none' } }}/>
          <Typography
            variant="h5"
            noWrap
            component="div"
            fontWeight="Bold"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            FOOTBAR
          </Typography>

          {/* メニュー */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                href='/'
              >
                {page}
              </Button>
            ))}
          </Box>

        {/* セッティングメニュー */}
          <Box sx={{ flexGrow: 0  }} >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={props.authUser.name} src="/" {...stringAvatar(props.authUser.name)} />
                <Typography textAlign="center" sx={{pl:.5, color:'white'}}> {props.authUser.name} </Typography>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
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
                <MenuItem
                    onClick={handleCloseUserMenu}
                    component={Link} href="/login"
                    sx={{ display: props.authUser.isLogin ? "none" : "block"}}
                    >
                  <Typography textAlign="center">ログイン</Typography>
                </MenuItem>

                <MenuItem
                    onClick={handleCloseUserMenu}
                    component={Link} href="/register"
                    sx={{ display: props.authUser.isLogin ? "none" : "block"}}
                    >
                  <Typography textAlign="center">新規ユーザ登録</Typography>
                </MenuItem>

                <MenuItem
                    onClick={handleCloseUserMenu}
                    component={Link} href={`/account/${props.authUser.name}`}
                    sx={{ display: props.authUser.isLogin ? "block" : "none"}}
                    >
                  <Typography textAlign="center">アカウント</Typography>
                </MenuItem>

                <MenuItem
                    onClick={handleCloseUserMenu}
                    component={Link} href="/team/create"
                    sx={{ display: props.authUser.isLogin ? "block" : "none"}}
                >
                    <Typography textAlign="center">チームを作る</Typography>
                </MenuItem>

                <MenuItem
                    onClick={(e)=>{
                        handleCloseUserMenu();
                        handleLogout();
                        }}
                    component={Link}
                    sx={{ display: props.authUser.isLogin ? "block" : "none"}}
                >
                    <Typography textAlign="center">ログアウト</Typography>
                </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
