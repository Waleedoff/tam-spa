import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { TaskCard } from '../tasks-card';
import { Search } from 'lucide-react';
import {
  deleteTaskService,
  getAllTasksService,
  postCreateTaskService,
  putUpdateStatusTaskService,
  putUpdateTaskService,
} from 'src/services/https-service';
import { TaskCreateType } from 'src/core/types/user.type';
import TaskCreateForm from '../TaskForm';
import { Button } from '../../common/ui/Button';
import { taskCreateInitialValues } from '../task-create-form.data';

export default function TaskBoard() {
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [tasks, setTasks] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');

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

  const handleStatusChange = (taskId: string, newStatus: string) => {
    setTasks((prev: any) =>
      prev.map((task: any) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
    handleUpdateStatusTask(taskId, newStatus);
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
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleSubmit = async (data: TaskCreateType) => {
    try {
      await postCreateTaskService(data);
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

  return (
    <div className="min-h-screen space-x-5 space-y-6 bg-gray-50 px-4 py-10 md:pl-64">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="font-sans text-2xl text-tamPurple-tam">
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
              className="w-full max-w-xs rounded border px-3 py-2 transition-all"
            />
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="ml-0 text-tamPurple-tam hover:text-tamPurple-tam/80 sm:ml-4"
              title="Search tasks"
            >
              <Search className="absolute right-4 top-4 h-5 w-5 sm:static sm:ml-2" />
            </button>
          )}
        </h2>

        <div className="ml-0 text-tamPurple-tam hover:text-tamPurple-tam/80 sm:ml-4">
          <Button
            className="absolute left-4 top-4 w-auto bg-tamPurple-tam px-3 py-1 text-sm sm:static sm:ml-4"
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
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto md:grid md:snap-none md:grid-cols-3 md:overflow-visible">
          {columns.map((col) => {
            const filteredTasks = tasks.filter(
              (t: any) =>
                t.status === col.status &&
                t.title.toLowerCase().includes(searchQuery.toLowerCase()),
            );

            return (
              <div
                key={col.status}
                className="w-full shrink-0 snap-start md:w-auto md:snap-none"
              >
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
                      {filteredTasks.map((task: any, index: number) => (
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
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {filteredTasks.length === 0}
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
