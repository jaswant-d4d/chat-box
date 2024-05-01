import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';
import { createGroup } from '../../redux-store/actions/chat';
import { Box, Divider, FormControl, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import MultipleSelectChip from '../lists/MultipleSelectChip';
import { Close, Groups2 } from '@mui/icons-material';

interface Props {
    open: boolean;
    onClose: (action: boolean) => void;
    title: string;
    content?: string;
}

const Transition = React.forwardRef(function Transition(
    props: any,
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialog: React.FC<Props> = ({ open, onClose, title, content }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [fields, setFields] = React.useState<{ name: string; members: string[] }>({ name: "", members: [] });

    const handleClose = () => {
        onClose(false);
    }

    const setGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields({ ...fields, name: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(createGroup(fields));
        handleClose();
        setFields({ name: "", members: [] });
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
                <Box className="flex justify-between items-center">
                    <DialogTitle><Groups2 className='me-2' />{title}</DialogTitle>
                    <Close className='me-4' onClick={handleClose} />
                </Box>
                <Divider />
                <DialogContent>
                    {content && (
                        <DialogContentText id="alert-dialog-slide-description">
                            Let Google help apps determine location. This means sending anonymous
                            location data to Google, even when no apps are running.
                        </DialogContentText>
                    )}
                    <Box className="mb-8">
                        <label htmlFor="groupName">Group Name</label>
                        <input type="text" name="groupName" value={fields.name} className="border-2 border-grey-100  rounded p-3 w-full" placeholder="Group Name" onChange={setGroupName} />
                    </Box>
                    <Box className="mb-4">
                        <MultipleSelectChip addMembers={(members) => setFields({ ...fields, members })} />
                    </Box>
                </DialogContent>
                <DialogActions className='m-4 mt-0'>
                    <button type="submit" className='border-2 p-2 px-10 hover:bg-slate-400 bg-slate-600'>Create Group</button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default CustomDialog;
