<template>
    <v-layout row justify-center>
        <v-btn color="cyan" dark @click="clickBtn">{{btn_delete}}</v-btn>
    </v-layout>
</template>

<script>
    export default {
        props: ['btn_delete', 'item'],
        methods: {
            clickBtn() {
                this.$store.dispatch('deleteEmployee', this.item._id);
                if (window.DEBAG) console.info(this.$store.state.employees.data);
            }
        }
    }
</script>
