<template>
    <v-data-table
            v-bind:headers="headers"
            :items="items"
            class="elevation-1"
    >
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

        <template slot="items" scope="props" >
            <td class="text-xs-left">
                <v-avatar size= "16" class="grey lighten-4">
                    <img v-bind:src = props.item.photo alt="photo">
                </v-avatar>

            </td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.surname }}</td>
            <td class="text-xs-left">{{ props.item.position }}</td>
            <td class="text-xs-left">{{ props.item.phone }}</td>
            <td class="text-xs-left">{{ props.item.mail }}</td>
            <td class="text-xs-left">{{ props.item.birthday }}</td>
            <td class="text-xs-left">{{ props.item.created }}</td>

            <dialog_item-component
                    :texts = texts
                    :name_btn = texts.edit
                    :title = texts.edit_item
                    :item = props.item
            ></dialog_item-component>
        </template>
    </v-data-table>
</template>

<script>
    import {texts} from "../texts";

    export default {
        props: ['texts'],
        data () {
            return {
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
                        value: 'surname'
                    },
                    {
                        text: texts.name,
                        align: 'left',
                        value: 'name'
                    },
                    { text: texts.position, align: 'left', value: 'position' },
                    { text: texts.phone, align: 'left', value: 'phone' },
                    { text: texts.mail, align: 'left', value: 'mail' },
                    { text: texts.birthday, align: 'left', value: 'birthday' },
                    { text: texts.created, align: 'left', value: 'created' }
                ],
                items: [
                    {
                        value: false,
                        name: 'Frozen Yogurt',
                        surname: 'Frozen Yogurt',
                        photo: 'public/reminder-32.png',
                        phone: 159,
                        mail: 6.0,
                        birthday: 24,
                        created: 4.0,
                        position: 87
                    },
                    {
                        value: false,
                        photo: "",
                        name: 'Ice cream sandwich',
                        surname: 'Frozen Yogurt',
                        phone: 237,
                        mail: 9.0,
                        birthday: 37,
                        created: 4.3,
                        position: 129
                    },
                    {
                        value: false,
                        photo: "",
                        name: 'Eclair',
                        surname: 'Frozen Yogurt',
                        phone: 262,
                        mail: 16.0,
                        birthday: 23,
                        created: 6.0,
                        position: 337
                    },
                    {
                        value: false,
                        photo: "",
                        name: 'Cupcake',
                        surname: 'Frozen Yogurt',
                        phone: 305,
                        mail: 3.7,
                        birthday: 67,
                        created: 4.3,
                        position: 413
                    },
                    {
                        value: false,
                        photo: "",
                        name: 'Gingerbread',
                        surname: 'Frozen Yogurt',
                        phone: 356,
                        mail: 16.0,
                        birthday: 49,
                        created: 3.9,
                        position: 327
                    },
                    {
                        value: false,
                        photo: "",
                        name: 'Jelly bean',
                        surname: 'Frozen Yogurt',
                        phone: 375,
                        mail: 0.0,
                        birthday: 94,
                        created: 0.0,
                        position: 50
                    },
                    {
                        value: false,
                        photo: "",
                        name: 'Lollipop',
                        surname: 'Frozen Yogurt',
                        phone: 392,
                        mail: 0.2,
                        birthday: 98,
                        created: 0,
                        position: 38
                    }
                ]
            }
        }
    }
</script>