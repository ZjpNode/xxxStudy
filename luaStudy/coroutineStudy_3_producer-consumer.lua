local newProduct;

function product()
    local i = 0;
    while true do
        i = i + 1;
        send(i);
    end
end

function consumer()
    while true do
        local i = receive();
        print(i);
    end
end

function send(i)
    coroutine.yield(i);
end

function receive()
    local i = coroutine.resume()
end