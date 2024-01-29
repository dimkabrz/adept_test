import './EmployeeRow.css'
import {SetStateAction} from "react";
import {Employee} from "../../../../app/model/store/types.ts";
import {editEmployee, setSelectedEmployees} from "../../../../app/model/store/appSlice.ts";
import {useSelector, useDispatch} from "../../../../app/model/store";
import {EditableCell} from "../../../../shared/ui/EditableCell";
import _ from "lodash";


type Props = {
    employee: Employee,
    setAllChecked: (value: SetStateAction<boolean>) => void
}
export const EmployeeRow = ({employee, setAllChecked}: Props) => {
    const dispatch = useDispatch();

    const checkedRows = useSelector((state) => state.app.selectedEmployees);

    const isRowChecked = checkedRows.some((el: Employee) => el.id === employee.id);

    const setData = (value: string, field: string) => {
        const newEmployee = _.cloneDeep(employee);
        _.set(newEmployee, field, value)
        dispatch(editEmployee(newEmployee))
    }

    const selectRowToggler = () => {
        isRowChecked
            ? dispatch(setSelectedEmployees(checkedRows?.filter((el: Employee) => el.id !== employee.id)))
            : dispatch(setSelectedEmployees([...checkedRows, employee]))
        setAllChecked(false)
    }
    return (
        <tr className={`employee_row ${isRowChecked ? 'selected_row' : ''}`}>
            <td>
                <div className={'check_row_toggler'}>
                    <input
                        type='checkbox'
                        checked={isRowChecked}
                        onChange={selectRowToggler}
                    />
                </div>
            </td>
            <td>
                <EditableCell value={employee.name.secondName} setData={(value: string) => {
                    setData(value, 'name.secondName')
                }}/>
            </td>
            <td>
                <EditableCell value={employee.name.firstName} setData={(value: string) => {
                    setData(value, 'name.firstName')
                }}/>
            </td>
            <td>
                <EditableCell value={employee.position} setData={(value: string) => {
                    setData(value, 'position')
                }}/>
            </td>
        </tr>
    );
};

