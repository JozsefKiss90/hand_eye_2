const fs = require('fs');
const path = require('path');

/*fs.mkdir(path.join(__dirname, '/test'), {}, err => {
    if(err) throw err;
    console.log('folder created')
});

fs.writeFile(path.join(__dirname, '/test', 'hello.txt'), 'hello world', err => {
    if(err) throw err;
    console.log('file written to')

    fs.appendFile(path.join(__dirname, '/test', 'hello.txt'), 'love node', err => {
        if(err) throw err;
        console.log('file written to')
    });
    
});*/

fs.readFile(path.join(__dirname, '/test', 'hello.txt'), 'utf8', (err, data) => {
    if(err) throw err;
    console.log(data)
});



