<template>
    <div>
        <h1>/decks/{{ id }}</h1>
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
