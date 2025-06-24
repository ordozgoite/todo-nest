export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export class Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  status: TaskStatus;
  createdAt: Date;
}
