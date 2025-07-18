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
    getTasksByUserId: (user_id: string) => string;
  };
  announcement: {
    createAnnouncement: string;
    getAllAnnouncement: string;
  }

  department: {
    getDepartments: string;
  }
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
    getAllMembers: `${TamURL}/auth/members`,
    getTasksByUserId: (user_id: string) => `${TamURL}/task/${user_id}/tasks`
  },
  announcement: {
    createAnnouncement: `${TamURL}/announcement`,
    getAllAnnouncement: `${TamURL}/announcement`
  },
  department: {
    getDepartments: `${TamURL}/organization/departments`,
  }
};
