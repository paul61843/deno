export function getToday(date = '', format = '') {
    const newDate = date ? new Date(date) : new Date();
    const dd = String(newDate.getDate()).padStart(2, '0');
    const mm = String(newDate.getMonth() + 1).padStart(2, '0');
    const yyyy = newDate.getFullYear();

    return `${yyyy}${mm}${dd}`;
}