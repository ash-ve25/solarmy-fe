import moment from 'moment';

export function formatDate(date) {
    return moment(date).format('MMMM DD, yy')
}
