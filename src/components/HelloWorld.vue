<script setup lang="ts">
import { ref } from 'vue'
import { person } from '../type';
type Props = {
  msg?: string,
  list?: person[]
}
// 给props设置默认值
withDefaults(defineProps<Props>(), {
  msg: '张麻子',
  list: () => []
})
const emits = defineEmits(['changeMsg'])
const onChangeMsg = () => {
  emits('changeMsg','黄四郎')
}
const name = ref('张麻子')
const changeName = () => {
  name.value = '县长'
}
// 将方法、变量暴露给父组件使用，父组件才可通过 ref API拿到子组件暴露的数据
defineExpose({
  name,
  changeName
})
</script>

<template>
  <p>{{ msg }}</p>
  <button @click="onChangeMsg">改变msg</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
