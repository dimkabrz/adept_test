import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Company, Employee} from "./types.ts";
import {mockCompanies} from "../../../shared/config/const.ts";


type InitialState = {
    companiesList: Company[] | null,
    chosenCompany: number | null,
    chosenCompanies: Company[],
    selectedEmployees: Employee[]
};

const initialState: InitialState = {
    companiesList: mockCompanies,
    chosenCompany: null,
    chosenCompanies: [],
    selectedEmployees: []
}


const AppSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        setCompanies(state, {payload}: PayloadAction<Company[]>) {
            state.companiesList = payload;
        },
        setChosenCompany(state, {payload}: PayloadAction<number | null>) {
            state.chosenCompany = payload;
        },
        setChosenCompanies(state, {payload}: PayloadAction<Company[]>) {
            state.chosenCompanies = payload;
        },
        setSelectedEmployees(state, {payload}) {
            state.selectedEmployees = payload;
        },
        editCompany(state, {payload}: PayloadAction<Company>) {
            const companiesList = state.companiesList
            if (!companiesList) {
                return
            }
            const chosenCompanyInListIndex = companiesList.findIndex((el) => el.id === payload.id);

            state.companiesList = [
                ...companiesList.slice(0, chosenCompanyInListIndex),
                payload,
                ...companiesList.slice(chosenCompanyInListIndex + 1)]
        },
        editEmployee(state, {payload}: PayloadAction<Employee>) {
            const companiesList = state.companiesList;
            if (!companiesList) {
                return
            }
            const chosenCompanyInListIndex = companiesList.findIndex((el) => el.id === state.chosenCompany);
            const chosenCompany = companiesList[chosenCompanyInListIndex];
            const chosenEmployeeInListIndex = chosenCompany.employees.findIndex((el) => el.id === payload.id);
            const newEmployeesList = [...chosenCompany.employees.slice(0, chosenEmployeeInListIndex),
                payload,
                ...chosenCompany.employees.slice(chosenEmployeeInListIndex + 1)]
            state.companiesList = [
                ...companiesList.slice(0, chosenCompanyInListIndex),
                {...chosenCompany, employees: newEmployeesList},
                ...companiesList.slice(chosenCompanyInListIndex + 1)]
        },
        addEmployee(state) {
            const companiesList = state.companiesList;
            if (!companiesList) {
                return
            }
            const chosenCompanyInListIndex = companiesList.findIndex((el) => el.id === state.chosenCompany);
            const chosenCompany = companiesList[chosenCompanyInListIndex];
            const newEmployeesList = [
                {
                    id: chosenCompany.employees.length + 1,
                    name: {
                        firstName: 'Имя',
                        secondName: 'Фамилия'
                    },
                    position: 'Должность'
                },
                ...chosenCompany.employees]
            state.companiesList = [
                ...companiesList.slice(0, chosenCompanyInListIndex),
                {...chosenCompany, employees: newEmployeesList},
                ...companiesList.slice(chosenCompanyInListIndex + 1)]
        }
    },
});

export default AppSlice.reducer;
export const {
    setCompanies,
    setChosenCompany,
    setChosenCompanies,
    setSelectedEmployees,
    editCompany,
    editEmployee,
    addEmployee
} = AppSlice.actions;