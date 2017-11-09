<template>
    <v-app>
        <v-tabs dark fixed centered>
            <v-toolbar color="cyan">
                <v-tabs-bar class="cyan" slot="extension">
                    <v-tabs-slider color="yellow"></v-tabs-slider>

                    <v-tabs-item @click="clickTab(i)"
                                 v-for="i in tabs"
                                 :key="i"
                                 :href="'#tab-' + i">
                        {{ i }}
                    </v-tabs-item>
                </v-tabs-bar>
            </v-toolbar>
            <v-tabs-items>
                <v-tabs-content
                        v-for="i in tabs"
                        :key="i"
                        :id="'tab-' + i">
                    <v-card flat>
                        <div v-show="isProgress" class = "progress">
                            <v-progress-circular indeterminate color="primary"></v-progress-circular>
                        </div>
                        <v-card-text v-if="keyTab == tabs[0]">
                            <items-component

                            ></items-component>
                            <v-card-text>
                                <dialog_item-component
                                        :btn_edit=texts.btn_create
                                        :btn_save=texts.btn_save
                                        :title=texts.title_create_new
                                        :item=item
                                ></dialog_item-component>
                            </v-card-text>
                        </v-card-text>

                        <v-card-text v-else
                        >Settings
                        </v-card-text>

                    </v-card>
                </v-tabs-content>
            </v-tabs-items>
        </v-tabs>
    </v-app>
</template>

<script>
    import {texts} from './texts.js'

    window.DEBUG = true;

    export default {
        data() {
            return {
                item: {
                    name: "",
                    surname: "",
                    position: "",
                    phone: "",
                    mail: "",
                    birthday: "2000-10-10",
                    photo: ""
                },
                dialog: false,
                texts: texts,
                keyTab: texts.employees,
                tabs: [texts.employees, texts.settings],
            }
        },
        computed:{
            isProgress(){
                if (window.DEBAG) console.info(this.$store.state.progress);
                return this.$store.state.progress;
            }
        },
        methods: {
            clickTab(key) {
                this.keyTab = key;
            }
        }
    }
</script>
<style scoped lang="less">
    .progress {
        position:absolute;
        left:50%;
        top:30%;
        text-align: center;
    }
    .progress-circular {
        margin: 1rem
    }
</style>