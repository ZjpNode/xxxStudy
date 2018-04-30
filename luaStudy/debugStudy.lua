--
-- Created by IntelliJ IDEA.
-- User: Administrator
-- Date: 2017/1/5
-- Time: 9:43
-- To change this template use File | Settings | File Templates.
--
function myFunction()
    print(debug.traceback("Stack trace"));
    print(debug.getinfo(1));
    print("Stack trace end");
    return 10;
end
--myFunction();
--print(debug.getinfo(1));

function newCount()
    local n = 0;
    local k = 0;
    return function()
        k = n;
        n = n + 1;
        return n;
    end
end

count = newCount();
print(count());
print(count());
local i = 1;
repeat
    name, val = debug.getupvalue(count,i)
    if name then
        print("index",i,name,"=",val);
        if(name == "n") then
            debug.setupvalue(count,2,10);
        end
        i = i + 1;
    end
until not name
print(count());

print(collectgarbage("count"));
print(collectgarbage("collect"))
print(collectgarbage("count"))