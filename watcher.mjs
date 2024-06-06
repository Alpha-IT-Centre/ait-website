import { exec } from 'child_process';
import chokidar from 'chokidar';

let debounceTimeout;

const watcher = chokidar.watch('src/', {
  ignored: /node_modules/,
  persistent: true,
});

const runBuildScript = () => {
  console.log("Rebuilding...");

  exec('sh build.sh', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing build script: ${stderr}`);
    } else {
      console.log(stdout);
    }
  });

}

watcher.on('change', (path) => {
  console.log(`File ${path} has been changed. Rebuilding...`);
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(runBuildScript, 300);
});
console.log('Watching for changes...');

