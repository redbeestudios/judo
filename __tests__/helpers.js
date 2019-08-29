global.noIndent = function (str) {
    return str[0].replace(/\n(\t)*/g, '\n').replace(/\n(\s)*/g, '\n');
};