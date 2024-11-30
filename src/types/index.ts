export interface Participant {
  name: string;
  assignedTo?: string;
}

export interface Assignment {
  giver: string;
  receiver: string;
}