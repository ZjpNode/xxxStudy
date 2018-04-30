/**
 * Created by Administrator on 2016/10/26.
 */
//单选框选中
function radioCheck(radio_name,radio_value){
	if(radio_value==null || radio_value =='') return;
	var radios = document.getElementsByName(radio_name);
	for(i=0;i<radios.length;i++){
		if(radios[i].value==radio_value){
			radios[i].checked = true;
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
				break
			}
		}
	}
}