export default function ({$http, env}, inject) {

    const $api = $http.create({});

    $api.setHeader('Content-Type', 'multipart/form-data');
    $api.setBaseURL(process.env.apiUrl);

    if (process.client && localStorage.getItem("authKey")) {
        $api.setToken(localStorage.getItem("authKey"), 'Bearer');
    }

    inject('api', $api);
}
