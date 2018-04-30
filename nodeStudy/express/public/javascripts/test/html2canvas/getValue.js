/**
 * Created by Administrator on 2016/10/26.
 */

//单选框和复选框选中时高亮,为了解决单选框和复选框后面的文字不带<label>标签；
function fontHightLight(ele){
    var newEle = document.createElement("label");
    newEle.style.color = "blue";
    newEle.style.fontWeight = "bold";
    newEle.innerHTML = ele.nodeValue;
    var eleParent  = ele.parentNode;
    eleParent.insertBefore(newEle,ele);
    eleParent.removeChild(ele);
}


//单选框选中
function radioCheck(radio_name,radio_value){
	if(radio_value==null || radio_value =='') return;
	var radios = document.getElementsByName(radio_name);
	for(i=0;i<radios.length;i++){
		if(radios[i].value==radio_value){
			radios[i].checked = true;
			//console.log(radios.item(i).nextSibling.nodeValue);
            //ele = radios.item(i).nextSibling;
            fontHightLight(radios.item(i).nextSibling);
		}else{
			radios[i].checked = false;
		}
	}
}

//复选框选中
function checkboxCheck(checkbox_name,checkbox_values){
	if(checkbox_values==null || checkbox_values =='') return;
	var val = checkbox_values.split(",");
	var boxes = document.getElementsByName(checkbox_name);
	for(i=0;i<boxes.length;i++){
		for(j=0;j<val.length;j++){
			if(boxes[i].value == val[j]){
				boxes[i].checked = true;
				fontHightLight(boxes.item(i).nextSibling);
				break
			}
		}
	}
}

//禁止input框被手动选取
function disableAllInput(){
	var allInput = document.getElementsByTagName("input");
	for(var i=0;i<allInput.length;i++){
		allInput[i].disabled = "true";
	}
}

/**
 * 计算两个日期相差多少天
 * @param {} startDate　开始时间（必须为Date类型）
 * @param {} endDate　结束时间（必须为Date类型）
 * @return {}	返回天数
 */
function dateDiffer(startDate, endDate) {
    if(startDate!=""&&endDate!="") {
      startDate = new Date(startDate);
      endDate = new Date(endDate);
    //得到时间戳相减 得到以毫秒为单位的差
    var mmSec = (endDate.getTime()-startDate.getTime());
    //单位转换为天并返回
    return (mmSec / 3600000 / 24+1);
    //返回小时单位的差值
    //return (mmSec / 3600000)
	}else{
		return "";
	}
}