import axios, { AxiosResponse } from 'axios'
import { Employee } from '../layout/models/employee';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Employees = {
    list: () => request.get<Employee[]>('/employees'),
    details: (id: string) => request.get<Employee>(`/employees/${id}`),
    // create: (employee: Employee) => request.post<Employee>(`/employees/`, responseBody)
    create: (employee: Employee) => axios.post<void>(`/employees`, employee),
    update: (employee: Employee) => axios.put<void>(`/employees/${employee.id}`, employee),
    delete: (id: string) => axios.delete<void>(`/employees/${id}`)
}
const agent = {
    Employees
}

export default agent;