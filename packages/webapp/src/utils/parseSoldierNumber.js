export function parseSoldierNumber(text = '') {
    return text.split(' ').pop().replace('#', '');
}
