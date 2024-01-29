import './Button.css'
import {Company, Employee} from "../../../app/model/store/types.ts";

type Props = {
    children:string,
    onClick:() => void,
    selectedRows?: Company[]|Employee[]
}
export const Button = ({children, onClick, selectedRows} : Props) => {
    return (
        <button className='my_button' onClick={onClick} disabled={selectedRows?.length===0}>
            {children}
        </button>
    );
};

