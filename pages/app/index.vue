<template>
    <loader/>
</template>

<script>
import Loader from "@/components/Loader.vue";

export default {
    components: {Loader},
    mounted() {
        if (process.client) window.location = '/app/search';
    }
}
</script>
