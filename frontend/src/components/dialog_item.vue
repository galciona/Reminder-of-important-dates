<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
    <v-btn color="cyan" dark slot="activator">{{name_btn}}</v-btn>
    <v-card>
        <v-toolbar dark color="cyan">
            <v-btn icon @click.native="dialog = false" dark>
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark flat @click="this.submit">Save</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-cart class="edit-cart">
            <form>
                <v-text-field
                        label="Surname"
                        v-model=item.surname
                        :error-messages="surnameErrors"
                        :counter="20"
                        @input="$v.surname.$touch()"
                        @blur="$v.surname.$touch()"
                        required
                ></v-text-field>
                <v-text-field
                        label="Name"
                        v-model = item.name
                        :error-messages="nameErrors"
                        :counter="20"
                        @input="$v.name.$touch()"
                        @blur="$v.name.$touch()"
                        required
                ></v-text-field>
                <v-text-field
                        label="Position"
                        v-model=item.position
                        :error-messages="positionErrors"
                        :counter="20"
                        @input="$v.position.$touch()"
                        @blur="$v.position.$touch()"
                        required
                ></v-text-field>
                <v-text-field
                        label="Phone"
                        v-model=item.phone
                        :error-messages="phoneErrors"
                        @input="$v.phone.$touch()"
                        @blur="$v.phone.$touch()"
                        required
                ></v-text-field>
                <v-text-field
                        label="E-mail"
                        v-model=item.mail
                        :error-messages="emailErrors"
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
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
        </v-cart>
    </v-card>
</v-dialog>
    </v-layout>
</template>


<script>
    import { validationMixin } from 'vuelidate'
    import { required, maxLength, email } from 'vuelidate/lib/validators'
    import VDatePicker from "vuetify/es5/components/VDatePicker/VDatePicker";
    export default {
/*        components: {VDatePicker},
        mixins: [validationMixin],
        validations: {
            name: { required, maxLength: maxLength(20) },
            email: { required, email },
            birthday: { required}
        },*/
        data () {
            return {
                menu: false,
                modal: false,

                dialog: false
            }
        },
        methods: {
            submit () {

                //this.$v.$touch()){
                    this.dialog = false;
                //}
            },
            clear () {
                this.$v.$reset()
                this.name = ''
                this.email = ''
                this.select = null
                this.checkbox = false
            }
        },
/*        computed: {
            nameErrors () {
                const errors = []
                if (!this.$v.name.$dirty) return errors
                !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
                !this.$v.name.required && errors.push('Name is required.')
                return errors
            },
            emailErrors () {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push('Must be valid e-mail')
                !this.$v.email.required && errors.push('E-mail is required')
                return errors
            }
        },*/
        props: ['texts', 'name_btn', 'title', 'item']
    }
</script>

<style scoped lang="less">
    .edit-cart{
        margin-top: 20px;
        width:800px;
        left: 30px;
        margin-right: 10px;
        position: fixed;
    }
</style>