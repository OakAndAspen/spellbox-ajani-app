<template>
    <div id="CollectionPage">
        <loader v-if="!sets"/>
        <b-row v-if="sets">
            <!-- Search form -->
            <b-col md="4">
                <b-form>
                    <b-button-group class="w-100">
                        <b-button :disabled="display === 'list'" @click="display = 'list'">
                            Display as list
                        </b-button>
                        <b-button :disabled="display === 'icons'" @click="display = 'icons'">
                            Display as icons
                        </b-button>
                    </b-button-group>
                    <b-form-input type="search" v-model="fullText" class="my-2"
                                  placeholder="Search by name or code"/>
                    <b-input-group prepend="From" class="my-2">
                        <b-form-input type="number" v-model="minYear"/>
                    </b-input-group>
                    <b-input-group prepend="To" class="my-2">
                        <b-form-input type="number" v-model="maxYear"/>
                    </b-input-group>
                    <b-form-group label="" class="mt-4">
                        <b-form-checkbox-group stacked v-model="selectedTypes" :options="types"/>
                    </b-form-group>
                </b-form>
            </b-col>
            <b-col md="8">
                <!-- Display as list -->
                <b-table id="SetsTable" v-if="display === 'list'" borderless striped
                         :items="filteredSets" :fields="tableFields">
                    <template #cell(iconSvgUri)="data">
                        <b-img-lazy :src="data.item.iconSvgUri" class="mx-2"/>
                    </template>
                    <template #cell(name)="data">
                        <nuxt-link :to="'/app/collection/'+data.item.code"
                                   :class="'type type-'+data.item.setType">
                            {{ data.item.name }}
                        </nuxt-link>
                    </template>
                    <template #cell(code)="data">
                        {{ data.item.code.toUpperCase() }}
                    </template>
                    <template #cell(releasedAt)="data">
                        {{ $moment(data.item.releasedAt).format('DD.MM.YYYY') }}
                    </template>
                    <template #cell(setType)="data">
                        {{ typeCodeToLabel(data.item.setType) }}
                    </template>
                </b-table>

                <!-- Display as icons -->
                <b-row id="SetsIcons" v-if="display === 'icons'">
                    <b-col v-for="set of filteredSets" sm="6" md="4" lg="3" :key="set.id"
                           class="text-center d-flex flex-column align-items-center my-4">
                        <b-img-lazy :src="set.iconSvgUri"/>
                        <nuxt-link :to="'/app/collection/'+set.code"
                                   :class="'mt-2 type type-'+set.setType">
                            {{ set.name }}
                        </nuxt-link>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Loader from "@/components/Loader.vue";

export default {
    components: {Loader},
    data() {
        return {
            sets: null,
            types: null,
            selectedTypes: ['core', 'expansion'],
            fullText: '',
            minYear: 1000,
            maxYear: 3000,
            display: 'icons',
            tableFields: [
                {
                    label: '',
                    key: 'iconSvgUri',
                    sortable: false
                },
                {
                    label: 'Name',
                    key: 'name',
                    sortable: true
                },
                {
                    label: 'Code',
                    key: 'code',
                    sortable: true
                },
                {
                    label: 'Release',
                    key: 'releasedAt',
                    sortable: true
                },
                {
                    label: 'Type',
                    key: 'setType',
                    sortable: true
                }
            ]
        }
    },
    mounted() {
        this.fetchSets();
    },
    methods: {
        async fetchSets() {
            // Sets types
            let sets = await this.$axios.$get('/set');
            sets = sets.sort((a, b) => a.releasedAt > b.releasedAt ? -1 : 1);
            this.sets = sets;

            // Set types
            let types = [];
            for (let set of sets) {
                if (!types.find(t => t.value === set.setType)) {
                    types.push({
                        value: set.setType,
                        text: this.typeCodeToLabel(set.setType),
                    });
                }
            }
            types = types.sort((a, b) => a.value > b.value ? 1 : -1);
            this.types = types;

            // Min and max years
            this.minYear = this.$moment(sets[sets.length - 1].releasedAt).format('YYYY');
            this.maxYear = this.$moment(sets[0].releasedAt).format('YYYY');
        },
        typeCodeToLabel(code) {
            let words = code.split('_');
            words = words.map(w => {
                return w.charAt(0).toUpperCase() + w.substring(1);
            })
            return words.join(' ');
        }
    },
    computed: {
        filteredSets() {
            let sets = this.sets;

            // Filter by set type
            sets = sets.filter(s => this.selectedTypes.includes(s.setType));

            // Filter by fulltext search
            if (this.fullText) {
                sets = sets.filter(s => (s.name.toLowerCase().includes(this.fullText) || s.code.toLowerCase().includes(this.fullText)));
            }

            // Filter by min and max year
            sets = sets.filter(s => {
                let year = this.$moment(s.releasedAt).format('YYYY');
                return (year >= this.minYear && year <= this.maxYear);
            });

            // Exclude future sets
            sets = sets.filter(s => {
                return this.$moment(s.releasedAt).isBefore(this.$moment());
            });

            return sets;
        }
    }
}
</script>

<style>
#CollectionPage #SetsIcons img {
    height: 70px;
    max-width: 100px;
}

#CollectionPage #SetsTable td {
    vertical-align: middle;
}

#CollectionPage #SetsTable img {
    min-width: 30px;
}

#CollectionPage .type {
    color: rgb(var(--sb-blue-normal));
}

#CollectionPage .type.type-core {
    color: rgb(var(--sb-gray));
}

#CollectionPage .type.type-expansion {
    color: rgb(var(--sb-brown-light));
}
</style>
