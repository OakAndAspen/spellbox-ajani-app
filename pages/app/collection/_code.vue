<template>
    <div>
        <h1>/collection/{{code}}</h1>
    </div>
</template>

<script>
export default {
    async asyncData({ params }) {
        return {
            code: params.code
        }
    }
}
</script>
