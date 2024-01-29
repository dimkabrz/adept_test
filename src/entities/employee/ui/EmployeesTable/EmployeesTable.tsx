import {EmployeeRow} from "../EmployerRow";
import {useDispatch} from "../../../../app/model/store";
import {useEffect, useRef, useState} from "react";
import {setSelectedEmployees} from "../../../../app/model/store/appSlice.ts";
import {Company} from "../../../../app/model/store/types.ts";
import './'

type Props = {
    chosenCompany: Company
}
export const EmployeesTable = ({chosenCompany}: Props) => {
    const dispatch = useDispatch();

    const [visibleRowCounter, setVisibleRowCounter] = useState(15);
    const [allChecked, setAllChecked] = useState(false);
    const allSelectedToggler = () => {
        allChecked
            ?
            dispatch(setSelectedEmployees([]))
            :
            dispatch(setSelectedEmployees(chosenCompany.employees))
        setAllChecked(!allChecked)
    }

    const tableRef = useRef<HTMLTableElement | null>(null);

    useEffect(() => {
        const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (visibleRowCounter < chosenCompany.employees.length) {
                        setTimeout(() => {
                            setVisibleRowCounter(Math.min(visibleRowCounter + 15, chosenCompany.employees.length))
                        }, 1000)

                    }
                }
            });
        };

        const observerOptions: IntersectionObserverInit = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver(intersectionCallback, observerOptions);

        if (tableRef.current) {
            const rows = tableRef.current.querySelectorAll('tr');
            observer.observe(rows[rows.length - 1]);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <table ref={tableRef}>
            <thead>
            <tr>
                <th>
                    <div className={'check_all_title'}>
                        <input
                            type='checkbox'
                            onChange={allSelectedToggler}
                            checked={allChecked}
                        />
                        <label>Выделить всё</label>
                    </div>
                </th>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>Должность</th>
            </tr>
            </thead>
            <tbody>
            {chosenCompany.employees.slice(0, visibleRowCounter).map(employee => (
                <EmployeeRow
                    key={employee.id}
                    employee={employee}
                    setAllChecked={setAllChecked}
                />
            ))}
            </tbody>
        </table>
    );
};

