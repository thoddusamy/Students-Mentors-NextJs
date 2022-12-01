import { useState, Fragment } from "react";
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import HouseSidingOutlinedIcon from '@mui/icons-material/HouseSidingOutlined';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import PlusOneOutlinedIcon from '@mui/icons-material/PlusOneOutlined';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';
import FindReplaceOutlinedIcon from '@mui/icons-material/FindReplaceOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import SavedSearchOutlinedIcon from '@mui/icons-material/SavedSearchOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';

export default function App({ children }) {

    const router = useRouter()
    const style = {
        fontFamily: 'Fuzzy Bubbles',
        letterSpacing: "1px",
    }

    // drawer
    const array = [
        {
            name: <div className="drawer-name">Home</div>,
            onClick: "/",
            icon: <HouseSidingOutlinedIcon />,
        },
        {
            name: <div className="drawer-name">Students</div>,
            onClick: "/students/students",
            icon: <EmojiPeopleOutlinedIcon />,
        },
        {
            name: <div className="drawer-name">Add-student</div>,
            onClick: "/students/addstudent",
            icon: <PlusOneOutlinedIcon />,
        },
        {
            name: <div className="drawer-name">Mentors</div>,
            onClick: "/mentors/mentors",
            icon: <AccessibilityOutlinedIcon />,
        },
        {
            name: <div className="drawer-name">Add-Mentor</div>,
            onClick: "/mentors/addmentors",
            icon: <PlusOneOutlinedIcon />,
        },
        {
            name: <div className="drawer-name">Change-mentor</div>,
            onClick: "/mentors/changementor",
            icon: <FindReplaceOutlinedIcon />,
        },
        {
            name: <div className="drawer-name">Assign-mentor</div>,
            onClick: "/mentors/assignmentor",
            icon: <AssignmentTurnedInOutlinedIcon />,
        },
        {
            name: <div className="drawer-name">Findby-mentor</div>,
            onClick: "/mentors/findbymentor",
            icon: <SavedSearchOutlinedIcon />,
        },
        {
            name: <div className="drawer-name">OverAll-view</div>,
            onClick: "/history",
            icon: <QueryStatsOutlinedIcon />,
        },
    ];

    const [state, setState] = useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {array.map(({ name, onClick, icon }, index) => (
                    <ListItem
                        button
                        key={index}
                        onClick={() => {
                            router.push(onClick);
                        }}
                    >
                        <ListItemText color="success" primary={name} />
                        {icon}
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Paper elevation={4} style={{ borderRadius: "0px", minHeight: "100vh" }}>
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        {["left"].map((anchor) => (
                            <Fragment key={anchor}>
                                <Button color="inherit" onClick={toggleDrawer(anchor, true)}>
                                    <div className={styles.drawericon} style={style}>
                                        <MenuOpenIcon />
                                        Menu
                                    </div>
                                </Button>
                                <Drawer
                                    anchor={anchor}
                                    open={state[anchor]}
                                    onClose={toggleDrawer(anchor, false)}
                                >
                                    {list(anchor)}
                                </Drawer>
                            </Fragment>
                        ))}
                    </Toolbar>
                </AppBar>
                {children}
            </div>
        </Paper>
    );
}