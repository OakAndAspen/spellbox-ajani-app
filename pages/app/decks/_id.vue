<template>
    <div id="DeckPage">
        <b-tabs id="Tabs">
            <b-tab disabled>
                <template #title>
                    <fa v-if="status === 'neutral'" icon="check"
                        class="t-gray" title="Deck is up to date"/>
                    <fa v-if="status === 'loading'" icon="sync" spin
                        class="t-blue-normal" title="Deck is being saved..."/>
                    <fa v-if="status === 'success'" icon="check"
                        class="t-green" title="Deck is up to date"/>
                    <fa v-if="status === 'error'" icon="times"
                        class="t-red" title="There was an error"/>
                </template>
            </b-tab>
            <b-tab v-for=" tab of tabs
                    " :active="activeTab === tab.label" class="p-4">
                    <template #title>
                        <span><fa :icon="['fal', tab.icon]" class="mr-2"/> {{ tab.label }}</span>
                    </template>
                    <loader v-if="!deck"/>
                    <component :is="tab.component" v-if="deck"
                               :deckData="deck" @statusChange="updateStatus">
                    </component>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import Loader from "@/components/Loader.vue";

export default {
    components: {Loader},
    data() {
        return {
            deck: null,
            activeTab: 'About',
            tabs: [
                {
                    label: 'About',
                    icon: 'info-circle',
                    component: 'DeckAbout'
                },
                {
                    label: 'Card Search',
                    icon: 'search',
                    component: 'DeckSearch'
                },
                {
                    label: 'Statistics',
                    icon: 'chart-pie',
                    component: 'DeckStatistics'
                },
                {
                    label: 'Export',
                    icon: 'file-export',
                    component: 'DeckExport'
                },
                {
                    label: 'Import',
                    icon: 'file-import',
                    component: 'DeckImport'
                }
            ],
            status: "neutral"
        }
    },
    async fetch() {
        this.deck = await this.$axios.$get('/deck/' + this.$route.params.id);
    },
    methods: {
        updateStatus(status) {
            this.status = status;
        }
    }
}
</script>

<style>
#DeckPage #Tabs a {
    color: rgb(var(--sb-dark));
}
</style>
