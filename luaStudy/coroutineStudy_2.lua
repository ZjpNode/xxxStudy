function foo(a)
    print("foo Function output:",a);
    return coroutine.yield(2 * a);
end

co = coroutine.create(
    function(a,b)
        print("first second Function output:",a,b);
        local r = foo(a + 1);
        print("second coroutine Function output:",r);
        local r,s = coroutine.yield(a + b, a - b);
        print("third coroutine Function output:",r,s);
        return b,"second over";
    end
)

print(coroutine.resume(co,1,10));
print("-----------------------");
print(coroutine.resume(co,"r"));
print("-----------------------");
print(coroutine.resume(co,"x","y"));
print("-----------------------");
print(coroutine.resume(co,"x","y"));
print("-----------------------");