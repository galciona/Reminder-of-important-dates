<template>
    <v-data-table
            v-bind:headers="headers"
            :items="this.items"
            class="elevation-1">
        <template slot="headerCell" scope="props">
            <v-tooltip bottom>
                <span slot="activator">
                  {{ props.header.text }}
                </span>
                <span>
                  {{ props.header.text }}
                </span>
            </v-tooltip>
        </template>

        <template slot="items" scope="props">
            <td class="text-xs-left">
                <v-avatar class="grey lighten-4">
                    <img v-bind:src=img alt="photo">
                </v-avatar>
            </td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.surname }}</td>
            <td class="text-xs-left">{{ props.item.position }}</td>
            <td class="text-xs-left">{{ props.item.phone }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">{{ props.item.birthday }}</td>
            <td class="text-xs-left">{{ props.item.created }}</td>

            <dialog_item-component
                    :btn_edit=btn_edit
                    :btn_save=btn_save
                    :title=title_dialog
                    :item=props.item
            ></dialog_item-component>
            <btn_delete-component
                    :item=props.item
                    :btn_delete=btn_delete
            ></btn_delete-component>

        </template>
    </v-data-table>
</template>

<script>
    import {texts} from "../texts";

    export default {
        computed: {
            items() {
                return this.$store.state.employees.data;
            }
        },
        data() {
            return {
                img: 'public/user32.png',
                btn_edit: texts.btn_edit,
                title_dialog: texts.title_edit_item,
                btn_save: texts.btn_save,
                btn_delete: texts.btn_delete,
                dialog: false,
                headers: [
                    {
                        text: texts.photo,
                        align: 'left',
                        sortable: false,
                        value: 'photo'
                    },
                    {
                        text: texts.surname,
                        align: 'left',
                        value: 'surname',
                        sortable: false,
                    },
                    {
                        text: texts.name,
                        align: 'left',
                        value: 'name',
                        sortable: false,
                    },
                    {
                        text: texts.position,
                        align: 'left',
                        value: 'position',
                        sortable: false,
                    },
                    {
                        text: texts.phone,
                        align: 'left',
                        value: 'phone'
                    },
                    {
                        text: texts.mail,
                        align: 'left',
                        value: 'mail',
                        sortable: false,
                    },
                    {
                        text: texts.birthday,
                        align: 'left',
                        value: 'birthday'
                    },
                    {
                        text: texts.created,
                        align: 'left',
                        value: 'created'
                    }
                ]
            }
        }
    }
</script>
