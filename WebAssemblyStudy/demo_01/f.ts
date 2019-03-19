declare namespace window {
    export function alert(v: number): void;
}
function _f(x: number): number {
    if (x == 1 || x == 2) {
        return 1;
    }
    return _f(x - 1) + _f(x - 2)
} 
export function f(x: number): void {
    window.alert(_f(x));
}