declare namespace window {
  export function log(s: string): void;
}
declare function log(s: number): void;
declare function alert(s: number): void;

function _f(x: number): number {
  if (x == 1 || x == 2) {
    return 1;
  }
  return _f(x - 1) + _f(x - 2);
}

export function f(x: number): number {
  let xx = _f(x);
  window.log("zjp郑");
  log(xx);
  return xx;
  // alert(x);
}
export function add(x: f64, y: f64): f64 {
  return x + y;
}
