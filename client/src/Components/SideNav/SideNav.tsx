import React, { useState, useEffect } from 'react';
import './SideNav.css'
import { styled, useTheme, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useNavigate  } from "react-router-dom";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IoHome } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi'; // Added icon for Profile
import CreateBlog from './Components/CreateBlog';
import MyBlogs from './Components/GetBlogs';
import Profile from '../Profile/Profile'; // Import Profile component
import bloglogo from '../../Images/bloglogo.avif'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CSSObject } from '@mui/system';
import GetAllBlogs from '../AllBlogs/AllBlogs'
import { MdLibraryBooks } from 'react-icons/md';

// Define the drawer width
const drawerWidth = 180;

// Define openedMixin function
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

// Define closedMixin function
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// Styled AppBar with typing
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Styled Drawer with typing
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

// Drawer header styled component
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function SideNav() {

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [menuData, setMenuData] = useState('Home');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userName, setUserName] = useState<string>('');
    const   navigate=useNavigate()
  useEffect(() => {
    const user:any = localStorage.getItem('userName');
    if (user) {
      setUserName(JSON.parse(user));
    }
  }, []);
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : '';

  const handleMenuItemClick = (menuItem: string) => {
    setMenuData(menuItem);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAvatarMenuItem = (menuItem: string) => {
    if (menuItem === 'Logout') {
      // Perform logout logic here
      console.log('Logout clicked');
      localStorage.removeItem('token')
      let token=localStorage.getItem('token')
      if(!token){
        navigate('/login')
      }
    } else if (menuItem === 'Profile') {
      setMenuData('Profile');
    }
    handleAvatarMenuClose();
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar open={open} position="fixed" elevation={6} sx={{ backgroundColor: '#283747' }}>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle} edge="start">
              <MenuIcon />
            </IconButton>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100vw',
              }}
            >
              <div>
                <img src={bloglogo} alt="Logo" className="blogLogo" />
              </div>
              <Box style={{position:"relative",top:'5px'}}>
                <Avatar onClick={handleAvatarClick} style={{ cursor: 'pointer', backgroundColor: '#a268ff' }}>
                  {firstLetter}
                </Avatar>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleAvatarMenuClose}>
                  <MenuItem onClick={() => handleAvatarMenuItem('Profile')}>Profile</MenuItem>
                  <MenuItem onClick={() => handleAvatarMenuItem('Logout')}>Logout</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerToggle}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => handleMenuItemClick('Home')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <IoHome style={{ width: '24px', height: '24px' }} />
                </ListItemIcon>
                <ListItemText primary={open ? 'Home' : null} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => handleMenuItemClick('Create Blog')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <FaPlus style={{ width: '24px', height: '24px' }} />
                </ListItemIcon>
                <ListItemText primary={open ? 'Create Blog' : null} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => handleMenuItemClick('Profile')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <FiUser style={{ width: '24px', height: '24px' }} />
                </ListItemIcon>
                <ListItemText primary={open ? 'Profile' : null} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => handleMenuItemClick('My Blogs')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {/* <IoHome style={{ width: '24px', height: '24px' }} /> */}
                  <MdLibraryBooks style={{ width: '24px', height: '24px' }} />
                </ListItemIcon>
                <ListItemText primary={open ? 'My Blogs' : null} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {menuData === 'Home' && <GetAllBlogs />}
          {menuData === 'Create Blog' && <CreateBlog />}
          {menuData === 'Profile' && <Profile />}
          {menuData === 'My Blogs' && <MyBlogs />}
        </Box>
      </Box>
    </>
  );
}
