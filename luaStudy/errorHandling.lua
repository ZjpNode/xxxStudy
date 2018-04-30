--
-- Created by IntelliJ IDEA.
-- User: Administrator
-- Date: 2017/1/5
-- Time: 8:37
-- To change this template use File | Settings | File Templates.
--
local function add(a,b)
    assert(type(a) == "number","a not a number");
    assert(type(b) == "number","b not a number");
    return a + b;
end

--add(10);

function myFunction(n)
    print("n before",n);
    n = n/nil;
    print("n after",n);
end

function myErrorHandler(err)
    print("Error: ",err);
end

status = xpcall(myFunction,myErrorHandler);