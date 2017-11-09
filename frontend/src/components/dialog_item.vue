<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
            <v-btn color="cyan" dark slot="activator">{{btn_edit}}</v-btn>
            <v-card>
                <v-toolbar dark color="cyan">
                    <v-btn icon @click.native="dialog = false" dark @click="clickClose">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{title}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click="clickSave">{{btn_save}}</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card class="edit-cart">
                    <form>
                        <v-text-field
                                label="Surname"
                                v-model=item.surname
                                :counter="20"

                                required
                        ></v-text-field>
                        <v-text-field
                                label="Name"
                                v-model=item.name
                                :counter="20"

                                required
                        ></v-text-field>
                        <v-text-field
                                label="Position"
                                v-model=item.position
                                :counter="20"

                                required
                        ></v-text-field>
                        <v-text-field
                                label="Phone"
                                v-model=item.phone

                                required
                        ></v-text-field>
                        <v-text-field
                                label="E-mail"
                                v-model=item.mail

                                required
                        ></v-text-field>

                        <v-flex xs11 sm5>
                            <v-menu
                                    lazy
                                    :close-on-content-click="false"
                                    v-model="menu"
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    :nudge-right="40"
                                    max-width="290px"
                                    min-width="290px"
                            >
                                <v-text-field
                                        slot="activator"
                                        label="Birthday"
                                        v-model="item.birthday"
                                        prepend-icon="event"
                                        readonly
                                ></v-text-field>
                                <v-date-picker v-model="item.birthday" no-title scrollable actions>
                                    <template scope="{ save, cancel }">
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="save">OK</v-btn>
                                        </v-card-actions>
                                    </template>
                                </v-date-picker>
                            </v-menu>
                        </v-flex>
                    </form>
                </v-card>
            </v-card>
        </v-dialog>
    </v-layout>
</template>
<script>
    import {validationMixin} from 'vuelidate'
    import {required, maxLength, email} from 'vuelidate/lib/validators'
    import VDatePicker from "vuetify/es5/components/VDatePicker/VDatePicker";
    import VTextField from "vuetify/es5/components/VTextField/VTextField";

    export default {
        props: ['btn_edit', 'btn_save', 'title', 'item'],
        components: {VTextField},
        data() {
            return {
                menu: false,
                dialog: false
            }
        },
        methods: {
            clickClose: () => {
                if (window.DEBUG) console.info("Reverse update");
                this.$store.dispatch('loadEmployee', this.item._id);
                if (window.DEBUG) console.log(this.item);

            },
            clickSave: () => {
                if (window.DEBUG) console.info(this.item);
                let itemForSend = {
                    _id: this.item._id,
                    name: this.item.name,
                    surname: this.item.surname,
                    position: this.item.position,
                    phone: this.item.phone,
                    mail: this.item.mail,
                    birthday: this.item.birthday,
                    photo: this.item.photo,
                    created: this.item.created
                };
                this.$store.dispatch('putEmployee', [itemForSend]);
                //this.$store.dispatch('putEmployee',itemForSend);
                if (window.DEBUG) console.log(this.item);
                this.dialog = false;
            },
            clear: () => {
                this.name = ''
                this.surname = ''
                this.position = ''
                this.phone = ''
                this.mail = ''
                this.birthday = '2000-10-10'
                this.photo = ''
            }
        }
    }
</script>

<style scoped lang="less">
    .edit-cart {
        margin-top: 20px;
        width: 800px;
        left: 30px;
        margin-right: 10px;
        position: fixed;
    }
</style>