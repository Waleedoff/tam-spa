import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { TaskCard } from './tasks-card';
import { Button } from '../Button';
import { Search } from 'lucide-react';
import TaskCreate from 'src/containers/user/tasks/TaskCreate';
import { deleteTaskService } from 'src/services/example-service';
// import TaskEdit from "src/containers/user/tasks/TaskEdit";

interface TaskType {
  id: string;
  title: string;
  desription?: string;
  status: string;
  priority: string;
  commentsCount?: number;
  people?: string[];
}

interface TaskBoardProps {
  tasks: TaskType[];
  onStatusChange: (taskId: string, newStatus: string) => void;
}


export default function TaskBoard({ tasks, onStatusChange }: TaskBoardProps) {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
//   const [editingTask, setEditingTask] = useState<TaskType | null>(null);


  const columns = [
    {
      title: 'Pending',
      status: 'PENDING',
      color: 'border-purple-500',
    },
    {
      title: 'In Progress',
      status: 'IN_PROGRESS',
      color: 'border-blue-500',
    },
    {
      title: 'Completed',
      status: 'COMPLETED',
      color: 'border-green-500',
    },
  ];

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;
    onStatusChange(draggableId, destination.droppableId);
  };


  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
  
    try {
      await deleteTaskService(id);
      console.log("Task deleted:", id);
      window.location.reload();
      // Optionally: refresh tasks or update local state
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

//   const handleEdit = (task: TaskType) => {
//     setEditingTask(task);
//   };
  return (
    <div className="min-h-screen space-x-8 bg-gray-50 px-6 py-10 pl-64">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h2 className="ml-6 font-sans text-3xl font-bold text-tamPurple-tam">
          {showSearch ? (
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => {
                if (!searchQuery) setShowSearch(false);
              }}
              autoFocus
              className="w-64 rounded border px-3 py-2 transition-all"
            />
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="text-tamPurple-tam hover:text-tamPurple-tam/80"
              title="Search tasks"
            >
              <Search className="h-5 w-5" />
            </button>
          )}
        </h2>

        <div className="flex w-full items-center justify-between gap-3 md:w-auto">
          <div className="flex items-center gap-2"></div>

          <Button
            className="bg-tamPurple-tam"
            onClick={() => setShowModal(true)}
          >
            + New Task
          </Button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="w-full max-w-md rounded-xl bg-white shadow-lg">
            <TaskCreate
              onSuccess={() => {
                setShowModal(false);
              }}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}

      
      

      {/* Task Columns */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {columns.map((col) => {
            const filteredTasks = tasks.filter(
              (t) =>
                t.status === col.status &&
                t.title.toLowerCase().includes(searchQuery.toLowerCase()),
            );

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
                      {filteredTasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                              onDelete={handleDelete}
                                id={task.id}
                                title={task.title}
                                desription={task.desription}
                                priority={task.priority}
                                status={task.status}
                                commentsCount={task.commentsCount}
                                people={task.people}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {filteredTasks.length === 0 && (
                        <div className="text-sm italic text-gray-400">
                          No tasks
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
