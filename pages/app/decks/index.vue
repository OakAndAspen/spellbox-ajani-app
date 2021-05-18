<template>
    <div>
        <h1>/decks</h1>
    </div>
</template>

<script>
export default {
    async fetch() {
        console.log("DECKS");
        const decks = await this.$axios.$get('/deck');
        console.log(decks);
    }
}
</script>
