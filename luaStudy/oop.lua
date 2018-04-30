--
-- Created by IntelliJ IDEA.
-- User: Administrator
-- Date: 2017/1/5
-- Time: 10:05
-- To change this template use File | Settings | File Templates.
--
-- Meta class
Shape = {area = 0}

-- 基础类方法 new
function Shape:newss (o,side)
    o = o or {}
    setmetatable(o, self)
    self.__index = self
    side = side or 0
    self.area = side*side;
    return o
end

-- 基础类方法 printArea
function Shape:printArea ()
    print("面积为 ",self.area)
end

-- 创建对象
myshape = Shape:newss(nil,10)
myshape:printArea()

------------------继承----------------------
Square = Shape:newss();
function Square:newss (o,side) --Square 对象继承了 Shape 类
    o = o or Shape:newss(o,side)
    setmetatable(o, self)
    self.__index = self
    return o
end
function Square:printArea()
    print("正方形面积为 ",self.area)
end
mysquare = Square:newss(nil,10)
mysquare:printArea()
------------------继承----------------------
Rectangle = Shape:newss();
function Rectangle:newss(o,length,breadth)
    o = o or Shape:newss(o)
    setmetatable(o, self)
    self.__index = self
    self.area = length * breadth
    return o
end
function Rectangle:printArea()
    print("矩形面积为 ",self.area)
end
myrectangle = Rectangle:newss(nil,10,20)
myrectangle:printArea()
----------------------------------------