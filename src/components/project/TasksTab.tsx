// src/components/project/TasksTab.tsx
import { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useRoomTasksStore } from 'src/core/stores/roomTasksStore';
import { useAuthStore } from 'src/core/stores/authStore';
import { putUpdateTaskService } from 'src/services/https-service';
import { decodeToken } from 'src/utils';

interface Props {
  roomId: string;
}

const columns = [
  { title: 'Pending', status: 'PENDING', color: 'border-purple-500' },
  { title: 'In Progress', status: 'IN_PROGRESS', color: 'border-blue-500' },
  { title: 'Completed', status: 'COMPLETED', color: 'border-green-500' },
];

export default function TasksTab({ roomId }: Props) {
  const { user } = useAuthStore();
  const { tasks, fetchRoomTasks, setTasks } = useRoomTasksStore();

  const token = localStorage.getItem('token');
  const decoded = decodeToken(token || '');
  const currentUserId = decoded?.id || '';

  useEffect(() => {
    fetchRoomTasks(roomId);
  }, [roomId]);

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const task = tasks.find((t) => t.id === draggableId);
    if (!task || task.user_info.id !== user?.id) return;

    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, status: destination.droppableId } : t,
    );
    setTasks(updatedTasks);
    await putUpdateTaskService(task.id, destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {columns.map((col) => {
          const columnTasks = tasks.filter((t) => t.status === col.status);

          return (
            <div key={col.status}>
              <h3
                className={`mb-4 border-b-2 pb-1 text-lg font-semibold ${col.color}`}
              >
                {col.title}
              </h3>

              <Droppable droppableId={col.status}>
                {(provided) => (
                  <div
                    className="min-h-[200px] space-y-4"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {columnTasks.map((task, index) => {
                      const isMine = task.user_info.id === currentUserId;

                      return (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                          isDragDisabled={!isMine}
                        >
                          {(provided) => (
                            <div
                              className={`relative w-full rounded-xl border p-4 shadow transition-all duration-300 ease-in-out ${
                                isMine
                                  ? 'border-blue-400 bg-blue-50 hover:scale-[1.01] hover:shadow-xl'
                                  : 'bg-white'
                              }`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {/* My Task badge */}
                              {isMine && (
                                <span className="top-1/1 absolute left-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                                  My Task
                                </span>
                              )}

                              <h4 className="text-base font-semibold text-gray-800">
                                {task.title}
                              </h4>
                              <p className="mt-1 text-sm text-gray-500">
                                {task.desription || 'No description'}
                              </p>

                              {/* Assignee info */}
                              <div className="mt-3 flex justify-between text-xs text-gray-600">
                                <span>
                                  {isMine ? '🧍 ' : ''}
                                  {task.user_info.full_name}
                                </span>
                                <span>
                                  {task.user_info.department.toLowerCase()}
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
