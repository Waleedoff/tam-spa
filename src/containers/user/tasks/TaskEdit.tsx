// import { useFormik } from "formik";
// import { putUpdateTaskService } from "src/services/example-service";
// import { TaskCreateType } from "src/core/types/user.type";
// import TaskForm from "src/components/common/tasks/TaskForm"; // أو أي form مشابه

// interface TaskEditProps {
//   task: TaskCreateType;
//   onSuccess: () => void;
//   onClose: () => void;
// }

// export default function TaskEdit({ task, onSuccess, onClose }: TaskEditProps) {
//   const formik = useFormik<TaskCreateType>({
//     initialValues: {
//       id: task.id,
//       title: task.title,
//       desription: task.desription || "",
//       priority: task.priority,
//     },
//     onSubmit: async (values) => {
//       try {
//         await putUpdateTaskService(task.id, values);
//         onSuccess();
//       } catch (err) {
//         console.error("Failed to update task", err);
//       }
//     },
//   });

//   return (
//     <TaskForm
//       formik={formik}
//       onCancel={onClose}
//       submitLabel="Update Task"
//     />
//   );
// }
