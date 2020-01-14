function run(cb, args) {
  const blobUrl = new Blob(
    [
      `var args = ${JSON.stringify(
        args
      )};postMessage((${cb.toString()}).apply(null, args))`
    ],
    { type: "text/javascript" }
  );
  const worker = new Worker(URL.createObjectURL(blobUrl));

  return new Promise(resolve => {
    worker.onmessage = function(event) {
      resolve(event.data);
    };
  });
}

function worker(cb) {
  return (...args) => run(cb, args);
}

const sayHelloFromWebWorker = worker(name => {
  return `Hello ${name}`;
});

async function init() {
  const result = await sayHelloFromWebWorker("World");
  console.log("result", result);
}

init();
