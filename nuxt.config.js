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

    plugins: ['~/plugins/http-custom.js'],

    components: true,

    buildModules: [],

    modules: [
        'bootstrap-vue/nuxt',
        '@nuxt/http',
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

    build: {},

    env: {
        apiUrl: 'http://localhost:8000'
    }
}
