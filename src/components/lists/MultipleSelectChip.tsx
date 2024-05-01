import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-store/store';

interface Props {
    addMembers: (value: string[]) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const MultipleSelectChip: React.FC<Props> = ({ addMembers }) => {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);
    const userList = useSelector((state: RootState) => state.chat.userList);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const value = event.target.value;
        if (value === null || value === undefined) return;
        setPersonName(value as string[]);
        const selectedIds = userList
            .filter(user => value.includes(user.email))
            .map(user => user._id);
        addMembers(selectedIds);
    };

    const handleDelete = (nameToDelete: string) => () => {
        setPersonName(prevPersonName => prevPersonName.filter(name => name !== nameToDelete));
    };

    return (
        <React.Fragment>
            <FormControl sx={{ width: "100%" }}>
                <label htmlFor="members">Members</label>
                <Select
                    id="members"
                    multiple
                    fullWidth
                    value={personName}
                    onChange={handleChange}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip
                                    key={value}
                                    label={value}
                                    variant="outlined"
                                    onDelete={handleDelete(value)}
                                    color="primary"
                                />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {userList?.map((user) => (
                        <MenuItem
                            key={user._id}
                            value={user.email}
                            style={getStyles(user.email, personName, theme)}
                        >
                            {user.email}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </React.Fragment>
    );
};

export default MultipleSelectChip;
