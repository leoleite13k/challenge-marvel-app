import { format } from 'date-fns';

export const removeHTML = (message: string | undefined): string | undefined => {
  const regex = /(<([^>]+)>)/gi;

  return message ? message.replace(regex, '') : undefined;
};

export const formatDate = (date: Date | string | number): string => {
  return format(new Date(date), 'MMMM dd, yyyy');
};
