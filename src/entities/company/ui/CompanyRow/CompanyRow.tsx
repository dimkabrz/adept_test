import './CompanyRow.css'
import {SetStateAction} from "react";
import {Company} from "../../../../app/model/store/types.ts";
import {useDispatch, useSelector} from "../../../../app/model/store";
import {editCompany, setChosenCompanies, setChosenCompany} from "../../../../app/model/store/appSlice.ts";
import {EditableCell} from "../../../../shared/ui/EditableCell";
import _ from "lodash";

type Props = {
    company: Company,
    setAllChecked: (value: SetStateAction<boolean>) => void
}

export const CompanyRow = ({company, setAllChecked}: Props) => {
    const dispatch = useDispatch();
    const checkedRows = useSelector((state) => state.app.chosenCompanies);

    const isRowChecked = checkedRows?.find((el: Company) => el.id === company.id);
    const setData = (value: string, field: string) => {
        const updateCompany = _.cloneDeep(company);
        _.set(updateCompany, field, value)
        dispatch(editCompany(updateCompany))
    }
    const selectRowToggler = () => {
        if (isRowChecked) {
            dispatch(setChosenCompanies(checkedRows?.filter((el: Company) => el.id !== company.id)))
        } else {
            dispatch(setChosenCompanies([...checkedRows, company]));
            dispatch(setChosenCompany(company.id));
        }
        setAllChecked(false)
    }


    return (
        <tr className={`company_row ${isRowChecked ? 'selected_row' : ''}`}>
            <td>
                <div className={'check_row_toggler'}>
                    <input
                        type='checkbox'
                        onChange={selectRowToggler}
                        checked={!!isRowChecked}
                    />
                </div>
            </td>
            <td>
                <EditableCell value={company.name} setData={(value) => {
                    setData(value, 'name')
                }}/>
            </td>
            <td>
                <div className={'number_of_employees'}>
                    {company.employees.length}
                </div>
            </td>
            <td>
                <EditableCell value={company.address} setData={(value) => {
                    setData(value, 'address')
                }}/>
            </td>
        </tr>
    );
};
