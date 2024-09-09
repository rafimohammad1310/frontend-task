import React from 'react';
import KanbanBoard from 'src/components/KanbanBoard';

const Page: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <KanbanBoard />
    </div>
  );
};

export default Page;
