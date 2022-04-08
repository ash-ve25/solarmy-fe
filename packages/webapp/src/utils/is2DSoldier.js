export function is2DSoldier(data) {
    const {name, symbol} = data
 
    const regExp = new RegExp(/(2D|2d)/, 'g');
    const symbols = ['SLDR2D'];
    
    return symbols.includes(symbol) || regExp.test(name);
}
