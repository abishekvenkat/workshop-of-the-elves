import { Participant, Assignment } from '../types';

export const assignSecretSantas = (participants: Participant[]): Assignment[] => {
  const shuffled = [...participants].sort(() => Math.random() - 0.5);
  const assignments: Assignment[] = [];

  for (let i = 0; i < shuffled.length; i++) {
    const giver = shuffled[i].name;
    const receiver = shuffled[(i + 1) % shuffled.length].name;
    assignments.push({ giver, receiver });
  }

  return assignments;
};

export const validateAssignments = (assignments: Assignment[]): boolean => {
  const givers = new Set(assignments.map(a => a.giver));
  const receivers = new Set(assignments.map(a => a.receiver));
  
  return (
    givers.size === assignments.length &&
    receivers.size === assignments.length &&
    !assignments.some(a => a.giver === a.receiver)
  );
};