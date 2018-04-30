/**
 * Created by Zjp on 2017/06/20.
 */

const _  = require('underscore');
const Backbone = require('backbone');
const html = require('./main.html');
const Mock = require('mockjs');

Mock.mock('http://g.cn', {
    'name'     : '@name',
    'age|1-100': 100,
    'color'    : '@color'
});
$.ajax({
    url: 'http://g.cn',
    dataType:'json'
}).done(function(data, status, xhr){
    console.log(
        JSON.stringify(data, null, 4)
    )
});
var team = Backbone.Model.extend({
    url:'http://g.cn',
    defaults : {
        "appetizer":  "caesar salad",
        "entree":     "ravioli",
        "dessert":    "cheesecake",
        "name":       "qeqwe"
        // default attributes
    },
    //解析异步请求返回的结果，fetch方法与save方法都会调用它
    parse: function (res) {
        console.log("[parse]");
        console.log(res);
        return res.data;
    }
    // Domain-specific methods go here
});

var view = Backbone.View.extend({
    el:"#page_content",
    //className : '.team-element',
    //tagName : 'div',
    model : new team,
    events : {
        "click a#Bclick" : "moreInfo"
    },
    initialize: function () {
        this.render();
        //监听关联的model实例的change事件，只要model实例的属性发生变化，都会调用自身的render方法
        this.listenTo(this.model,'change', this.render);

        //this.$input = $('#new_input');
    },
    moreInfo : function(e){
        console.log("aaaaaaaaaaaa")
        //console.log(this.model.fetch());
        this.model.fetch()
        console.log(this.model.toJSON())
        this.model.save({"zjp": "Teddy","name":"zzzjp"});
    },
    render : function() {
        // Compile the template
        var compiledTemplate = _.template(html);
        // Model attributes loaded into the template. Template is
        // appended to the DOM element referred by the el attribute
        $(this.el).html(compiledTemplate(this.model.toJSON()));
    }
});
var myView = new view();
//myView.render();