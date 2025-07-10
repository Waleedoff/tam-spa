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
  full_name: string;
  username: string;
  password: string;
  email: string;
};

export type ParsedTokenType = {
  sub: string;
};
