import { makeRequest } from "src/core/data-access/http.service";
import { HttpMethods } from "src/core/enums/httpMethods.enum";
import { urls } from "src/core/http/urls";
import { TaskCreateType, UserLoginType, UserRegiterType } from "src/core/types/user.type";

export const getData = () => {
  return makeRequest({
    url: "",
    method: HttpMethods.GET,
  });
};


export const postLoginService = async (
  data: UserLoginType
) => {
  return makeRequest({
    url: urls.auth.login,
    method: HttpMethods.POST,
    data,
  }).then((res) => {
    const token = res['access_token'];
    localStorage.setItem('token', token);
  });
};

export const postRegisterService = async (
  data: UserRegiterType) => {
  return makeRequest({
    url: urls.auth.userRegister,
    method: HttpMethods.POST,
    data,
  });
}


export const getAllTasksService = async () => {
  return makeRequest({
    url: urls.task.getAllTasks,
    method: HttpMethods.GET,
  });
};


export const postCreateTaskService = async (data: TaskCreateType) => {
  return makeRequest({
    url: urls.task.createTask,
    method: HttpMethods.POST,
    data,
  });
};


export const putUpdateTaskService = async (id: string, data: TaskCreateType) => {
  return makeRequest({
    url: `${urls.task.updateTask}/${id}`,
    method: HttpMethods.PUT,
    data,
  });
};