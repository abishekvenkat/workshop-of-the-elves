import { useState } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { CandyCane,GiftIcon } from 'lucide-react';
import { ParticipantInput } from './components/ParticipantInput';
import { AssignmentDisplay } from './components/AssignmentDisplay';
import { Assignment, Participant } from './types';
import { assignSecretSantas, validateAssignments } from './utils/secretSanta';

function App() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const handleParticipantsSubmit = (participants: Participant[]) => {
    let validAssignments: Assignment[] = [];
    do {
      validAssignments = assignSecretSantas(participants);
    } while (!validateAssignments(validAssignments));
    
    setAssignments(validAssignments);
  };

  const handleReset = () => {
    setAssignments([]);
  };

  return (
    <NextUIProvider>
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <GiftIcon className="w-8 h-8 text-red-500" />
              <h1 className="text-4xl font-bold text-white"
               style={{ fontFamily: 'Lacquer, cursive', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                Workshop of the Elves
              </h1>
              <CandyCane className="w-8 h-8 text-green-500" />
            </div>
            <p className="font-lacquer text-gray-800">
              Your magical Secret Santa assignment generator
            </p>
          </div>

          <div className="flex justify-center">
            {assignments.length === 0 ? (
              <ParticipantInput onParticipantsSubmit={handleParticipantsSubmit} />
            ) : (
              <AssignmentDisplay
                assignments={assignments}
                onReset={handleReset}
              />
            )}
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            No data is stored with us. Use freely!
          </p>
        </div>
      </div>
    </NextUIProvider>
  );
}

export default App;