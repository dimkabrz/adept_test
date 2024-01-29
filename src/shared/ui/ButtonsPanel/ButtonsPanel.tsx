import {Button} from "../Button";
import './ButtonsPanel.css'
import {Company, Employee} from "../../../app/model/store/types.ts";


type Props = {
    addAction: () => void,
    removeAction: () => void,
    selectedRows?: Company[] | Employee[]
}
export const ButtonsPanel = ({addAction, removeAction, selectedRows}: Props) => {

    return (
        <div className='buttons_panel'>
            <Button onClick={addAction}>
                Добавить
            </Button>
            <Button onClick={removeAction} selectedRows={selectedRows}>
                Удалить
            </Button>
        </div>
    );
};

