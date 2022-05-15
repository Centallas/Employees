import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import EmployeeDashboard from '../../features/employees/dashboard/EmployeeDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {

  const { employeeStore } = useStore();

  useEffect(() => {
    employeeStore.loadEmployees();
  }, [employeeStore])

  if (employeeStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <EmployeeDashboard />
      </Container>
    </>
  );
}
export default observer(App);
