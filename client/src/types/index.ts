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

// Type for BookQueue
export interface BookQueue {
  id: number;
  userId: number;
  bookName: string;
  bookAuthor?: string; // Optional field
  exchangeLocation?: string; // Optional field
  status: string; // e.g., "pending", "accepted", "completed"
  acceptedUser?: string; // Optional field
  from?: Date; // Optional field for the start date
  to?: Date; // Optional field for the end date
  start: Date;

  // Relationships
  user: User; // User associated with the BookQueue
  BookRequests: BookRequests[]; // Array of BookRequests related to this BookQueue
}

// Type for BookRequests
export interface BookRequests {
  id: number;
  fromUserId: number;
  bookQueueId: number;

  // Relationships
  fromUser: User; // User who requested the book exchange
  bookQueue: BookQueue; // The BookQueue related to this request
}
