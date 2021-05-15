<template>
    <div id="DefaultLayout" class="h-100">
        <b-sidebar id="FloatingMenu">
            <h2 class="font-display text-center my-4">
                <span class="t-blue-normal">Spell</span><span class="t-brown-dark">Box</span>
            </h2>
            <navigation :is-open="true"/>
        </b-sidebar>
        <div id="LeftMenu" class="position-fixed h-100 b-dark">
            <div class="w-100 text-center my-4">
                <fa v-b-toggle.FloatingMenu icon="bars" class="t-blue-normal pointer display-4"/>
            </div>
            <navigation :is-open="false"/>
        </div>
        <section id="PageWrapper">
            <b-container class="py-4">
                <Nuxt/>
            </b-container>
        </section>
    </div>
</template>
<script>
import Navigation from "~/components/Navigation.vue";

export default {
    components: {Navigation}
}
</script>

<style>

#DefaultLayout #LeftMenu {
    width: 70px;
}

#DefaultLayout #FloatingMenu {
    background-color: rgb(var(--sb-dark)) !important;
}

#DefaultLayout #FloatingMenu header button {
    color: rgb(var(--sb-light)) !important;
}

#DefaultLayout #PageWrapper {
    margin-left: 70px;
}

</style>
