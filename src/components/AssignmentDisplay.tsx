import React from 'react';
import { Button, Card, CardBody } from '@nextui-org/react';
import { FileText, Download } from 'lucide-react';
import { Assignment } from '../types';
import { utils, writeFile } from 'xlsx';

interface Props {
  assignments: Assignment[];
  onReset: () => void;
}

export const AssignmentDisplay: React.FC<Props> = ({ assignments, onReset }) => {
  const handleExportText = () => {
    const text = assignments
      .map(a => `${a.giver} → ${a.receiver}`)
      .join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'secret-santa-assignments.txt';
    link.href = url;
    link.click();
  };

  const handleExportExcel = () => {
    const ws = utils.json_to_sheet(assignments);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Assignments');
    writeFile(wb, 'secret-santa-assignments.xlsx');
  };

  return (
    <div className="p-4 md:p-8 w-full">
      <h1 className="font-lacquer text-2xl md:text-3xl text-center text-black mb-8">
        Here are the assignments
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {assignments.map((assignment, index) => (
          <Card key={index} className="backdrop-blur-sm bg-white/30">
            <CardBody className="text-center p-6">
              <p className="text-black text-xl mb-2 font-bold">{assignment.giver}</p>
              <p className="text-gray-800 text-sm mb-2">gives to</p>
              <p className="text-black text-xl font-bold">{assignment.receiver}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3 bg-white/80 p-4 rounded-full backdrop-blur-sm shadow-lg">
        <Button
          color="secondary"
          variant="flat"
          startContent={<FileText size={20} />}
          onClick={handleExportText}
        >
          Export as Text
        </Button>
        <Button
          color="success"
          variant="flat"
          startContent={<Download size={20} />}
          onClick={handleExportExcel}
        >
          Export as Excel
        </Button>
        <Button
          color="primary"
          variant="light"
          onClick={onReset}
        >
          Start Over
        </Button>
      </div>
    </div>
  );
};