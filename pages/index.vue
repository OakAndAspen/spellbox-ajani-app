<template>
    <b-container class="h-100 d-flex align-items-center justify-content-center">
        <div>
            <div class="text-center mb-4">
                <h1 class="display-1 font-display mb-4">
                    <span class="t-blue-normal">Spell</span><span class="t-brown-dark">Box</span>
                </h1>
                <b class="mb-4 t-dark">A Magic : the Gathering card collection manager</b>
            </div>
            <b-form @submit="onSubmit">
                <b-form-input
                    v-model="form.email"
                    type="email"
                    placeholder="Email address"
                    required
                    class="mb-2 text-center"
                ></b-form-input>
                <b-form-input
                    v-model="form.password"
                    type="password"
                    placeholder="Password"
                    required
                    class="mb-2 text-center"
                ></b-form-input>
                <b-button type="submit" variant="primary" class="w-100">Login</b-button>
            </b-form>
        </div>
    </b-container>
</template>

<script>
export default {
    layout: "public",
    data() {
        return {
            form: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        async onSubmit(event) {
            event.preventDefault();

            const data = await this.$api.$post('/api/login', {
                email: this.form.email,
                password: this.form.password
            });

            if(data.authKey && process.client) {
                localStorage.setItem("authKey", data.authKey);
                window.location = "/app";
            }
        }
    }
}
</script>
