import moment from 'moment';

export const formatDateTime = (date) => {
    return moment(date).format('Do MMMM')
}

export const lastActiveTime = (date) => {
    return moment(date).fromNow()
}