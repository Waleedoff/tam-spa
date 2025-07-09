import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import { TaskCard } from "./tasks-card";
import { Button } from "../Button";
import { Search } from "lucide-react";
import TaskCreate from "src/containers/user/tasks/TaskCreate";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const columns = [
    {
      title: "Pending",
      status: "PENDING",
      color: "border-purple-500",
    },
    {
      title: "In Progress",
      status: "IN_PROGRESS",
      color: "border-blue-500",
    },
    {
      title: "Completed",
      status: "COMPLETED",
      color: "border-green-500",
    },
  ];

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;
    onStatusChange(draggableId, destination.droppableId);
  };

  return (
    <div className="space-x-8 min-h-screen pl-64 bg-gray-50 py-10 px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold font-sans text-tamPurple-tam">
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
                className="border px-3 py-2 rounded w-64 transition-all"
              />
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="text-tamPurple-tam hover:text-tamPurple-tam/80"
                title="Search tasks"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
        </h2>

        <div className="flex justify-between w-full md:w-auto items-center gap-3">
          <div className="flex items-center gap-2">
        
          </div>

          <Button className="bg-tamPurple-tam" onClick={() => setShowModal(true)}>
            + New Task
          </Button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col) => {
            const filteredTasks = tasks.filter(
              (t) =>
                t.status === col.status &&
                t.title.toLowerCase().includes(searchQuery.toLowerCase())
            );

            return (
              <div key={col.status}>
                <h3 className={`text-lg font-semibold mb-4 pb-1 border-b-2 ${col.color}`}>
                  {col.title}
                </h3>
                
                <Droppable droppableId={col.status}>
                  {(provided) => (
                    <div
                      className="space-y-4 min-h-[200px]"
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
                                // id={task.id}
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
                        <div className="text-sm text-gray-400 italic">No tasks</div>
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
