import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function MyDatePickers() {
    const [gregorianDate, setGregorianDate] = React.useState(dayjs());
    const [textFieldValue, setTextFieldValue] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);

    const toMinguoDate = (date) => {
        const gregorianDate = dayjs(date);
        const minguoYear = gregorianDate.year() - 1911;
        return `民國${minguoYear}年-${gregorianDate.format('MM月-DD號')}`;
    };

    const fromMinguoDate = (minguoDateString) => {
        const match = minguoDateString.match(/民國(\d+)年-(\d{2})月-(\d{2})號/);
        if (match) {
            const year = parseInt(match[1], 10) + 1911;
            const month = parseInt(match[2], 10) - 1; // dayjs months are 0-indexed
            const day = parseInt(match[3], 10);
            return dayjs(new Date(year, month, day));
        }
        return null;
    };

    const handleDateChange = (newValue) => {
        setGregorianDate(newValue);
        setTextFieldValue(toMinguoDate(newValue));
        setAnchorEl(null);
    };

    const handleTextFieldChange = (event) => {
        const inputValue = event.target.value;
        setTextFieldValue(inputValue);
        const parsedDate = fromMinguoDate(inputValue);
        if (parsedDate && parsedDate.isValid()) {
            setGregorianDate(parsedDate);
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    React.useEffect(() => {
        setTextFieldValue(toMinguoDate(gregorianDate));
    }, [gregorianDate]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="my-date-pickers-container">
                <TextField
                    label="CGU-CSIE"
                    value={textFieldValue}
                    onChange={handleTextFieldChange}
                />
                <IconButton onClick={handleClick}>
                    <CalendarTodayIcon />
                </IconButton>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        value={gregorianDate}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Popover>
            </div>
        </LocalizationProvider>
    );
}
