import moment from 'moment';

export const formatTime = (date) => {
    return moment(date).format('hh:mm A')
}
