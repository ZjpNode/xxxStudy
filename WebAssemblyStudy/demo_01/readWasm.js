import { asModule, setASModuleExports, getString } from "../js/as-utils.js";
function f2(x) {
  if (x === 1 || x === 2) {
    return 1;
  }
  return f2(x - 1) + f2(x - 2);
}
function add2(x1, x2) {
  return x1 + x2;
}
fetch("f.wasm") // 网络加载 f.wasm 文件
  .then(res => res.arrayBuffer()) // 转成 ArrayBuffer
  .then(bytes => {
    const importObj = {
      fs: {
        alert: window.alert,
        "window.log": msgPtr => {
          console.log(`WASM >> ${getString(asModule, msgPtr)}`);
        },
        log: msgPtr => {
          console.log(`WASM >> ${msgPtr}`);
        }
      } // 必须要有fs开头（即fs.ts的文件名称）
    };
    WebAssembly.instantiate(bytes, importObj)
      .then(mod => {
        // let { f } = mod.instance.exports;
        const { exports } = mod.instance;
        setASModuleExports(exports);
        let { f, add } = exports;
        console.log("js  0.1 + 0.2 = ", add2(0.1, 0.2));
        console.log("ass 0.1 + 0.2 = ", add(0.1, 0.2));
        console.time("time f2");
        console.log("f2 ", f2(5));
        console.timeEnd("time f2");
        console.time("time f");
        // 调用模块实例上的 f 函数计算
        console.log("f ", f(5));
        console.timeEnd("time f");
      })
      .catch(err => {
        console.log(err);
      });
  });
