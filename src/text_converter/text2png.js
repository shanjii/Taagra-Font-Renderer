var text2png = require('text2png');

export function imageConverter(){
    var image = text2png('Hello!', { color: 'blue' })
    return image
}
