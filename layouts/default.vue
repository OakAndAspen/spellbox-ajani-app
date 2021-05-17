<template>
    <div id="DefaultLayout" class="h-100">

        <!-- Sidebar floating menu -->
        <b-sidebar id="FloatingMenu">
            <h2 class="text-center my-4">
                <logo/>
            </h2>
            <navigation :is-open="true"/>
        </b-sidebar>

        <!-- Mobile top menu -->
        <div id="TopMenu" class="position-fixed w-100 b-dark d-md-none p-3 d-flex justify-content-between">
            <logo/>
            <fa v-b-toggle.FloatingMenu icon="bars" class="t-blue-normal pointer my-2"/>
        </div>

        <!-- Mobile closed menu -->
        <div id="LeftMenu" class="position-fixed h-100 b-dark d-none d-md-block">
            <div class="w-100 text-center my-4">
                <fa v-b-toggle.FloatingMenu icon="bars" class="t-blue-normal pointer display-4"/>
            </div>
            <navigation :is-open="false"/>
        </div>
        <section id="PageWrapper">
            <b-container class="py-4">
                <b-row>
                    <b-col>
                        <Nuxt/>
                    </b-col>
                </b-row>
            </b-container>
        </section>
    </div>
</template>

<script>
import Logo from "@/components/Logo.vue";
import Navigation from "~/components/Navigation.vue";

export default {
    components: {Logo, Navigation}
}
</script>

<style>

#DefaultLayout #TopMenu {
    font-size: 30px;
}

#DefaultLayout #LeftMenu {
    width: 70px;
}

#DefaultLayout #FloatingMenu {
    background-color: rgb(var(--sb-dark)) !important;
}

#DefaultLayout #FloatingMenu header button {
    color: rgb(var(--sb-light)) !important;
}

@media only screen and (max-width: 720px) {
    #DefaultLayout #FloatingMenu {
        width: 100%;
    }

    #DefaultLayout #PageWrapper {
        padding-top: 70px;
    }
}

@media only screen and (min-width: 720px) {
    #DefaultLayout #PageWrapper {
        margin-left: 70px;
    }
}

</style>
