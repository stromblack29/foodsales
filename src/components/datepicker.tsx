import * as React from 'react';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useImperativeHandle } from 'react';

export type ChildrenHandle = {
    getChildState: () => any;
};
type Props = {
    value?: any
};

export default React.forwardRef<ChildrenHandle, Props>(function DatePickerValue(props, ref) {
    useImperativeHandle(ref, () => ({
        getChildState: () => {
            return {
                date: value
            }
        }
    }));
    
    const [value, setValue] = React.useState<Dayjs | null>(null);
    React.useEffect(() => {
        if (props.value) {
            setValue(props.value);
        }
    }, [props.value])
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker value={value} onChange={(newValue) => setValue(newValue)} selectedSections={undefined} onSelectedSectionsChange={undefined} />
      </LocalizationProvider>
    );
});