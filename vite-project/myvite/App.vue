<template>
    <div>{{title}}</div>
</template>


<script>
import { ref } from 'vue'

export default {
    setup() {
        const title = ref('hello');
        
        // setInterval(() => {
        //     title.value = title.value.split('').reverse().join('')
        // }, 1000)
        
        return {
            title
        }
    },
}
</script>

<style scoped>
div {
    color: red;
}
</style>
