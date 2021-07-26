<template>
	<div>
		<img alt="Vue logo" src="./assets/logo.png" />
		<HelloWorld msg="Hello Vue 3 + Vite" />
    <div>{{t('language')}}</div>
    <select v-model="local">
      <option value="en">en</option>
      <option value="zh">zh</option>
    </select>
    <div>{{t('hello')}}</div>
	</div>
</template>

<i18n>
  {
  "en":{
    "language": "Language",
    "hello": "hello, world!"
  },
  "zh":{
    "language": "语言",
    "hello": "你好，世界！"
  }
}
</i18n>

<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import { ref, getCurrentInstance, computed } from "vue"
const ctx = getCurrentInstance()
function usei18n(ctx){
  console.log(ctx);
  const local = ref('en');

  const t = (key) => {
    console.log(ctx.type.i18n);
    return computed(() => ctx.type.i18n[local.value][key]).value
  }

  return {local, t}
}

const { local, t } = usei18n(ctx)
// import viturlDom from "viturl-dom";
// console.log(viturlDom);
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
