var nextGreaterElement = function(findNums, nums) {
var o = [];
var s = [];
var l = nums.length;
for (var j in findNums) {
  o.push(-1);
  for(var i in nums){
    if(findNums[j] == nums[i] && i < l){
      s[j] = nums[i];
    }
    if(o[j] == -1 && s[j]<nums[i]){
      o[j] = nums[i];
    }
  }
}
return o;
};
