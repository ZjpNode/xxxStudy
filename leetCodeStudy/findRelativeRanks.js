//nums1 = [4,1,2], nums2 = [1,3,4,2].
var findRelativeRanks = function(nums) {
    var s = {};
    var l = nums.length;
    for(var i = 0;i<l;i++){
      s[nums[i]] = i;
    }
    var o = [];
    i=0;
    for(var j in s){
      if(i == l-0-1){
        nums[s[j]] = "Gold Medal";
        //o[i++] = "Gold Medal";
      }
      else if(i == l-1-1){
        nums[s[j]] = "Silver Medal";
        //o[i++] = "Silver Medal";
      }
      else if(i == l-2-1){
        nums[s[j]] = "Bronze Medal";
        //o[j] = "Bronze Medal";
      }else{
        nums[s[j]] = l-i+"";
      }
      i++;
    }
    return nums;
};
var findRelativeRanks = function(nums) {
    var s = {};
    var l = nums.length;
    for(var i = 0;i<l;i++){
      nums[i] = nums[i].toString();
    }


    nums[0] = "Gold Medal";
    nums[1] = "Silver Medal";
    nums[2] = "Bronze Medal";
    console.log(nums);
};
