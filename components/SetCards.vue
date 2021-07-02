<template>
    <div>
        <!-- Filters -->
        <b-row id="SetCardsFilters" class="mb-4">
            <b-col>
                <b-row v-for="(array, category) in filters" :key="category">
                    <b-col sm="3" class="d-flex align-items-center"><p class="m-0">{{category.toUpperCase()}}</p></b-col>
                    <b-col v-for="e of array" :key="e.code" sm="1"
                           :class="'Filter p-2 m-1 rounded-circle status-'+e.status">
                        <img :src="$imgSrc(e.image)"
                             @click="toggleFilter(category, e.code)"
                             :alt="e.label" :title="e.label" class="img-fluid">
                    </b-col>
                </b-row>
            </b-col>
            <b-col>
                <b-row v-for="(filter, key) in fullTextFilters" :key="key" class="mb-2">
                    <b-col>
                        <b-input :placeholder="filter.label" v-model="filter.value"/>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>

        <!-- Cards -->
        <b-row>
            <b-col v-for="card of cards" :key="card.id"
                   sm="2" md="4" lg="3">
                <b-img-lazy :src="card.faces[0].imageUriNormal" class="img-fluid mb-4"/>
            </b-col>
        </b-row>
    </div>
</template>

<script>


export default {
    props: ['setData'],
    data() {
        return {
            set: this.setData,
            cards: this.setData.cards,
            filters: {
                colors: [],
                rarities: [],
                types: []
            },
            fullTextFilters: {
                name: {
                    label: 'Name',
                    value: ''
                },
                type: {
                    label: 'Type line',
                    value: ''
                },
                text: {
                    label: 'Oracle text',
                    value: ''
                }
            },
            canBeExcluded: ['colors', 'types']
        }
    },
    mounted() {
        this.initializeFilters();
    },
    methods: {
        initializeFilters() {

            let colors = {
                W: "White",
                U: "Blue",
                B: "Black",
                R: "Green",
                G: "Red",
                C: "Colorless"
            };

            let rarities = {
                C: "Common",
                U: "Uncommon",
                R: "Rare",
                M: "Mythic"
            };

            let types = {
                C: "Creature",
                S: "Sorcery",
                I: "Instant",
                E: "Enchantment",
                A: "Artifact",
                P: "Planeswalker",
                L: "Land"
            };

            for (let code in colors) {
                this.filters.colors.push({
                    code: code,
                    label: colors[code],
                    image: 'symbols/' + code + '.svg',
                    status: 'neutral'
                });
            }

            for (let code in rarities) {
                this.filters.rarities.push({
                    code: code,
                    label: rarities[code],
                    image: 'rarities/' + code + '.svg',
                    status: 'neutral'
                });
            }

            for (let code in types) {
                this.filters.types.push({
                    code: code,
                    label: types[code],
                    image: 'types/' + code + '.png',
                    status: 'neutral'
                });
            }
        },
        toggleFilter(category, code) {

            // Find the current status of the filter
            let currentStatus = '';
            for (let e of this.filters[category]) {
                if (e.code === code) currentStatus = e.status;
            }

            // Calculate the new status
            let newStatus = 'neutral';
            if (currentStatus === 'neutral') newStatus = 'selected';
            if (currentStatus === 'selected' && this.canBeExcluded.includes(category)) newStatus = 'excluded';

            // Apply the new status
            for (let e of this.filters[category]) {
                if (e.code === code) e.status = newStatus;
            }
        }
    }
}

</script>

<style>
#SetCardsFilters .Filter.status-selected {
    background-color: rgba(var(--sb-green), 0.5);
}

#SetCardsFilters .Filter.status-excluded {
    background-color: rgba(var(--sb-red), 0.5);
}
</style>
