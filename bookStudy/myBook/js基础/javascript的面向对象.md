# 关于 javascript 的面向对象

多态：同一操作作用于不同的对象，可以有不同的解释，产生不同的执行结果。  
继承：  
封装：

## 多态

1. 多态的实际意义：同一操作作用于不同的对象，可以有不同的解释，产生不同的执行结果。
1. 多态背后的思想：就是将‘做什么’和‘谁去做’分离开来，也就是将‘不变的事物’和‘可变的事物’分离开来
1. 多态最常见的 2 种实现方式：
   1. 覆盖:覆盖指子类重新定义父类方法，可通过基于 prototype 继承来实现
   1. 重载:重载是指多个同名但参数不同的方法，这个 JavaScript 确实没有,但是 JS 函数是无态的，支持任意长度、类型的参数列表，可以通过判断参数的个数（arguments.length）实现。

> **js 本身是无态的，天生就支持多态**

实现多态可以通过构造函数的方式

```javascript {.line-numbers}
// 构造函数
function Behavior(name,sound) {
    this.name = name || 'xxx';
    this.sound = sound || 'xxx';
}
// 不变的事物：做什么
Behavior.prototype.say = function(){
    console.log(`${this.name}会${this.sound}叫`)
}
// 可变的事物：谁去做
function Cat() {
    this.name = '猫';
    this.sound = '喵喵喵'
}
// 每个对象的__proto__属性指向自身的构造函数的prototype
Cat.prototype.__proto__ = Behavior.prototype;  // 基于原型链的继承
var cat = new Cat();
cat.say();

function Dog() {}
Dog.prototype = new Behavior();     // 基于原型的继承
Dog.prototype.constructor = Dog;    // 修复构造函数
var dog = new Dog();
dog.say();
```

## 封装

### 如何把"属性"（property）和"方法"（method），封装成一个对象，甚至要从原型对象生成一个实例对象[^js封装]

1. 生成实例对象的原始模式

```javascript {.line-numbers}
var cat1 = {};        // 创建一个空对象
// 把两个属性封装在一个对象里面
cat1.name = "小黑";   // 按照原型对象的属性赋值
cat1.color = "黑色";

var cat2 = {};
cat2.name = "小灰";
cat2.color = "灰色";
```

缺点：一是如果多生成几个实例，写起来就非常麻烦；二是实例与原型之间，没有任何办法，可以看出有什么联系。

2. 原始模式的改进

```javascript {.line-numbers}
function Cat(name,color) {
    return {
        name:name,
        color:color
    }
}
var cat1 = Cat('小黑','黑色');  // 生成实例对象 cat1
var cat1 = Cat('小灰','灰色');  // 生成实例对象 cat2
```

缺点：两个实例对象（cat1 和 cat2） 之间没有内在的联系，不能反映出它们是同一个原型对象的实例。

3. 构造函数模式

   所谓“构造函数”，其实就是一个普通函数，但是内部使用了 ==this== 变量。对构造函数使用 ==new== 运算符，就能生成实例，并且==this==变量会绑定在实例对象上。

```javascript {.line-numbers}
function Cat(name,color) {
    this.name = name;
    this.color = color;
    this.type = "猫";
    this.eat = function(){console.log("吃老鼠")};
}
var cat1 = new Cat('小黑','黑色');  // 生成实例对象 cat1
var cat2 = new Cat('小灰','灰色');  // 生成实例对象 cat2
// 这时cat1和cat2会自动含有一个constructor属性，指向它们的构造函数。
console.log(cat1.constructor === Cat)     // true
console.log(cat2.constructor === Cat)     // true
// Javascript还提供了一个instanceof运算符，验证原型对象与实例对象之间的关系。
console.log(cat1 instanceof Cat)     // true
console.log(cat2 instanceof Cat)     // true
// 每一个实例对象 type属性和eat()方法都是一模一样的，
// 每一次生成一个实例，都必须为重复的内容，多占用一些内存。
console.log(cat1.type);   // 猫科动物
console.log(cat2.type);   // 猫科动物
cat1.eat();         // 吃老鼠
cat2.eat();         // 吃老鼠
console.log(cat1.eat === cat2.eat); // false
```

缺点：浪费内存，变量无法共享。

4. Prototype 模式

   Javascript 规定，每一个构造函数都有一个 prototype 属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。这意味着，我们可以把那些不变的属性和方法，直接定义在 prototype 对象上。

```javascript {.line-numbers}
function Cat(name,color) {
    this.name = name;
    this.color = color;
}
Cat.prototype.type = "猫"
Cat.prototype.eat = function(){console.log("吃老鼠")};
var cat1 = new Cat('小黑','黑色');  // 生成实例对象 cat1
var cat2 = new Cat('小灰','灰色');  // 生成实例对象 cat2
console.log(cat1.type);   // 猫科动物
console.log(cat2.type);   // 猫科动物
cat1.eat();         // 吃老鼠
cat2.eat();         // 吃老鼠
// 这时所有实例的type属性和eat()方法，其实都是同一个内存地址，指向prototype对象，因此就提高了运行效率。
console.log(cat1.eat === cat2.eat); // true
```

