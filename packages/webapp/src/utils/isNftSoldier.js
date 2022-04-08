export function isNftSoldier(data) {
    const {name, symbol} = data
 
    const regExp = new RegExp(/(2D|3D|2d|3d) SOLDIER/, 'g');
    const symbols = ['SLDR3D', 'SLDR2D'];
    
    return symbols.includes(symbol) || regExp.test(name);
}
