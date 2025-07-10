import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { TaskCard } from './tasks-card';
import { Button } from '../Button';
import { Search } from 'lucide-react';
import {
  deleteTaskService,
  getAllTasksService,
  postCreateTaskService,
  putUpdateStatusTaskService,
  putUpdateTaskService,
} from 'src/services/example-service';
import { TaskCreateType } from 'src/core/types/user.type';
import { taskCreateInitialValues } from './task-create-form.data';
import TaskCreateForm from './TaskForm';
// import TaskEdit from "src/containers/user/tasks/TaskEdit";

export default function TaskBoard() {
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [tasks, setTasks] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');

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

  const fetchTasks = async () => {
    try {
      const result = await getAllTasksService(searchQuery);
      setTasks(result || []);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatusTask = async (id: string, status: string) => {
    try {
      await putUpdateStatusTaskService(id, status);
      fetchTasks();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  // This is what updates the task's status when dragged between columns
  const handleStatusChange = (taskId: string, newStatus: string) => {
    setTasks((prev: any) =>
      prev.map((task: any) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
    handleUpdateStatusTask(taskId, newStatus);

    // Optionally: Send updated status to your backend here
    // await updateTaskStatus(taskId, newStatus);
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;
    handleStatusChange(draggableId, destination.droppableId);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await deleteTaskService(id);
      console.log('Task deleted:', id);
      fetchTasks();
      fetchTasks();
      // Optionally: refresh tasks or update local state
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleSubmit = async (data: TaskCreateType) => {
    try {
      await postCreateTaskService(data);
      console.log(data);
      fetchTasks();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleEdit = async (id: string, data: TaskCreateType) => {
    try {
      await putUpdateTaskService(id, data);
      fetchTasks();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [searchQuery]);

  if (loading) {
    return <div>Loading ... </div>;
  }
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
            <TaskCreateForm
              onSubmit={async (values) => {
                await handleSubmit(values);
                setShowModal(false);
              }}
              onClose={() => setShowModal(false)}
              data={taskCreateInitialValues}
              title={'Create Task'}
            />
          </div>
        </div>
      )}

      {/* Task Columns */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {columns.map((col) => {
            const filteredTasks = tasks.filter(
              (t: any) =>
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
                      {filteredTasks.map((task: any, index: any) => (
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
                                onEdit={() => {
                                  setId(task.id);
                                  setShowModalEdit(true);
                                }}
                                data={task}
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
      {showModalEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="w-full max-w-md rounded-xl bg-white shadow-lg">
            <TaskCreateForm
              onSubmit={async (updatedData) => {
                await handleEdit(id, updatedData);
                setShowModalEdit(false);
              }}
              onClose={() => setShowModalEdit(false)}
              data={tasks.find((t: any) => t.id === id)}
              title={'Edit Task'}
            />
          </div>
        </div>
      )}
    </div>
  );
}
