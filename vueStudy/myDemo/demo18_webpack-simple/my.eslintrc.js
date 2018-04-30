module.exports = {
	root:true,
	//脚本运行环境
    "env": {
        "browser": true
    },
	//额外的全局变量
	"globals": {
		"sysConfigData": true,
		"jQuery":true,
		"proCode":true,
		"proName":true,
		"Vue":true
	},
    "extends": "eslint:recommended",
	/* http://eslint.org/docs/rules/ */
    "rules": {
		//强制使用Tab进行缩进
        "indent": [
            "error",		//错误等级
							/*  0或'off'：	关闭规则。
								1或'warn'：	打开规则，并且作为一个警告（并不会导致检查不通过）。
								2或'error'：打开规则，并且作为一个错误 (退出码为1，检查不通过)。*/
			"tab",					
            { "SwitchCase":1 }			//处理方式
        ],
		// 强制使用一致的换行风格
        "linebreak-style": [
            "error",
            "windows"
        ],
		// 强制使用单引号
        "quotes": [
            "error",
            "single"
        ],
		// 要求使用分号而不是 ASI
        "semi": [
            "error",
            "always"
        ],
		// 禁止不必要的分号
		'no-extra-semi': 'error',
		// 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号， 
		'comma-dangle': [2, 'never'],
		// 控制逗号在行尾出现还是在行首出现  
		"comma-style": [2, "first"],
		// if while function 后面的{必须与if在同一行，java风格。
		"brace-style": [2, "1tbs", {"allowSingleLine": true}],
		 // if else while for do后面的代码块全都需要{ }包围    
		"curly": [2, "all"],  
		// switch语句强制default分支，也可添加 // no default 注释取消此次警告  
		"default-case": 2,
		// 双峰驼命名格式
		'camelcase': [2,{ "properties": "always" }]
    }
};