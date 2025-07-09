import { t } from 'i18next';
import * as Yup from 'yup';

export const registerValidationSchema = () =>
  Yup.object().shape({
    full_name: Yup.string()
      .trim()
      .required(t('form.validation.full_name.required') ?? ''),
    
    username: Yup.string()
      .trim()
      .required(t('form.validation.username.required') ?? ''),
    
    email: Yup.string()
      .trim()
      .email(t('form.validation.email.invalid') ?? '')
      .required(t('form.validation.email.required') ?? ''),
    
    password: Yup.string()
      .trim()
      .required(t('form.validation.password.required') ?? ''),
  });
