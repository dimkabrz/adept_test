import './App.css'
import {EmployeesContainer} from "../entities/employee/ui/EmployeesContainer";
import {CompaniesContainer} from "../entities/company/ui/CompaniesContainer";

function App() {

    return (
        <div className={'main_container'}>
            <CompaniesContainer/>
            <EmployeesContainer/>
        </div>
    )
}

export default App
