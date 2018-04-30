webpackJsonp([2],{

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by Zjp on 2017/06/20.
 */
var Backbone = __webpack_require__(0);
console.log("123");
var userName = "123";
module.exports = userName;

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by Zjp on 2017/06/19.
 */

var Es6Promise = __webpack_require__(2);
Es6Promise.polyfill();

var $ = __webpack_require__(1);
var Backbone = __webpack_require__(0);

$(document).ready(function () {
    $('#menu').tendina({
        openCallback: function openCallback(clickedEl) {
            clickedEl.addClass('opened');
        },
        closeCallback: function closeCallback(clickedEl) {
            clickedEl.addClass('closed');
        }
    });
});
$(function () {

    $("#ad_setting").click(function () {
        $("#ad_setting_ul").show();
    });
    $("#ad_setting_ul").mouseleave(function () {
        $(this).hide();
    });
    $("#ad_setting_ul li").mouseenter(function () {
        $(this).find("a").attr("class", "ad_setting_ul_li_a");
    });
    $("#ad_setting_ul li").mouseleave(function () {
        $(this).find("a").attr("class", "");
    });
});

var App = {
    Models: {},
    Routers: {},
    Collections: {},
    Views: {}
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

    index: function index() {
        // Homepage
        var userName = __webpack_require__(4);
        console.log(userName + "?");
        console.log("index");
    },

    getTeams: function getTeams() {
        // List all teams

        console.log("getTeams");
        __webpack_require__.e/* require.ensure */(0).then((function (require) {
            __webpack_require__(10);
            //$("#page_content").html(html)
            //console.log(html);
        }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
    },
    getTeamsCountry: function getTeamsCountry(country) {
        // Get list of teams for specific country
        console.log("getTeamsCountry:" + country);
    },
    getTeam: function getTeam(country, name) {
        // Get the teams for a specific country and with a specific name
        console.log("getTeam:[country]" + country + "[name]" + name);
    },
    fourOfour: function fourOfour(error) {
        // 404 page
        console.log("404");
    }
});
var router = new App.Routers.Main();
Backbone.history.start();

/***/ })

},[9]);