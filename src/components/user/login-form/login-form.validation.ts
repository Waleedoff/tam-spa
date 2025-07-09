import { t } from 'i18next';
import * as Yup from 'yup';
export const loginValidationSchema = () =>
  Yup.object().shape({
    username: Yup.string()
      .trim()
      .required(t('form.validation.email.required') ?? ''),
    password: Yup.string()
      .trim()
      .required(t('form.validation.password.required') ?? ''),
  });