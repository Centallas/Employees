import { observer } from "mobx-react-lite";
import { Grid, GridColumn } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import EmployeeDetails from "../details/EmployeeDetails";
import EmployeeForm from "../form/EmployeeForm";
import EmployeeList from "./EmployeeList";

export default observer(function EmployeeDashboard() {

    const { employeeStore } = useStore();
    const { selectedEmployee, editMode } = employeeStore;
    return (
        <Grid>
            <Grid.Column width='10'>
                <EmployeeList />
            </Grid.Column>
            <GridColumn width='6'>
                {selectedEmployee && !employeeStore.editMode &&
                    <EmployeeDetails />}
                {editMode &&
                    <EmployeeForm />}
            </GridColumn>
        </Grid>
    )
})