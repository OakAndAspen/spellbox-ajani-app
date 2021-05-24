<template>
    <div>
        <loader v-if="!message.text"/>
        <b-alert :variant="message.type" class="mt-4" :show="!!message.text">{{ message.text }}</b-alert>
    </div>
</template>

<script>
import Loader from "@/components/Loader.vue";

export default {
    components: {Loader},
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
                if (process.client) window.location = '/';
            }).catch(error => {
            this.message.type = "danger";
            this.message.text = error;
        });
    }
}
</script>
