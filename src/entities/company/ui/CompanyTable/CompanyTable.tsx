import {CompanyRow} from "../CompanyRow";
import './CompanyTable.css'
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "../../../../app/model/store";
import {Company} from "../../../../app/model/store/types.ts";
import {setChosenCompanies} from "../../../../app/model/store/appSlice.ts";


type Props = {
    companiesList: Company[]
}
export const CompanyTable = ({companiesList}: Props) => {

    const dispatch = useDispatch();

    const [allChecked, setAllChecked] = useState(false);
    const [visibleRowCounter, setVisibleRowCounter] = useState(15);
    const allSelectedToggler = () => {
        allChecked
            ?
            dispatch(setChosenCompanies([]))
            :
            dispatch(setChosenCompanies(companiesList))
        setAllChecked(!allChecked)
    }
    const tableRef = useRef<HTMLTableElement | null>(null);

    useEffect(() => {
        const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (visibleRowCounter < companiesList.length) {
                        setTimeout(() => {
                            setVisibleRowCounter(Math.min(visibleRowCounter + 15, companiesList.length))
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
                <th>Название</th>
                <th>Количество сотрудников</th>
                <th>Адрес</th>
            </tr>
            </thead>
            <tbody>
            {companiesList.slice(0, visibleRowCounter).map((company: Company) => (
                <CompanyRow
                    company={company}
                    key={company.id}
                    setAllChecked={setAllChecked}
                />
            ))}
            </tbody>
        </table>
    );
};

