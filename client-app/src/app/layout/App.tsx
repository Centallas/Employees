import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import EmployeeDashboard from '../../features/employees/dashboard/EmployeeDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import EmployeeForm from '../../features/employees/form/EmployeeForm';
import EmployeeDetails from '../../features/employees/details/EmployeeDetails';


function App() {
  const location = useLocation();
  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/employees' component={EmployeeDashboard} />
              <Route path='/employees/:id' component={EmployeeDetails} />
              <Route key={location.key} path={['/createEmployee', '/manage/:id']} component={EmployeeForm} />
            </Container>

          </>
        )}

      />

    </>
  );
}
export default observer(App);
