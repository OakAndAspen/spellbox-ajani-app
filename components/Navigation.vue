<template>
    <b-nav vertical id="Navigation">
        <li class="nav-item my-2 text-center" v-for="item of menu">
            <nuxt-link :to="item.url">
                <fa :icon="item.icon" class="Icon"/>
                <span v-if="isOpen">{{ item.text }}</span>
            </nuxt-link>
        </li>
    </b-nav>
</template>

<script>
export default {
    name: "Navigation",
    props: ["isOpen"],
    data() {
        return {
            menu: [
                {
                    text: "Search",
                    icon: "search",
                    url: "/app/search"
                },
                {
                    text: "Collection",
                    icon: "scroll",
                    url: "/app/collection"
                },
                {
                    text: "Statistics",
                    icon: "chart-pie",
                    url: "/app/statistics"
                },
                {
                    text: "Decks",
                    icon: "boxes",
                    url: "/app/decks"
                },
                {
                    text: "Buylists",
                    icon: "list",
                    url: "/app/buylists"
                },
                {
                    text: "Log out",
                    icon: "sign-out-alt",
                    url: "/logout"
                }
            ]
        }
    }
}
</script>

<style>

#Navigation a {
    font-variant: all-small-caps;
    color: rgb(var(--sb-light));
}

#Navigation a:hover {
    text-decoration: none;
    color: rgb(var(--sb-white));
}

#Navigation .Icon {
    width: 30px;
}

</style>
