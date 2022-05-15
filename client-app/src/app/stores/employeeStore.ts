import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Employee } from "../layout/models/employee";
import { v4 as uuid } from 'uuid';

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
    }

    // setTitle=()=>{
    //     this.title = this.title + '!';
    //}

    loadEmployees = async () => {
        try {
            const employees = await agent.Employees.list();

            employees.forEach(employee => {
                employee.date = employee.date.split('T')[0];
                //this.employees.push(employee);
                this.employeeRegistry.set(employee.id, employee);
            })
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectEmployee = (id: string) => {
        //this.selectedEmployee = this.employees.find(x => x.id === id);
        this.selectedEmployee = this.employeeRegistry.get(id)
    }

    cancelSelectedEmployee = () => {
        this.selectedEmployee = undefined;
    }
    openForm = (id?: string) => {
        id ? this.selectEmployee(id) : this.cancelSelectedEmployee();
        this.editMode = true;
    }
    closeForm = () => {
        this.editMode = false;
    }

    createEmployee = async (employee: Employee) => {

        var anualSalary = this.getEmployeeAnnualSalary(employee);
        this.editMode = true;
        employee.id = uuid();
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
    }

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
    }

    deleteEmployee = async (id: string) => {
        this.loading = true;
        try {
            await agent.Employees.delete(id);
            runInAction(() => {
                //this.employees = [...this.employees.filter(x => x.id !== id)]
                this.employeeRegistry.delete(id);
                if (this.selectedEmployee?.id === id) this.cancelSelectedEmployee();
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }

    }

    getEmployeeAnnualSalary(employee: Employee): number {
        var salary: number = +employee.employee_salary;
        var annualSalary: number = salary * 12;
        return annualSalary
    }
}



