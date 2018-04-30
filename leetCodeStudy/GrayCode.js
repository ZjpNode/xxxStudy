function GrayCode(n){
  var l = Math.pow(2,n-1); //2 -- 2
  var s = Math.pow(2,n);      //2 -- 4
  var grayCode = [];
  if(n==1){
    grayCode[0] = "0";
    grayCode[1] = "1";

  }else{
    var last = GrayCode(n-1);
    for(var i=0;i<last.length;i++){
      grayCode[i] = "0"+last[i];
      grayCode[s-1-i] = "1"+last[i];
    }
  }
  return grayCode;
}
