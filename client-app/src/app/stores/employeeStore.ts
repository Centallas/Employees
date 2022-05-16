import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Employee } from "../layout/models/employee";


export default class EmployeeStore {

    employeeRegistry = new Map<string, Employee>();
    selectedEmployee: Employee | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;


    constructor() {
        makeAutoObservable(this)
    }
    get employeesByDate() {
        return Array.from(this.employeeRegistry.values()).sort((a, b) =>
            Date.parse(b.date) - Date.parse(a.date));
    };

    // setTitle=()=>{
    //     this.title = this.title + '!';
    //}

    loadEmployees = async () => {
        this.loadingInitial = true;
        try {
            const employees = await agent.Employees.list();
            employees.forEach(employee => {
                this.setEmployee(employee);
            })
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };

    loadEmployee = async (id: string) => {
        let employee = this.getEmployee(id);
        if (employee) {
            this.selectedEmployee = employee;
            return employee;
        } else {
            this.loadingInitial = true;
            try {
                employee = await agent.Employees.details(id);
                this.setEmployee(employee);
                runInAction(() => {
                    this.selectedEmployee = employee;
                })
                this.setLoadingInitial(false);
                return employee;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    };

    private setEmployee = (employee: Employee) => {
        employee.date = employee.date.split('T')[0];
        this.employeeRegistry.set(employee.id, employee);
    };

    private getEmployee = (id: string) => {
        return this.employeeRegistry.get(id);
    };


    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    };

    createEmployee = async (employee: Employee) => {
        this.loading = true;
        var anualSalary = this.getEmployeeAnnualSalary(employee);
        employee.employee_annual_salary = anualSalary.toString();
        try {
            await agent.Employees.create(employee);
            runInAction(() => {
                //this.employees.push(employee);
                this.employeeRegistry.set(employee.id, employee);
                this.selectedEmployee = employee
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    };

    updateEmployee = async (employee: Employee) => {
        var annualSalary = this.getEmployeeAnnualSalary(employee);
        employee.employee_annual_salary = annualSalary.toString();
        this.loading = true;
        try {
            await agent.Employees.update(employee);
            runInAction(() => {
                //this.employees = [...this.employees.filter(x => x.id !== employee.id, employee)]
                this.employeeRegistry.set(employee.id, employee);
                this.selectedEmployee = employee;
                this.editMode = false;
                this.loading = false;

            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    };

    deleteEmployee = async (id: string) => {
        this.loading = true;
        try {
            await agent.Employees.delete(id);
            runInAction(() => {
                this.employeeRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }

    };

    getEmployeeAnnualSalary(employee: Employee): number {
        var salary: number = +employee.employee_salary;
        var annualSalary: number = salary * 12;
        return annualSalary
    };
}



