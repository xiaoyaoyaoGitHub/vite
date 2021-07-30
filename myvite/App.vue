<template>
    <div>{{title}}</div>
</template>


<script>
import { ref } from 'vue'

export default {
    setup() {
        const title = ref('hello');
        
        return {
            title
        }
    },
}
</script>


<style scoped>
div {
    color: blue;
}
</style>