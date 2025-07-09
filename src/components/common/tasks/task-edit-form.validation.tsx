import * as Yup from "yup";

export const taskEditValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  desription: Yup.string(),
  priority: Yup.string().required("Priority is required"),
});
