export type TapsModel = {
  id: number;
  title: string;
  content?: string;
  notification?: boolean;
};

export type StepperProps = {
  title: string;
  desription: string;
};

export type UserLoginType = {
  username: string;
  password: string;
};

export type TaskCreateType = {
  id: string;
  title: string;
  desription: string;
  priority: string;
};

export type TaskEditType = TaskCreateType & {
  id: string;
};

export type UserRegiterType = {
  id: string;
  full_name: string;
  username: string;
  password: string;
  email: string;
  gender: string;
  specialization: string;
};

export type ParsedTokenType = {
  sub: string;
};

export type RecentTask = {
  task: string;
  status: string;
};

export type TaskStatistics = {
  pending_count: number;
  in_progress: number;
  completed: number;
  recent_tasks: RecentTask[];
};
