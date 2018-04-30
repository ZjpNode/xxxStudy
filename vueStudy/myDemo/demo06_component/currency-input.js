/**
 * Created by Zjp on 2017/07/31.
 */
// eslint-disable-next-line
;(function (window, document) {
	window.ready = function (fn) {
		if (document.addEventListener) {		//标准浏览器
			document.addEventListener('DOMContentLoaded', function () {
				//注销时间，避免重复触发
				document.removeEventListener('DOMContentLoaded', arguments.callee, false);
				fn();		//运行函数
			}, false);
		} else if (document.attachEvent) {		//IE浏览器
			document.attachEvent('onreadystatechange', function () {
				if (document.readyState == 'complete') {
					document.detachEvent('onreadystatechange', arguments.callee);
					fn();		//函数运行
				}
			});
		}
	};

	function currencyInputInit() {
		Vue.component('currency-input', {
			template: '<span>' +
			'$' +
			'<input ref="input" v-bind:value="value" v-on:input="updateValue($event.target.value)"> ' +
			'</span>'
			, props: ['value']
			, methods: {
				// 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
				updateValue: function (value) {
					var formattedValue = value
					// 删除两侧的空格符
						.trim()
						// 保留 2 小数位
						.slice(
							0,
							value.indexOf('.') === -1
								? value.length
								: value.indexOf('.') + 3
						);
					// 如果值不统一，手动覆盖以保持一致
					if (formattedValue !== value) {
						this.$refs.input.value = formattedValue;
					}
					// 通过 input 事件发出数值
					this.$emit('input', Number(formattedValue));
				}
			}
		});

		new Vue({
			el: '#example'
			, data: {
				price: 0
			}
		});
	}

	function appInit() {
		Vue.component('currency-input', {
			template: '\
    <div>\
      <label v-if="label">{{ label }}</label>\
      $\
      <input\
        ref="input"\
        v-bind:value="value"\
        v-on:input="updateValue($event.target.value)"\
        v-on:focus="selectAll"\
        v-on:blur="formatValue"\
      >\
    </div>\
  '
			, props: {
				value: {
					type: Number
					, default: 0
				}
				, label: {
					type: String
					, default: ''
				}
			}
			, mounted: function () {
				this.formatValue();
			}
			, methods: {
				updateValue: function (value) {
					var result = currencyValidator.parse(value, this.value);
					if (result.warning) {
						this.$refs.input.value = result.value;
					}
					this.$emit('input', result.value);
				}
				, formatValue: function () {
					this.$refs.input.value = currencyValidator.format(this.value);
				}
				, selectAll: function (event) {
					// Workaround for Safari bug
					// http://stackoverflow.com/questions/1269722/selecting-text-on-focus-using-jquery-not-working-in-safari-and-chrome
					setTimeout(function () {
						event.target.select();
					}, 0);
				}
			}
		});

		new Vue({
			el: '#app'
			, data: {
				price: 0
				, shipping: 0
				, handling: 0
				, discount: 0
			}
			, computed: {
				total: function () {
					return ((
						this.price * 100 +
						this.shipping * 100 +
						this.handling * 100 -
						this.discount * 100
					) / 100).toFixed(2);
				}
			}
		});
	}

	function init() {
		currencyInputInit();
		appInit();
	}

	window.ready(function () {
		init();
	});

})(window, document);