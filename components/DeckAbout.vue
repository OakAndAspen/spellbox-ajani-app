<template>
    <b-form @change="save">
        <b-form-row>
            <b-col>
                <b-form-group label="Name" label-for="name">
                    <b-form-input id="name" v-model="deck.name"
                                  type="text" placeholder="Your deck's name" required/>
                </b-form-group>
                <b-form-group label="Description" label-for="description">
                    <b-form-textarea id="description" v-model="deck.description"/>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Format" label-for="format">
                    <b-form-select id="format" v-model="deck.format" :options="formats"/>
                </b-form-group>
                <b-form-group label="Notes" label-for="notes">
                    <b-form-textarea id="notes" v-model="deck.notes"/>
                </b-form-group>
            </b-col>
        </b-form-row>
    </b-form>
</template>

<script>

export default {
    props: ['deckData'],
    data() {
        return {
            deck: this.deckData,
            formats: process.env.formats,
            status: null
        }
    },
    methods: {
        save() {
            this.$emit("statusChange", "loading");

            const select = (({ name, format, description, notes }) => ({ name, format, description, notes }));
            let form = select(this.deck);

            this.$axios.$put('/deck/' + this.deck.id, form)
                .then(res => this.$emit("statusChange", "success"))
                .catch(res => this.$emit("statusChange", "error"));
        }
    }
}

</script>
