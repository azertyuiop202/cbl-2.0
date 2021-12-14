import moment from 'moment';

export const formatDate = (date) => moment(date).format('Y-M-d');
export const formatDateTime = (date) => moment(date).format('Y-M-d H:m:s');