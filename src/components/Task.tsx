import React from 'react';
import Dropdown from './Dropdown';

interface TaskProps {
  task: {
    id: string;
    title: string;
    description: string;
    date: string;
    status: "TODO" | "IN_PROGRESS" | "COMPLETED";
    priority: "HIGH" | "MEDIUM" | "LOW";
  };
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: "TODO" | "IN_PROGRESS" | "COMPLETED") => void;
}

const priorityColors: { [key in TaskProps['task']['priority']]: string } = {
  HIGH: 'bg-red-500',
  MEDIUM: 'bg-yellow-500',
  LOW: 'bg-green-500',
};

const Task: React.FC<TaskProps> = ({ task, onDelete, onStatusChange }) => {
  const handleStatusSelect = (status: "TODO" | "IN_PROGRESS" | "COMPLETED") => {
    if (status !== 'Change Status') {
      onStatusChange(task.id, status);
    }
  };

  return (
    <div className="relative flex flex-col bg-white border border-grey-200 rounded-lg shadow-lg mb-4 p-9">
      <div
        className={`absolute top-2 left-3 px-2 py-1 text-xs font-semibold text-white ${priorityColors[task.priority]} rounded-full`}
      >
        {task.priority}
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>

        <hr className="my-4 border-gray-300" />

        <div className="flex items-center space-x-2 text-gray-500">
          <svg
            className="w-4 h-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-6 8h6m-6 4h6M4 8h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V10a2 2 0 012-2z" />
          </svg>
          <span>{task.date}</span>

          <button
            onClick={() => onDelete(task.id)}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="absolute top-2 right-2 flex items-center space-x-2">
        <Dropdown
          options={['TODO', 'IN_PROGRESS', 'COMPLETED']}
          selectedOption={task.status}
          onSelect={handleStatusSelect}
        />
      </div>
    </div>
  );
};

export default Task;
