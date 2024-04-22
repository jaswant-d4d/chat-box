

import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography, Tooltip } from '@mui/material';
import { MoreVert } from "@mui/icons-material";


const CustomMenu: React.FC = () => {

    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setMenuAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <MoreVert />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={menuAnchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(menuAnchorEl)}
                onClose={handleCloseUserMenu}
            >
                <Box>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" >View Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" >Mute notification</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" >Media</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" >Clear Chat</Typography>
                    </MenuItem>
                </Box>
            </Menu>
        </Box>
    )
}
export default CustomMenu