<template>
    <b-container class="h-100 d-flex align-items-center justify-content-center">
        <div>
            <div class="text-center mb-4">
                <h1 class="display-1 font-display mb-4">
                    <span class="t-blue-normal">Spell</span><span class="t-brown-dark">Box</span>
                </h1>
                <b class="mb-4 t-dark">You're logged in!</b>
                <b-button @click="getDecks">Try to get the decks list</b-button>
            </div>
        </div>
    </b-container>
</template>

<script>
export default {
    methods: {
        async getDecks() {
            console.log("DECKS");
            const data = await this.$api.$get('/api/deck');
            console.log(data);
        }
    }
}
</script>