prototype 的验证方法

```javascript {.line-numbers}
function Cat(name,color) {
    this.name = name;
    this.color = color;
}
Cat.prototype.type = "猫"
Cat.prototype.eat = function(){console.log("吃老鼠")};
var cat1 = new Cat('小黑','黑色');
var cat2 = new Cat('小灰','灰色');
// 1、 isPrototypeOf()
console.log(Cat.prototype.isPrototypeOf(cat1)); // true
console.log(Cat.prototype.isPrototypeOf(cat2)); // true
// 2、hasOwnProperty()
console.log(cat1.hasOwnProperty("name")); // true
console.log(cat1.hasOwnProperty("type")); // false
// 3、in运算符
console.log("name" in cat1); // true
console.log("type" in cat1); // true
```

## 继承

使用 prototype 来实现继承

### 相关知识点

#### new 运算符

[^js继承机制的设计思想]使用 **new** 命令，用来从 **原型对象** 生成一个实例对象

> 在 javascript 语言中没有类，new 命令后面跟的不是类，而是构造函数。

```javascript {.line-numbers}
function CAT(name){
    this.name = name;
}
var cat = new CAT('小黑');
alert(cat.name); // 小黑
```

#### JS 中 new 到底发生了什么

```javascript {.line-numbers}
function Foo(name){
    this.name = name;
    this.getName = function() {
        console.log(this.name);
    }
    var b = 'test';
    console.log(b);
};
var foo = new Foo('foo'); // {name:'foo',getName: function() {console.log(this.name);}}
```

[^js中new到底发生了什么]当代码 new Foo(...) 执行时：

```javascript {.line-numbers}
// 1、当 JavaScript 引擎执行 new 操作时，会马上开辟一个块内存，创建一个空对象o（并将 this 指向这个对象）
var o = new Object();
// 2、将新创建的空对象的隐式原型指向其构造函数的显示原型，即给这个空对象添加了一个叫__proto__的属性，而且这个__proto__指向 Foo()的 prototype 对象。
o.__proto__ = Foo.prototype;
// 3、执行构造函数 Foo()，对这个空对象进行构造
// 因为这里this指向了这个对象o，构造函数里有什么“this.属性”和“this.方法”都一一给这个空白对象装配上去，这就是为何它叫构造函数了。
A.call(o);
// 4、把这个对象o返回。
return o;
```

> 这里注意下,上面所谓的第 4 步其实是一个简化的说法.真正的过程是在第 3 步之后,如果发现 Foo 返回是一个 Object 类型(非 primitive 类型,即非 string,boolean,number,null,undefined 类型就是 Object 类型),则直接返回 Foo 的返回值,否则把第 1 步 new 的 Object 返回出去.(默认情况下,JS 中函数默认返回值是 undefined)

```javascript {.line-numbers}
function Foo(name){
    this.name = name;
    this.getName = function() {
        console.log(this.name);
    }
    var b = 'test';
    console.log(b);
    return {};  // 非primitive类型，直接返回 {}
    // return [];  // 非primitive类型，直接返回 []
    // return 'xxxx'; // primitive类型, 返回 {name:'foo',getName: function() {console.log(this.name);}}
};
var foo = new Foo('foo');
```

#### new 运算符的缺点

[^js继承机制的设计思想]用构造函数生成实例对象，有一个缺点，那就是无法共享属性和方法。每一个实例对象，都有自己的属性和方法的副本。这不仅无法做到数据共享，也是极大的资源浪费。

```javascript {.line-numbers}
function CAT(name){
    this.name = name;
    this.type = "猫";
}
var blackCat = new CAT('小黑');
var GrayCat = new CAT('小灰');
blackCat.type = '老虎';
alert(blackCat.type);   // 老虎
alert(GrayCat.type);    // 猫，不会受blackCat.type影响，无法做到数据共享
```

#### prototype 属性的引入

[^js继承机制的设计思想]这个属性包含一个对象（以下简称"prototype 对象"），所有实例对象需要共享的属性和方法，都放在这个对象里面；那些不需要共享的属性和方法，就放在构造函数里面。

[^js继承机制的设计思想]实例对象一旦创建，将自动引用 prototype 对象的属性和方法。也就是说，实例对象的属性和方法，分成两种，一种是本地的，另一种是引用的。

```javascript {.line-numbers}
function CAT(name){
    this.name = name;
}
CAT.prototype = {type : "猫"}
var blackCat = new CAT('小黑');
var GrayCat = new CAT('小灰');
CAT.prototype.type = '老虎';
alert(blackCat.type);   // 老虎
alert(GrayCat.type);    // 老虎
```

> 由于所有的实例对象共享同一个 prototype 对象，那么从外界看起来，prototype 对象就好像是实例对象的原型，而实例对象则好像"继承"了 prototype 对象一样。

### [^构造函数的继承]构造函数的继承

#### 1、构造函数绑定

使用 call 或 apply 方法，将父对象的构造函数绑定在子对象上

