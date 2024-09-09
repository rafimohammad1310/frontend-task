'use client';

import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import TaskForm from './TaskForm';
import Task from './Task';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Define a type for the task object
interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  priority: string;
}

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (querySnapshot) => {
      const tasksList: Task[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as Task }));
      setTasks(tasksList);
    });
    return () => unsubscribe();
  }, []);

  const handleAddTask = async (task: Task) => {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), task);
      setTasks(prevTasks => [...prevTasks, { id: docRef.id, ...task }]);
    } catch (error) {
      console.error('Error adding task: ', error);
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: 'TODO' | 'IN_PROGRESS' | 'COMPLETED') => {
    try {
      await updateDoc(doc(db, 'tasks', taskId), { status: newStatus });
      setTasks(prevTasks => 
        prevTasks.map(task =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error('Error updating task status: ', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  };

  const onDragEnd = async (result:  DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId !== source.droppableId) {
      const newStatus = destination.droppableId as 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
      await handleStatusChange(draggableId, newStatus);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board flex space-x-4">
        <Droppable droppableId="TODO">
          {(provided) => (
            <div
              className="column w-1/3 rounded-lg border border-gray-300"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="bg-blue-200 p-2 rounded-t-lg text-gray-800 font-bold">TODO</div>
              <div className="task-container bg-white p-4 rounded-b-lg">
                {tasks.filter(task => task.status === 'TODO').map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task 
                          task={task} 
                          onDelete={handleDeleteTask} 
                          onStatusChange={handleStatusChange} 
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>

        <Droppable droppableId="IN_PROGRESS">
          {(provided) => (
            <div
              className="column w-1/3 rounded-lg border border-gray-300"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="bg-yellow-300 p-2 rounded-t-lg text-gray-800 font-bold">IN PROGRESS</div>
              <div className="task-container bg-white p-4 rounded-b-lg">
                {tasks.filter(task => task.status === 'IN_PROGRESS').map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task 
                          task={task} 
                          onDelete={handleDeleteTask} 
                          onStatusChange={handleStatusChange} 
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>

        <Droppable droppableId="COMPLETED">
          {(provided) => (
            <div
              className="column w-1/3 rounded-lg border border-gray-300"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="bg-green-300 p-2 rounded-t-lg text-gray-800 font-bold">COMPLETED</div>
              <div className="task-container bg-white p-4 rounded-b-lg">
                {tasks.filter(task => task.status === 'COMPLETED').map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task 
                          task={task} 
                          onDelete={handleDeleteTask} 
                          onStatusChange={handleStatusChange} 
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Add Task
      </button>

      {showForm && <TaskForm onAddTask={handleAddTask} onClose={() => setShowForm(false)} />}
    </DragDropContext>
  );
};

export default KanbanBoard;

