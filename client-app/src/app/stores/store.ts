import { createContext, useContext } from "react";
import EmployeeStore from "./employeeStore";


/*Commando to install Mobx --> npm install mobx mobx-react-lite*/
interface Store {
    employeeStore: EmployeeStore
}

export const store: Store = {
    employeeStore: new EmployeeStore()

}

export const StoreContext = createContext(store);

//to use our stores into the components
export function useStore() {
    return useContext(StoreContext);
}