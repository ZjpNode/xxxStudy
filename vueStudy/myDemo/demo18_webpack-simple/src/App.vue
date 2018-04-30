<template>
    <div id="app">
        <img src="./assets/logo.png">
        <h1>{{ msg }}</h1>
        <h1>{{reversedMessage}}</h1>
        <h1>{{bb}}</h1>
        <h2 class="example">Essential Links</h2>
        <ul>
            <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
            <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
            <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
            <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
        </ul>
        <h2 :class="$style.red">Ecosystem</h2>
        <ul>
            <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
            <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
            <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
            <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
        </ul>
        <div>
            <p :class="{ [$style.red]: isRed }">
                isRed? --{{isRed}}
            </p>
            <p :class="[$style.red, bb.bold6]">
                Red and bold
            </p>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'app',
		data () {
			return {
				msg: "Welcome to Your Vue.js App"
				, isRed: false
			}
		}
		, computed: {
			// a computed getter
			reversedMessage: function () {
				return this.msg.split('').reverse().join('')
			},
			bb: function () {
				return this.msg.split('').reverse().join('')
			}
		}
		, created () {
			console.log(this)
			console.log(this.$style)
			console.log(this.bb)
			// -> "_1VyoJ-uZOjlOxP7jWUy19_0"
			// an identifier generated based on filename and className.
		}
	};

</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
<style scoped>
    .example {
        color: yellow;
    }
</style>
<style module>
    .red {
        color: red;
    }

    .bold {
        font-weight: 800;
    }
</style>
<!--
在 .vue 中你可以定义不止一个 <style>，为了避免被覆盖，你可以通过设置 module 属性来为它们定义注入后计算属性的名称。
注意：不能和已有的计算属性的属性（会覆盖）、data的属性（会报错）两者重名
-->
<style module="bb">
    .bold6 {
        font-weight: bold;
    }
</style>
