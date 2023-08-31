import { useState } from "react";

interface useFormInputProps {
    initialValue: string
}

export function useFormInput(props : useFormInputProps) {
    const [value, setValue] = useState(props.initialValue);

    function handleChange (e: string) {
        setValue(e);
    }

    const inputProps = {
        value: value,
        onChange: handleChange
    }

    return inputProps;
}