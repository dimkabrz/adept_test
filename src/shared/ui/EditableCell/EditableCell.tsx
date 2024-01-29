import {useRef, useState} from "react";
import './EditableCell.css'

type Props = {
    setData: (value: string) => void,
    value: string
}

export const EditableCell = ({value, setData}: Props) => {
    const [focus, setFocus] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const makeFocus = () => {
        setFocus(true);
        requestAnimationFrame(() => {
            inputRef.current && inputRef.current.focus();
        });
    }
    return (
        <div className={'editable_cell'}
             onClick={makeFocus}>
            {focus
                ? <input
                    className={'edit_value_area'}
                    ref={inputRef}
                    value={value}
                    onChange={(e) => {
                        setData(e.target.value)
                    }}
                    onBlur={() => {
                        setFocus(false)
                    }}
                />
                : <span>{value}</span>
            }
        </div>
    );
};

