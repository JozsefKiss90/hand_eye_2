const url = require('url');

const myUrl = new URL('http://website.com/hello.html?id=100&status=active');

console.log(myUrl.href);

console.log(myUrl.host);

console.log(myUrl.pathname);

myUrl.searchParams.append('abc', '123');

console.log(myUrl.href);
