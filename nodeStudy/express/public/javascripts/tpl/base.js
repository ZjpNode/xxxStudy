function lastOrNext(flag){
	flag==1?nowPage++:nowPage--;
	if(nowPage <=allPage && nowPage>=1){

		for(var l=0;l<item*(nowPage-1);l++){
			document.getElementById("tr_"+l).style.display="none";
		}
		for(var i=item*(nowPage-1);i<item*nowPage&&i<allitem;i++){
			document.getElementById("tr_"+i).style.display="";
		}
		for(var n=item*nowPage;n<allitem;n++){
			document.getElementById("tr_"+n).style.display="none";
		}
		document.getElementById("nowPage").innerHTML = nowPage;
	}else if(nowPage==allPage+1){
		alert("已经是最后一页");
		nowPage--;
	}else if(nowPage==0){
		alert("已经是第一页");
		nowPage++;
	}else{
		return false;
	}
}
function prints(){
	var beforbdhtml=window.document.body.innerHTML;
	var reg=new RegExp("style=\"display: none;\"","g"); //创建正则RegExp对象/style="display: none;"
	bdhtml = beforbdhtml.replace(reg,"");
	sprnstr1="<!--startprint1-->",
		eprnstr1="<!--endprint1-->";
	prnhtml1=bdhtml.substring(bdhtml.indexOf(sprnstr1)+18); //从开始代码向后取html
	prnhtml1=prnhtml1.substring(0,prnhtml1.indexOf(eprnstr1));//从结束代码向前取html


	sprnstr2="<!--startprint2-->",
		eprnstr2="<!--endprint2-->";
	prnhtml2=bdhtml.substring(bdhtml.indexOf(sprnstr2)+18); //从开始代码向后取html
	prnhtml2=prnhtml2.substring(0,prnhtml2.indexOf(eprnstr2));//从结束代码向前取html


	sprnstr3="<!--startprint3-->",
		eprnstr3="<!--endprint3-->";
	prnhtml3=bdhtml.substring(bdhtml.indexOf(sprnstr3)+18); //从开始代码向后取html
	prnhtml3=prnhtml3.substring(0,prnhtml3.indexOf(eprnstr3));//从结束代码向前取html

	var outHtml = "";
	var nullLine = bdhtml.substring(bdhtml.indexOf("<!--startprint2-->")+18); //从开始代码向后取html
	nullLine = nullLine.substring(0,nullLine.indexOf("<!--startprint2_tr_0-->"));//从结束代码向前取html
	for(var i=0;i<allPage;i++){
		prnhtml=bdhtml.substring(bdhtml.indexOf("<!--startprint2_tr_"+i+"-->")+(i<10?23:24)); //从开始代码向后取html
		if(i==(allPage-1)){
			prnhtml=prnhtml.substring(0,prnhtml.indexOf("<!--endprint2-->"));//从结束代码向前取html
		}else {
			prnhtml=prnhtml.substring(0,prnhtml.indexOf("<!--startprint2_tr_"+(i+1)+"-->"));//从结束代码向前取html
		}
		outHtml+=(prnhtml1 + nullLine + prnhtml + prnhtml3.replace("<span id=\"nowPage\">1</span>","<span id=\"nowPage\">"+(i+1)+"</span>"));
	}
	//console.log(outHtml);
	window.document.body.innerHTML= outHtml;
	window.print();
	window.document.body.innerHTML = beforbdhtml;
}