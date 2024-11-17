export enum AppLanguage {
  en = "en",
  es = "es",
  zhCN = "zh-CN",
}

export interface User {
  profileImageUrl?: string;
  name: string;
  preferredAppLanguage?: AppLanguage;
  email: string;
  id: number;
}

export type CreateUserInput = Omit<User, "id"> & { password: string };

export interface LoginInput {
  email: string;
  password: string;
}

export type ServiceFunction<InputT, OutputT> = InputT extends undefined
  ? () => Promise<[OutputT | null, Error | null]>
  : (inputs: InputT) => Promise<[OutputT | null, Error | null]>;

export type SetterFunction<T> = (value: T) => void;
