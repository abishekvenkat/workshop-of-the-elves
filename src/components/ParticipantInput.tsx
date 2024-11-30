import React, { useState } from 'react';
import { Input, Button, Card, CardBody } from '@nextui-org/react';
import { Upload, UserPlus, X } from 'lucide-react';
import { read, utils } from 'xlsx';
import { Participant } from '../types';

interface Props {
  onParticipantsSubmit: (participants: Participant[]) => void;
}

export const ParticipantInput: React.FC<Props> = ({ onParticipantsSubmit }) => {
  const [participants, setParticipants] = useState<Participant[]>([{ name: '' }]);

  const handleAddParticipant = () => {
    setParticipants([...participants, { name: '' }]);
  };

  const handleRemoveParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleNameChange = (index: number, value: string) => {
    const updated = participants.map((p, i) => 
      i === index ? { ...p, name: value } : p
    );
    setParticipants(updated);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json<{ name: string }>(worksheet);
    
    setParticipants(jsonData.map(row => ({ name: row.name })));
  };

  const handleTextFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const names = text.split('\n').filter(name => name.trim());
    setParticipants(names.map(name => ({ name: name.trim() })));
  };

  const handleSubmit = () => {
    const validParticipants = participants.filter(p => p.name.trim());
    if (validParticipants.length >= 2) {
      onParticipantsSubmit(validParticipants);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardBody className="gap-4">
        <div className="space-y-4">
          {participants.map((participant, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={participant.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder="Enter participant name"
                className="flex-1"
              />
              {participants.length > 1 && (
                <Button
                  isIconOnly
                  color="danger"
                  variant="light"
                  onClick={() => handleRemoveParticipant(index)}
                >
                  <X size={20} />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            color="primary"
            variant="flat"
            onClick={handleAddParticipant}
            startContent={<UserPlus size={20} />}
          >
            Add Participant
          </Button>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <Button
            color="secondary"
            variant="flat"
            onClick={() => document.getElementById('file-upload')?.click()}
            startContent={<Upload size={20} />}
          >
            Upload Excel
          </Button>
          <input
            type="file"
            accept=".txt"
            onChange={handleTextFileUpload}
            className="hidden"
            id="text-file-upload"
          />
          <Button
            color="secondary"
            variant="flat"
            onClick={() => document.getElementById('text-file-upload')?.click()}
            startContent={<Upload size={20} />}
          >
            Upload Text
          </Button>
        </div>

        <Button
          color="success"
          onClick={handleSubmit}
          disabled={participants.filter(p => p.name.trim()).length < 2}
          className="w-full"
        >
          Generate Secret Santa Assignments
        </Button>
      </CardBody>
    </Card>
  );
};