```javascript {.line-numbers}
function Animal() {
    this.species = '动物';
}
function Cat(name,color) {
    Animal.call(this,arguments);
    this.name = name;
    this.color = color;
}
var cat = new Cat('小黑','黑色');
console.log(cat.name);      // 小黑
console.log(cat.color);     // 黑色
console.log(cat.species);   // 动物
```

#### 2、prototype 模式

```javascript {.line-numbers}
function Animal() {
    this.species = '动物';
}
function Cat(name,color) {
    this.name = name;
    this.color = color;
}
// Cat的prototype对象指向一个Animal实例，那么所有Cat的实例就能继承Animal了。
Cat.prototype = new Animal();
/*
 任何一个prototype对象都有一个constructor属性，指向它的构造函数。
 如果没有"Cat.prototype = new Animal();"这一行，  
 Cat.prototype.constructor是指向Cat的；
 加了这一行以后，Cat.prototype.constructor指向Animal。

 更重要的是，每一个实例也有一个constructor属性，默认调用prototype对象的constructor属性。
 因此，在运行"Cat.prototype = new Animal();"这一行之后，cat.constructor也指向Animal！
*/
Cat.prototype.constructor = Cat;    // 修正继承链
var cat = new Cat('小黑','黑色');
console.log(cat.name);      // 小黑
console.log(cat.color);     // 黑色
console.log(cat.species);   // 动物
```

#### 3、直接继承 prototype

```javascript {.line-numbers}
function Animal() {}
Animal.prototype.species = '动物';
function Cat(name,color) {
    this.name = name;
    this.color = color;
}
console.log(Animal.prototype.constructor) // Animal
Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;    // 修正继承链,但是把Animal.prototype对象的constructor属性也改掉了
console.log(Animal.prototype.constructor) // Cat
var cat = new Cat('小黑','黑色');
console.log(cat.name);      // 小黑
console.log(cat.color);     // 黑色
console.log(cat.species);   // 动物
```

> 优点：比方法 3 的效率高，省内存  
> 缺点： Cat.prototype 和 Animal.prototype 现在指向了同一个对象，那么任何对 Cat.prototype 的修改，都会反映到 Animal.prototype。

#### 4、利用空对象做为中介

```javascript {.line-numbers}
function Foo() {}
function Animal() {}
Animal.prototype.species = '动物';
function Cat(name,color) {
    this.name = name;
    this.color = color;
}
Foo.prototype = Animal.prototype;
Cat.prototype = new Foo();
Cat.prototype.constructor = Cat;    // 修正继承链
console.log(Animal.prototype.constructor) // Animal
var cat = new Cat('小黑','黑色');
console.log(cat.name);      // 小黑
console.log(cat.color);     // 黑色
console.log(cat.species);   // 动物
```

```javascript {.line-numbers}
// 这个extend函数，就是YUI库如何实现继承的方法。
function extend(Child,Parent) {
    var F = function () {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;
}
```

#### 5、拷贝继承

```javascript {.line-numbers}
function Animal() {}
Animal.prototype.species = '动物';
function Cat(name,color) {
    this.name = name;
    this.color = color;
}
var C = Cat.prototype;
var A = Animal.prototype;
for(var i in A){
    C[i] = A[i];
}
C.uber = A;
var cat = new Cat('小黑','黑色');
console.log(cat.name);      // 小黑
console.log(cat.color);     // 黑色
console.log(cat.species);   // 动物
```

> C.uber = A;
> 意思是为子对象设一个 uber 属性，这个属性直接指向父对象的 prototype 属性。（uber 是一个德语词，意思是"向上"、"上一层"。）这等于在子对象上打开一条通道，可以直接调用父对象的方法。这一行放在这里，只是为了实现继承的完备性，纯属备用性质。

### [^非构造函数的继承]非构造函数的继承

两个普通对象如何继承？

> 两个对象都是普通对象，不是构造函数，无法使用构造函数方法实现"继承"。

#### 1、object 方法

json 格式的发明人 Douglas Crockford，提出了一个 object()函数，可以做到这一点。

```javascript {.line-numbers}
function object(o) {
    function F() {};
    F.prototype = o;
    return new F();
}
var Chinese = {nation:'中国'};
var Doctor = object(Chinese);
Doctor.career = '医生';
console.log(Doctor.career); // 中国
console.log(Doctor.nation); // 医生
```

#### 2、浅拷贝

> 早期 jQuery 实现继承的方式。

#### 3、深拷贝

> 递归调用"浅拷贝"就行了。

[^js继承机制的设计思想]: [Javascript 继承机制的设计思想 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html)
[^js封装]: [Javascript 面向对象编程（一）：封装 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)
[^js中new到底发生了什么]: [JS 中 new 到底发生了什么 - devCat](http://warjiang.github.io/devcat/2016/05/12/JS中new到底发生了什么/)
[^构造函数的继承]: [Javascript 面向对象编程（二）：构造函数的继承 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)
[^非构造函数的继承]: [Javascript 面向对象编程（三）：非构造函数的继承 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance_continued.html)
