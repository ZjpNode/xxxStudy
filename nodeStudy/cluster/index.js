const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;  //获取cpu数量

if (cluster.isMaster) {
  console.log(`Master is running`);
  console.log(`Master cluster setting up ${numCPUs} workers...`);
  for (let i = 0; i < numCPUs; i++) {
    let worker = cluster.fork();
    worker.send('hi there');  //  该方法用于在主进程中，向子进程发送信息。
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.id}(${worker.process.pid}) died`);
    console.log(`Starting a new worker ${worker.id}(${worker.process.pid})`);
    cluster.fork();
  });

  cluster.on('online', function (worker) {
    console.log(`Worker ${worker.id}(${worker.process.pid})is online`);
  });

} else if (cluster.isWorker) {

  process.on('message', function(msg) {
    console.log(msg);
    // process.send(msg);
  });

  http.createServer((req, res) => {
    console.log(`Worker ${process.pid} run...`);
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

}
