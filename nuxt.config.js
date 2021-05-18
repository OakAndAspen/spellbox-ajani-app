export default {
    target: 'static',

    head: {
        title: 'SpellBox',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    css: [
        '@/assets/css/app.css'
    ],

    plugins: [],

    components: true,

    buildModules: [],

    modules: [
        'bootstrap-vue/nuxt',
        '@nuxt/http',
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        ['nuxt-fontawesome', {
            component: 'fa',
            imports: [
                {
                    set: '@fortawesome/free-solid-svg-icons',
                    icons: ['faSearch', 'faScroll', 'faChartPie', 'faBoxes', 'faList', 'faSignOutAlt', 'faBars']
                }
            ]
        }]
    ],

    axios: {
        baseURL: 'http://localhost:8000/api'
    },

    auth: {
        redirect: {
            login: "/",
            logout: "/",
            home: "/app/search"
        },
        strategies: {
            local: {
                token: {
                    property: 'authKey',
                    type: 'Bearer'
                },
                user: {
                    autoFetch: false
                },
                endpoints: {
                    login: {url: '/login', method: 'post'},
                    logout: {url: '/logout', method: 'post'},
                    user: false
                }
            }
        }
    },

    build: {}
}
