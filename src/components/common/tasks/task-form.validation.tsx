// src/components/tasks/task-create-form/task-create-form.validation.ts
import * as Yup from 'yup';

export const taskCreateValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  desription: Yup.string(),
  priority: Yup.string()
    .oneOf(['LOW', 'MEDIUM', 'HIGH'])
    .required('Priority is required'),
});
