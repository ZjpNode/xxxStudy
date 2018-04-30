/**
 * Created by Administrator on 2017/1/5.
 */
var page = require('webpage').create();
phantom.outputEncoding="gbk";
page.open("http://183.63.34.219:8079/ykt/gw/phs_physical_exam?id=0ca41c5618e540f4b7495a98b4776c37&indexId=96903451403098522",function(status){
    if(status == "success"){
        console.log(page.title);
        page.paperSize = {
            format: 'A4',
            orientation: 'portrait',
            border: '1cm' };
        page.render("baidu3.png");
    }else{
        console.log("Page failed to load.");
    }
    phantom.exit(0);
});