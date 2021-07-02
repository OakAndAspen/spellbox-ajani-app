<template>
    <div id="SetPage">
        <loader v-if="!set"/>
        <b-tabs v-if="set" id="Tabs">
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
            <b-tab disabled>
                <template #title>
                    <div class="d-flex">
                        <b-img-lazy :src="set.iconSvgUri"/>
                        <b class="ml-2">{{ set.name }}</b>
                    </div>
                </template>
            </b-tab>
            <b-tab v-for="tab of tabs" :key="tab.label"
                   :active="activeTab === tab.label" class="p-4">
                <template #title>
                    <span><fa :icon="['fal', tab.icon]" class="mr-2"/> {{ tab.label }}</span>
                </template>
                <component :is="tab.component"
                           :setData="set" @statusChange="updateStatus">
                </component>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            set: null,
            activeTab: 'Cards',
            tabs: [
                {
                    label: 'Cards',
                    icon: 'list',
                    component: 'SetCards'
                },
                {
                    label: 'Statistics',
                    icon: 'chart-pie',
                    component: 'SetStatistics'
                },
                {
                    label: 'Export',
                    icon: 'file-export',
                    component: 'SetImportExport'
                }
            ],
            status: "neutral"
        }
    },
    async fetch() {
        this.set = await this.$axios.$get('/set/' + this.$route.params.code);
    },
    methods: {
        updateStatus(status) {
            this.status = status;
        }
    }
}
</script>

<style>
#SetPage .nav-link img {
    height: 20px;
}

#SetPage #Tabs a {
    color: rgb(var(--sb-dark));
}
</style>
