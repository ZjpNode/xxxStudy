/**
 * Created by Zjp on 2017/06/19.
 */

const Es6Promise = require('es6-promise') ;
Es6Promise.polyfill();


const $ = require('jquery');
const Backbone = require('backbone');

$(document).ready(function(){
    $('#menu').tendina({
        openCallback: function(clickedEl) {
            clickedEl.addClass('opened');
        },
        closeCallback: function(clickedEl) {
            clickedEl.addClass('closed');
        }
    });

});
$(function(){

    $("#ad_setting").click(function(){
        $("#ad_setting_ul").show();
    });
    $("#ad_setting_ul").mouseleave(function(){
        $(this).hide();
    });
    $("#ad_setting_ul li").mouseenter(function(){
        $(this).find("a").attr("class","ad_setting_ul_li_a");
    });
    $("#ad_setting_ul li").mouseleave(function(){
        $(this).find("a").attr("class","");
    });
});

var App = {
    Models : {},
    Routers : {},
    Collections : {},
    Views : {}
};
App.Routers.Main = Backbone.Router.extend({

    // Hash maps for routes
    routes: {
        "": "index",
        "teams": "getTeams",
        "teams/:country": "getTeamsCountry",
        "teams/:country/:name": "getTeam",
        "*error": "fourOfour"
    },

    index: function () {
        // Homepage
        const userName = require('../business/pageA/main.js');
        console.log(userName+"?");
        console.log("index");
    },

    getTeams: function () {
        // List all teams

        console.log("getTeams");
        require.ensure([], function(require){
            require('../business/pageB/main.js');
            //$("#page_content").html(html)
            //console.log(html);
        },'main');

    },
    getTeamsCountry: function (country) {
        // Get list of teams for specific country
        console.log("getTeamsCountry:"+country);
    },
    getTeam: function (country, name) {
        // Get the teams for a specific country and with a specific name
        console.log("getTeam:[country]"+country+"[name]"+name);
    },
    fourOfour: function (error) {
        // 404 page
        console.log("404");
    }
});
var router = new App.Routers.Main();
Backbone.history.start();