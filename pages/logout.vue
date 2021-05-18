<template>
    <div class="d-flex justify-content-center" style="margin-top: 100px;">
        <b-spinner v-if="!message.text" label="Loading..." variant="info"></b-spinner>
        <b-alert :variant="message.type" class="mt-4" :show="!!message.text">{{ message.text }}</b-alert>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: {
                type: "danger",
                text: ""
            }
        }
    },
    mounted() {
        this.$auth.logout()
        .then(data => {
            this.message.type = "success";
            this.message.text = "You have successfully logged out!";
            if(process.client) window.location = '/';
        }).catch(error => {
            this.message.type = "danger";
            this.message.text = error;
        });
    }
}
</script>
