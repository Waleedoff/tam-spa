import * as Yup from 'yup';

export const CreateAnnouncementValidationSchema = Yup.object({
  title: Yup.string().required('العنوان مطلوب'),
  content: Yup.string().required('المحتوى مطلوب'),
  media_url: Yup.string().url().optional(),
  target_roles: Yup.array().of(Yup.string()).optional(),
  target_departments: Yup.array().of(Yup.string()).optional(),
});
