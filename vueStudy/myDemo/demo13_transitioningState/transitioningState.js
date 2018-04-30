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

	function exampleInit() {
		var vm = new Vue({
			el: '#animated-number-demo'
			, data: {
				number: 0
				, animatedNumber: 0
			}
			, watch: {
				number: function (newValue, oldValue) {
					var vm = this;

					function animate() {
						if (TWEEN.update()) {
							requestAnimationFrame(animate)
						}
					}

					new TWEEN.Tween({tweeningNumber: oldValue})
						.easing(TWEEN.Easing.Quadratic.Out)
						.to({tweeningNumber: newValue}, 500)
						.onUpdate(function () {
							vm.animatedNumber = this.tweeningNumber.toFixed(0)
						})
						.start();
					animate()
				}
			}
		});
	}

	function example2Init() {
		var Color = net.brehaut.Color
		new Vue({
			el: '#example',
			data: {
				colorQuery: '',
				color: {
					red: 0,
					green: 0,
					blue: 0,
					alpha: 1
				},
				tweenedColor: {}
			},
			created: function () {
				this.tweenedColor = Object.assign({}, this.color)
			},
			watch: {
				color: function () {
					function animate() {
						if (TWEEN.update()) {
							requestAnimationFrame(animate)
						}
					}

					new TWEEN.Tween(this.tweenedColor)
						.to(this.color, 750)
						.start();
					animate()
				}
			},
			computed: {
				tweenedCSSColor: function () {
					return new Color({
						red: this.tweenedColor.red,
						green: this.tweenedColor.green,
						blue: this.tweenedColor.blue,
						alpha: this.tweenedColor.alpha
					}).toCSS()
				}
			},
			methods: {
				updateColor: function () {
					this.color = new Color(this.colorQuery).toRGB()
					this.colorQuery = ''
				}
			}
		})
	}


	function example8Init() {
		Vue.component('animated-integer', {
			template: '<span>{{tweeningValue}}</span>'
			, props: {
				value: {
					type: Number,
					required: true
				}
			}
			, data: function () {
				return {
					tweeningValue: 0
				}
			}
			,watch:{
				value:function (newValue, oldValue) {
					this.tween(oldValue, newValue)
				}
			}
			,mounted:function () {
				this.tween(0, this.value)
			}
			, methods:{
				tween:function (startValue, endValue) {
					var vm = this
					function animate () {
						if (TWEEN.update()) {
							requestAnimationFrame(animate)
						}
					}
					new TWEEN.Tween({ tweeningValue: startValue })
						.to({ tweeningValue: endValue }, 500)
						.onUpdate(function () {
							vm.tweeningValue = this.tweeningValue.toFixed(0)
						})
						.start()
					animate()
				}
			}
		});

		new Vue({
			el: '#example-8'
			, data: {
				firstNumber: 20,
				secondNumber: 40
			}
			, computed: {
				result: function () {
					return this.firstNumber + this.secondNumber;
				}
			}
		});
	}

	function init() {
		exampleInit();
		example2Init();
		example8Init();
	}

	window.ready(function () {
		init();
	});

})(window, document);