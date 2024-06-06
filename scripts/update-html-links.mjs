import fs from 'fs';
import path from 'path';

const filePath = path.join('deploy', 'prod', 'index.html');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  // Regular expressions to match non-minified .mjs and .css files
  const jsRegex = /\.mjs(?!.*\.min\.mjs)/g;
  const cssRegex = /\.css(?!.*\.min\.css)/g;

  // Replace matches with .min.mjs and .min.css respectively
  let result = data.replace(jsRegex, '.min.mjs')
    .replace(cssRegex, '.min.css');

  fs.writeFile(filePath, result, 'utf8', (err) => {
    if (err) return console.log(err);
    console.log('index.html links updated for production.');
  });
});
