<template>
  <div class="home">
    <img alt="Vue logo" src="src/assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import {getUserInfo,updateUserInfo} from "@/api";
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
getUserInfo({id:'a01'}).then(res=>{
  console.log(res.result)
})
updateUserInfo({id:'a01',update:{address:'chengdu'}}).then(res=>{
  console.log(res.result)
})
@Component({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {}
</script>
