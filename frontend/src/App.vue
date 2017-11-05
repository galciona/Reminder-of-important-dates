<template>
  <v-app>
    <div>
      <v-tabs dark v-model="active">
        <v-tabs-bar class="cyan" >
          <v-tabs-item
                  v-for="tab in tabs"
                  :key="tab"
                  :href="'#' + tab"
                  ripple
          >
            Item {{ tab.slice(-1) }}
          </v-tabs-item>
          <v-tabs-slider color="yellow"></v-tabs-slider>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content
                  v-for="tab in tabs"
                  :key="tab"
                  :id="tab"
          >
            <v-card flat>
              <v-card-text>{{ text }}</v-card-text>
            </v-card>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
    </div>
  </v-app>
</template>

<script>
    export default {
        data () {
            return {
                tabs: ['tab-1', 'tab-2'],
                active: null,
                text: 'test'
            }
        },
        methods: {
            next () {
                this.active = this.tabs[(this.tabs.indexOf(this.active) + 1) % this.tabs.length]
            }
        }
    }
</script>
