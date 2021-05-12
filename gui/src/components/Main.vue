<template>
  <v-container>
    <Alerts></Alerts>
    <v-card
        class="mx-auto"
        max-width="700">
      <v-img class="mx-auto" :src="require('../assets/loco.jpg')" max-width="300" contain/>
      <v-card-text>
        <v-row v-for="(host, i) in hostArray" align="center" justify="center" dense>
          <v-col align="right">
            <v-text-field v-model="host.host" label="domain" outlined dense :disabled="host.host === 'config'" suffix=".localh.app">
              {{ host }}
            </v-text-field>
          </v-col>

          <v-col cols="0.1" sm="0.1">
            <v-icon class="mb-6">mdi-arrow-right</v-icon>
          </v-col>

          <v-col>
            <v-text-field v-model="host.target" :disabled="host.host === 'config'" label="Proxy to" outlined dense>
            </v-text-field>
          </v-col>

          <v-col cols="0.1" sm="0.1" class="ml-4">
            <v-menu v-if="host.host != 'config'" offset-y rounded>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="ml-n16 mt-n6" v-bind="attrs" v-on="on" icon>
                  <v-icon flat>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item link>
                  <v-list-item-title @click="deleteDomain(host)">
                    <v-icon>mdi-close</v-icon>
                    delete
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="mt-0 pt-0">
        <v-row dense>
          <v-col align="right">
            <v-btn class="ma-3" dark color="cyan" @click="addDomain">
              <v-icon>mdi-plus</v-icon>
              Add domain
            </v-btn>
          </v-col>
          <v-col>
            <v-btn class="ma-3" :loading="loading" color="success" @click="uploadDomains()">
              <v-icon>mdi-upload</v-icon>
              Save
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
import {ENDPOINT} from '../settings'
import Alerts from "@/components/Alerts";

const getHostName = (host) => {
  return host.host ? `${host.host}.localh.app` : `localh.app`
}

export default {
  components: {Alerts},
  data: () => ({
    hosts: [
      {upstream: "http://localhost:8041", host: "config"},
      {upstream: "http://localhost:8080", host: "test"},
    ],
    hostArray: [],
    loading: false
  }),
  async created() {
    await this.update()
  },
  methods: {
    async update() {
      const out = await axios.get(ENDPOINT);
      const arr = [];
      for (let [host, options] of Object.entries(out.data)) {
        host = host.replace(".localh.app", "");
        arr.push({host, ...options});
      }
      this.hostArray = arr;
    },
    addDomain() {
      this.hostArray.push({host: '', target: ''});
    },
    async deleteDomain(host) {
      const out = await axios.delete(ENDPOINT, {data: [getHostName(host)] })
      await this.update();
    },
    async uploadDomains() {
      this.loading = true;
      const jsonPost = {}
      for (const host of this.hostArray) {
        jsonPost[getHostName(host)] = {...host};
      }
      const out = await axios.post(ENDPOINT, jsonPost);
      await this.update();
      this.loading = false;
    }
  }
}
</script>

<style scoped>
/deep/ .v-text-field {
  max-width: 250px;
}
</style>