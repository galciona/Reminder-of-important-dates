<template>
  <v-app>
    <v-tabs dark fixed centered>
      <v-toolbar color="cyan">
        <v-tabs-bar class="cyan" slot="extension">
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tabs-item @click = "clickTab(i)"
                  v-for="i in tabs"
                  :key="i"
                  :href="'#tab-' + i"
          >
            {{ i }}
          </v-tabs-item>
        </v-tabs-bar>
      </v-toolbar>
      <v-tabs-items>
        <v-tabs-content
                v-for="i in tabs"
                :key="i"
                :id="'tab-' + i">
          <v-card flat >

            <v-card-text v-if="keyTab == tabs[0]"
            ><items-component
              ></items-component>
            </v-card-text>

            <v-card-text v-else
            >Settings</v-card-text>

          </v-card>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
  </v-app>
</template>

<script>
    import {
        texts
    } from './texts.js'
    export default {
        data() {
            return {
                keyTab: texts.employees,
                tabs: [texts.employees, texts.settings],
                text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'jjjj']
            }
        },
        methods: {
            clickTab: function (key) {
                this.keyTab = key;
            }
        }
    }
</script>
