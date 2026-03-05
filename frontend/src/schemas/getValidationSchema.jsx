/* eslint-disable */
import * as yup from 'yup';

export const channelSchema = (existingChannels, t) =>
  yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, t('errors.minMax'))
      .max(20, t('errors.minMax'))
      .required(t('errors.required'))
      .notOneOf(existingChannels, t('errors.unique')),
  });

export const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const getSignupSchema = (t) =>
  yup.object().shape({
    username: yup
      .string()
      .trim()
      .required(t('errors.required'))
      .min(3, t('errors.minMax'))
      .max(20, t('errors.minMax')),
    password: yup.string().trim().required(t('errors.required')).min(6, t('errors.min')),
    confirmPassword: yup
      .string()
      .trim()
      .required(t('errors.required'))
      .oneOf([yup.ref('password')], t('errors.mustMatch')),
  });
