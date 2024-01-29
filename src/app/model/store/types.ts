type employeeName = {
    firstName: string
    secondName: string
}
export interface Employee {
    id: number,
    name: employeeName,
    position: string
}

export interface Company {
    id: number,
    name: string,
    address: string,
    employees: Employee[]
}