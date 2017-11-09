<template>
    <v-layout row justify-center>
        <v-card>
            <form class="edit-cart">
                <v-text-field
                        label="E-mail"
                        v-model=item.email
                        required
                ></v-text-field>
                <v-text-field
                        label="Days to date"
                        v-model=item.days_to_date
                        required
                ></v-text-field>
                <v-layout>
                    <v-btn color="cyan" dark @click="clickSave">{{btn_save}}</v-btn>
                </v-layout>
            </form>
        </v-card>

    </v-layout>

</template>

<script>
    export default {
        props: ['btn_save', 'item'],
        computed: {
            isError() {
                if (window.DEBUG) console.log(this.item);
                if (window.DEBUG) console.log(this.item);
                if ((this.item.email.length === 0) || (this.item.days_to_date.length === 0)) {

                    return true
                } else return false
            }
        },
        methods: {
            clickSave() {
                if (!this.isError) {
                    if (window.DEBUG) console.info(this.item);
                    if (window.DEBUG) console.info("Settings Save");
                    this.$store.dispatch('putSettings', [this.item]);

                } else {
                    console.error("ERROR DATA");
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .edit-cart {
        margin-top: 10px;
        width: 800px;
        left: 40px;
        position: fixed;
        padding: 10px;
    }
</style>