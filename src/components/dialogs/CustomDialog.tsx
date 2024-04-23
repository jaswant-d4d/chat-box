import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Divider, TextField } from '@mui/material';
import MultipleSelectChip from '../lists/MultipleSelectChip';
import { GroupAdd, GroupAddOutlined, GroupAddRounded, Groups2, Groups3 } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';
import { createGroup } from '../../redux-store/actions/chat';


interface Props {
    open: boolean
    onClose: (action: boolean) => void
    title: string,
    content?: string
    dialogType: string
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialog: React.FC<Props> = ({ open, onClose, title, content, dialogType }) => {
    const dispatch = useDispatch<AppDispatch>()
    const [fields, setFields] = React.useState({
        groupName: "", members: []
    })

    const handleClose = () => {
        onClose(false)
    }

    const setGroupName = (e: any) => {
        setFields({ ...fields, groupName: e.target.value })
    }

    const addMembers = (members: any) => {
        console.log(members)
        setFields({ ...fields, members: members })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()

        dispatch(createGroup(fields))
        // handleClose()
        // setFields({ groupName: "", members: [] })
    }

    return (

        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            fullWidth
        >
            <form onSubmit={handleSubmit}>

                <DialogTitle className=''><Groups2 className='me-2' />{title}</DialogTitle>
                <Divider />
                <DialogContent>
                    {content && (
                        <DialogContentText id="alert-dialog-slide-description">
                            Let Google help apps determine location. This means sending anonymous
                            location data to Google, even when no apps are running.
                        </DialogContentText>
                    )}
                    <Box className="mb-8">
                        <label htmlFor="">Group Name</label>
                        <input type="text" name="name" className="border-2 border-grey-100  rounded p-3 w-full" placeholder="Group Name" onChange={setGroupName} />
                    </Box>
                    <Box className="mb-4">
                        <MultipleSelectChip addMembers={addMembers}/>
                    </Box>
                </DialogContent>
                <DialogActions className='m-4 mt-0'>
                    <button type="submit" className='border-2 p-2 px-10 hover:bg-slate-400 bg-slate-600'>Create Group</button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default CustomDialog