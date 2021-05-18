<template>
    <div>
        <h1>/buylists/{{id}}</h1>
    </div>
</template>

<script>
export default {
    async asyncData({ params }) {
        return {
            id: params.id
        }
    }
}
</script>
