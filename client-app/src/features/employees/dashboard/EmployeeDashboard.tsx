import { Grid, GridColumn } from "semantic-ui-react";
import { Employee } from "../../../app/layout/models/employee";
import EmployeeDetails from "../details/EmployeeDetails";
import EmployeeForm from "../form/EmployeeForm";
import EmployeeList from "./EmployeeList";

interface Props {
    employees: Employee[];
    selectedEmployee: Employee | undefined;
    selectEmployee: (id: string) => void;
    cancelSelectEmployee: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (employee: Employee) => void;
    deleteEmployee: (id: string) => void;
}

export default function EmployeeDashboard({ employees, selectedEmployee,
    selectEmployee, cancelSelectEmployee, editMode, openForm, closeForm, createOrEdit, deleteEmployee }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <EmployeeList employees={employees}
                    selectEmployee={selectEmployee} deleteEmployee={deleteEmployee} />
            </Grid.Column>
            <GridColumn width='6'>
                {selectedEmployee && !editMode &&
                    <EmployeeDetails
                        employee={selectedEmployee}
                        cancelSelectEmployee={cancelSelectEmployee}
                        openForm={openForm}
                    />}
                {editMode &&
                    <EmployeeForm closeForm={closeForm} employee={selectedEmployee} createOrEdit={createOrEdit} />}
            </GridColumn>
        </Grid>
    )
}