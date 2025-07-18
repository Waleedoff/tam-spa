import { makeRequest } from 'src/core/data-access/http.service';
import { HttpMethods } from 'src/core/enums/httpMethods.enum';
import { urls } from 'src/core/http/urls';
import {
  CommentCreateType,
  CreateAnnouncemnt,
  TaskCreateType,
  UserLoginType,
  UserRegiterType,
} from 'src/core/types/user.type';

export const getData = () => {
  return makeRequest({
    url: '',
    method: HttpMethods.GET,
  });
};

export const postLoginService = async (data: UserLoginType) => {
  return makeRequest({
    url: urls.auth.login,
    method: HttpMethods.POST,
    data,
  }).then((res) => {
    const token = res['access_token'];
    localStorage.setItem('token', token);
  });
};

export const postRegisterService = async (data: UserRegiterType) => {
  return makeRequest({
    url: urls.auth.userRegister,
    method: HttpMethods.POST,
    data,
  });
};

export const getAllTasksService = async (q: string) => {
  return makeRequest({
    url: urls.task.getAllTasks,
    method: HttpMethods.GET,
    params: { q },
  });
};

export const postCreateTaskService = async (data: TaskCreateType) => {
  return makeRequest({
    url: urls.task.createTask,
    method: HttpMethods.POST,
    data,
  });
};

export const putUpdateTaskService = async (
  id: string,
  data: TaskCreateType,
) => {
  return makeRequest({
    url: `${urls.task.updateTask}/${id}/edit`,
    method: HttpMethods.PUT,
    data,
  });
};

export const deleteTaskService = async (id: string) => {
  return makeRequest({
    url: `${urls.task.updateTask}/${id}`, // or urls.task.deleteTask if you have one
    method: HttpMethods.PUT, // use HttpMethods.DELETE if your backend supports it
  });
};
export const putUpdateStatusTaskService = async (
  task_id: string,
  status: string,
) => {
  return makeRequest({
    url: `${urls.task.updateStatusTask(task_id)}`,
    method: HttpMethods.PUT,
    params: { status },
  });
};

export const getStatisticsService = async () => {
  return makeRequest({
    url: urls.task.getStatistics,
    method: HttpMethods.GET,
  });
};

export const getAllMembersService = async (q: string) => {
  return makeRequest({
    url: urls.task.getAllMembers,
    method: HttpMethods.GET,
    params: { q },
  });
};

export const getTasksByUserIdService = async (userId: string) => {
  return makeRequest({
    url: urls.task.getTasksByUserId(userId), // call the function to get full URL
    method: HttpMethods.GET,
  });
};

export const CreateAnnouncementService = async (data: CreateAnnouncemnt) => {
  return makeRequest({
    url: urls.announcement.createAnnouncement,
    method: HttpMethods.POST,
    data,
  });
};

export const GetAllAnnouncementService = async () => {
  return makeRequest({
    url: urls.announcement.getAllAnnouncement,
    method: HttpMethods.GET,
  });
};

export const GetDepartmentsService = async () => {
  return makeRequest({
    url: urls.department.getDepartments,
    method: HttpMethods.GET,
  });
};

export const voteOnAnnouncementService = async (
  id: string,
  vote: 'HELPFUL' | 'UNHELPFUL',
) => {
  return makeRequest({
    url: `${urls.announcement.getAllAnnouncement}/${id}/vote?vote=${vote}`,
    method: HttpMethods.POST,
  });
};

export const CommentOnAnnouncementService = async (
  data: CommentCreateType,
  id: string,
) => {
  return makeRequest({
    url: `${urls.announcement.getAllAnnouncement}/${id}/comment`,
    method: HttpMethods.POST,
    data,
  });
};

export const getCommentsForAnnouncementService = async (id: string) => {
  return makeRequest({
    url: `${urls.announcement.getAllAnnouncement}/${id}/comments`,
    method: HttpMethods.GET,
  });
};
