import {EmployeesTable} from "../EmployeesTable";
import {useDispatch, useSelector} from "../../../../app/model/store";
import {addEmployee, editCompany, setSelectedEmployees} from "../../../../app/model/store/appSlice.ts";
import {ButtonsPanel} from "../../../../shared/ui/ButtonsPanel";
import './EmployeesContainer.css'


export const EmployeesContainer = () => {
    const dispatch = useDispatch();
    const companiesList = useSelector((state) => state.app.companiesList);
    const selectedEmployees = useSelector((state) => state.app.selectedEmployees);
    const chosenCompanies = useSelector((state) => state.app.chosenCompanies);
    const chosenCompany = companiesList?.find(el => el.id === chosenCompanies[0]?.id)
    const addAction = () => {
        dispatch(addEmployee())
    }

    const removeAction = () => {
        if (!companiesList) {
            return
        }
        const chosenCompanyInListIndex = companiesList.findIndex((el) => el.id === chosenCompany?.id);
        const templateOFList = {...companiesList[chosenCompanyInListIndex]};
        templateOFList.employees = templateOFList.employees.filter((el) => !selectedEmployees.includes(el));

        selectedEmployees.length > 0 && dispatch(editCompany(templateOFList))
        dispatch(setSelectedEmployees([]))
    }
    if (!chosenCompany) {
        return null
    }
    return (
        <>
            {chosenCompany && chosenCompanies.length === 1 &&
                <div className={'employees_container'}>
                    <ButtonsPanel addAction={addAction} removeAction={removeAction} selectedRows={selectedEmployees}/>
                    {chosenCompany.employees.length !== 0
                        ?
                        <EmployeesTable chosenCompany={chosenCompany}/>
                        :
                        <div className={'empty_employee_list_info'}>Список сотрудников выбранной компании пуст, вы
                            можете добавить сотрудников, нажав на кнопку "Добавить"</div>
                    }
                </div>
            }
            {chosenCompanies.length > 1 &&
                <div className={'more_one_chosen_info'}>
                    Выбрано больше 1 компании, для отображения списка сотрудников необходимо чтобы была выбрана только одна компания
                </div>
            }
        </>


    );
};
