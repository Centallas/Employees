import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import EmployeeList from "./EmployeeList";

export default observer(function EmployeeDashboard() {
    const { employeeStore } = useStore(); 
    const {loadEmployees, employeeRegistry} = employeeStore;  
    
    useEffect(() => {
       if(employeeRegistry.size <= 1) loadEmployees();
    }, [employeeStore])
    //here and error rises he suggested f12 to include employeeRegistry.size and
    // loadEmployees but in my case is working fine :D without this error **
    /* replace [employeeStore] for [employeeRegistry.size, loadEmployees] */

    if (employeeStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <EmployeeList />
            </Grid.Column>
            <GridColumn width='6'>
                {/* {selectedEmployee && !employeeStore.editMode &&
                    <EmployeeDetails />}
                {editMode &&
                    <EmployeeForm />}  */}
                {/* the code above was to show datails in a Single application HomePage*/}
                <h2>Employee filters</h2>
            </GridColumn>
        </Grid>
    )
})