--
-- Created by IntelliJ IDEA.
-- User: Administrator
-- Date: 2017/1/3
-- Time: 17:56
-- To change this template use File | Settings | File Templates.
--
require "luasql.mysql"

--创建环境对象
env = luasql.mysql()

--连接数据库
conn = env:connect("hz_regplf","hcjiaban","pws1214","183.63.6.116",3306)

--设置数据库的编码格式
conn:execute"SET NAMES UTF8"

--执行数据库操作
cur = conn:execute("select * from sys_menu")

row = cur:fetch({},"a")

--文件对象的创建
file = io.open("sys_menu.txt","w+");

while row do
    var = string.format("%s %s\n", row.MENU_URL, row.MENU_NAME)

    print(var)

    file:write(var)

    row = cur:fetch(row,"a")
end


file:close()  --关闭文件对象
conn:close()  --关闭数据库连接
env:close()   --关闭数据库环境
