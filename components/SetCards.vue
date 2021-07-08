<template>
    <div>
        <!-- Filters -->
        <b-row id="SetCardsFilters" class="mb-4">
            <b-col md="6">
                <b-row v-for="(array, category) in filters" :key="category">
                    <b-col cols="3" class="align-items-center d-none d-lg-flex"><p class="m-0">{{ category.toUpperCase() }}</p>
                    </b-col>
                    <b-col>
                        <div class="d-flex flex-row justify-content-start">
                            <span v-for="e of array" :key="e.code"
                                  :class="'Filter rounded-circle status-'+e.status">
                                <img :src="$imgSrc(e.image)" class="img-fluid"
                                     @click="toggleFilter(category, e.code)"
                                     :alt="e.label" :title="e.label">
                            </span>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
            <b-col md="6">
                <b-row v-for="(filter, key) in fullTextFilters" :key="key" class="mb-2">
                    <b-col>
                        <b-input :placeholder="filter.label" v-model="filter.value"/>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>

        <hr class="my-4"/>

        <!-- Cards -->
        <b-row>
            <b-col v-for="card of filteredCards" :key="card.id"
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
                R: "Red",
                G: "Green",
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
                    image: 'types/' + code + '.svg',
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
    },
    computed: {
        filteredCards() {
            let cards = this.cards;

            // Filter by name
            let nameFilter = this.fullTextFilters.name.value.toLowerCase();
            if (nameFilter && nameFilter !== '') {
                cards = cards.filter(c => c.name.toLowerCase().includes(nameFilter));
            }

            // Filter by type
            let typeFilter = this.fullTextFilters.type.value.toLowerCase();
            if (typeFilter && typeFilter !== '') {
                cards = cards.filter(c => {
                    let ok = false;
                    for (let f of c.faces) {
                        if (f.typeLine.toLowerCase().includes(typeFilter)) ok = true;
                    }
                    return ok;
                });
            }

            // Filter by oracle text
            let textFilter = this.fullTextFilters.text.value.toLowerCase();
            if (textFilter && textFilter !== '') {
                cards = cards.filter(c => {
                    let ok = false;
                    for (let f of c.faces) {
                        if (f.oracleText.toLowerCase().includes(textFilter)) ok = true;
                    }
                    return ok;
                });
            }

            // Filter by color
            let selectedColors = [];
            let excludedColors = [];
            for (let color of this.filters.colors) {
                if (color.status === 'selected') selectedColors.push(color.code.toUpperCase());
                if (color.status === 'excluded') excludedColors.push(color.code.toUpperCase());
            }
            if (selectedColors.length) {
                cards = cards.filter(c => {
                    let ok = false;
                    for (let sc of selectedColors) {
                        if (c.colorIdentity.includes(sc)) ok = true;
                    }
                    return ok;
                });
            }
            if (excludedColors.length) {
                cards = cards.filter(c => {
                    let ok = true;
                    for (let ec of excludedColors) {
                        if (c.colorIdentity.includes(ec)) ok = false;
                    }
                    return ok;
                });
            }

            // Filter by rarity
            let selectedRarities = [];
            for (let rarity of this.filters.rarities) {
                if (rarity.status === 'selected') selectedRarities.push(rarity.code.toLowerCase());
            }
            if (selectedRarities.length) {
                cards = cards.filter(c => selectedRarities.includes(c.rarity.toLowerCase().charAt(0)));
            }

            // Filter by type
            let selectedTypes = [];
            let excludedTypes = [];
            for (let type of this.filters.types) {
                if (type.status === 'selected') selectedTypes.push(type.label.toLowerCase());
                if (type.status === 'excluded') excludedTypes.push(type.label.toLowerCase());
            }
            if (selectedTypes.length) {
                cards = cards.filter(c => {
                    let ok = false;
                    for (let f of c.faces) {
                        for (let st of selectedTypes) {
                            if (f.typeLine.toLowerCase().includes(st)) ok = true;
                        }
                    }
                    return ok;
                });
            }
            if (excludedTypes.length) {
                cards = cards.filter(c => {
                    let ok = true;
                    for (let f of c.faces) {
                        for (let et of excludedTypes) {
                            if (f.typeLine.toLowerCase().includes(et)) ok = false;
                        }
                    }
                    return ok;
                });
            }

            return cards;
        }
    }
}

</script>

<style>

#SetCardsFilters .Filter {
    padding: 6px;
    width: 14%;
}

#SetCardsFilters .Filter img {
    max-height: 40px;
    min-width: 20px;
}

#SetCardsFilters .Filter.status-selected {
    background-color: rgba(var(--sb-green), 0.5);
}

#SetCardsFilters .Filter.status-excluded {
    background-color: rgba(var(--sb-red), 0.5);
}
</style>
