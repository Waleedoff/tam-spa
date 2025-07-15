const TamURL = process.env['REACT_APP_TAM_BACKEND_SERVICE_LINK'];

type URLs = {
  auth: {
    userRegister: string;
    login: string;
  };
  task: {
    getAllTasks: string;
    createTask: string;
    updateTask: string;
    updateStatusTask: (task_id: string) => string;
    getStatistics: string;
    getAllMembers: string;
  };
};

export const urls: URLs = {
  auth: {
    userRegister: `${TamURL}/auth/register`,
    login: `${TamURL}/auth/login`,
  },
  task: {
    getAllTasks: `${TamURL}/task`,
    createTask: `${TamURL}/task`,
    updateTask: `${TamURL}/task`,
    updateStatusTask: (task_id: string) => `${TamURL}/task/${task_id}/status`,
    getStatistics: `${TamURL}/task/statistics`,
    getAllMembers: `${TamURL}/auth/members`
  },
};
