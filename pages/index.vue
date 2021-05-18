<template>
    <b-container class="h-100 d-flex align-items-center justify-content-center">
        <div>
            <div class="text-center mb-4">
                <h1 class="display-1 mb-4">
                    <logo/>
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
            <b-alert :variant="message.type" class="mt-4" :show="!!message.text">{{ message.text }}</b-alert>
        </div>
    </b-container>
</template>

<script>
import Logo from "@/components/Logo.vue";

export default {
    components: {Logo},
    layout: "public",
    data() {
        return {
            form: {
                email: "",
                password: ""
            },
            message: {
                type: "danger",
                text: ""
            }
        }
    },
    mounted() {
        if(this.$auth.loggedIn && process.client) {
            window.location = "/app/search";
        }
    },
    methods: {
        async onSubmit(event) {
            event.preventDefault();

            try {
                this.$auth.login({
                    data: this.form
                }).then(data => {
                    this.message.type = "success";
                    this.message.text = "You have successfully logged in!";
                    if(process.client) window.location = "/app/search";
                }).catch(error => {
                    console.log("ERROR", error)
                    this.message.type = "danger";
                    this.message.text = "There was a error during login";
                });
            } catch (error) {
                if (error.response) {
                    this.message.type = "danger";
                    this.message.text = error.response.data.error;
                }
            }
        }
    }
}
</script>
