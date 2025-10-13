const TamURL = process.env['REACT_APP_TAM_BACKEND_SERVICE_LINK'];

type URLs = {
  auth: {
    userRegister: string;
    login: string;
  };
  task: {
    getAllTasks: string;
    getWorkspaceTasks: string;
    createTask: string;
    updateTask: string;
    updateStatusTask: (task_id: string) => string;
    getStatistics: string;
    getAllMembers: string;
    getTasksByUserId: (user_id: string) => string;
    langChain: string;
  };
  announcement: {
    createAnnouncement: string;
    getAllAnnouncement: string;
  };

  room: {
    getAllRooms: string;
    getRoomMembers: (room_id: string) => string;
    getRoomTasks: (room_id: string) => string;
    getChatTasks: (room_id: string) => string;
  };

  department: {
    getDepartments: string;
  };
};

export const urls: URLs = {
  auth: {
    userRegister: `${TamURL}/auth/register`,
    login: `${TamURL}/auth/login`,
  },
  task: {
    getAllTasks: `${TamURL}/task`,
    getWorkspaceTasks: `${TamURL}/task/workspace`,
    createTask: `${TamURL}/task`,
    updateTask: `${TamURL}/task`,
    updateStatusTask: (task_id: string) => `${TamURL}/task/${task_id}/status`,
    getStatistics: `${TamURL}/task/statistics`,
    getAllMembers: `${TamURL}/auth/members`,
    getTasksByUserId: (user_id: string) => `${TamURL}/task/${user_id}/tasks`,
    langChain:  `${TamURL}/task/langchain-query`,

  },
  announcement: {
    createAnnouncement: `${TamURL}/announcement`,
    getAllAnnouncement: `${TamURL}/announcement`,
  },
  department: {
    getDepartments: `${TamURL}/organization/departments`,
  },
  room: {
    getAllRooms: `${TamURL}/room/me`,
    getRoomMembers: (room_id: string) => `${TamURL}/room/members/${room_id}`,
    getRoomTasks: (room_id: string) => `${TamURL}/room/tasks/${room_id}`,
    getChatTasks: (room_id: string) => `${TamURL}/chat/${room_id}`
  }
};


