import {CompanyTable} from "../CompanyTable";
import {ButtonsPanel} from "../../../../shared/ui/ButtonsPanel";
import {useDispatch, useSelector} from "../../../../app/model/store";
import {useEffect} from "react";
import {setChosenCompanies, setCompanies} from "../../../../app/model/store/appSlice.ts";
import {mockCompanies} from "../../../../shared/config/const.ts";
import './CompaniesContainer.css'
import {Button} from "../../../../shared/ui/Button";
import {Company} from "../../../../app/model/store/types.ts";

export const CompaniesContainer = () => {
    const dispatch = useDispatch()

    const companiesList = useSelector((state) => state.app.companiesList);
    const selectedRows = useSelector((state) => state.app.chosenCompanies);


    const addAction = () => {
        if (!companiesList) {
            return
        }
        const newCompany: Company = {
            id: Math.random(),
            name: 'Название',
            address: 'Адрес',
            employees: []
        }
        dispatch(setCompanies([newCompany, ...companiesList]))
    }

    const removeAction = () => {
        if (!companiesList) {
            return
        }
        selectedRows.length > 0 && dispatch(setCompanies(companiesList.filter(el => !selectedRows.includes(el))))
        dispatch(setChosenCompanies([]))
    }

    useEffect(() => {
        dispatch(setCompanies(mockCompanies));
    }, [])
    return (
        <>
            {companiesList && companiesList.length > 0
                ?
                <div className={'companies_container'}>
                    <ButtonsPanel addAction={addAction} removeAction={removeAction} selectedRows={selectedRows}/>
                    <CompanyTable companiesList={companiesList}/>
                </div>
                :
                <div className={'empty_companies_list_info'}>
                    <span>
                        Список компаний-пуст
                    </span>
                    <Button onClick={() => {
                        dispatch(setCompanies(mockCompanies))
                    }}>
                        Обновить таблицу
                    </Button>
                </div>
            }
        </>
    );
};

