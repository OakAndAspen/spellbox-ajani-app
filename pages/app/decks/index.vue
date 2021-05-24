<template>
    <div id="DecksPage">
        <b-form inline class="my-4" @submit="createDeck">
            <b-form-input v-model="form.name" placeholder="New deck's name"/>
            <b-form-select v-model="form.format" :options="formats" class="mx-4"/>
            <b-button type="submit" variant="primary">Create a new deck</b-button>
        </b-form>
        <loader v-if="decks === null"/>
        <table v-if="decks && decks.length" class="table table-striped">
            <tbody>
            <tr>
                <th>Name</th>
                <th>Format</th>
                <th>Last updated</th>
                <th></th>
            </tr>
            <tr v-for="deck of tableDecks">
                <td>{{ deck.name }}</td>
                <td>{{ deck.format }}</td>
                <td>{{ $moment(deck.updatedAt).fromNow() }}</td>
                <td class="text-right">
                    <nuxt-link class="btn btn-info mr-2" :to="'/app/decks/'+deck.id" title="Edit">
                        <fa icon="pencil-alt"/>
                    </nuxt-link>
                    <b-button variant="danger" title="Delete"
                              @click="deleteModal = true; deckToDelete = deck;">
                        <fa icon="trash-alt"/>
                    </b-button>
                </td>
            </tr>
            </tbody>
        </table>
        <b-modal v-model="deleteModal" title="Delete this deck?"
                 @close="deleteModal = false" @cancel="deleteModal = false"
                 @ok="deleteDeck">
            <p class="my-4">Do you really want to delete "{{ deckToDelete.name }}" ?</p>
        </b-modal>
    </div>
</template>

<script>
import Loader from "@/components/Loader.vue";

export default {
    components: {Loader},
    data() {
        return {
            decks: null,
            formats: ['Custom', 'Standard', 'Modern', 'Commander', 'Pioneer', 'Legacy', 'Pauper', 'Vintage', 'Brawl'],
            form: {
                name: '',
                format: 'Custom'
            },
            deleteModal: false,
            deckToDelete: {
                id: null,
                name: null
            }
        }
    },
    mounted() {
        this.fetchDecks();
    },
    computed: {
        tableDecks() {
            return this.decks.map(deck => {
                deck.format = deck.format.charAt(0).toUpperCase() + deck.format.slice(1);
                return deck;
            }).sort((a, b) => {
                return a.updatedAt > b.updatedAt ? -1 : 1;
            });
        }
    },
    methods: {
        async fetchDecks() {
            this.decks = await this.$axios.$get('/deck');
        },
        createDeck() {
            if (this.form.name && this.form.format) {
                this.$axios.$post('/deck', this.form);
            }
        },
        deleteDeck() {
            if (this.deckToDelete.id) {
                this.$axios.$delete('/deck/' + this.deckToDelete.id)
                    .then(this.fetchDecks);
            }
        }
    }
}
</script>

<style>
#DecksPage table td {
    vertical-align: middle;
}
</style>
