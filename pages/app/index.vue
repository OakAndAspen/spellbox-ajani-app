<template>
    <div class="d-flex justify-content-center" style="margin-top: 100px;">
        <b-spinner label="Loading..." variant="info"></b-spinner>
    </div>
</template>

<script>
export default {
    mounted() {
        if(process.client) window.location = '/app/search';
    }
}
</script>
