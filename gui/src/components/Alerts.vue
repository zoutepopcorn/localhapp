<template>
  <v-card class="mx-auto" max-width="700">
    <!--    dismissible-->
    <v-alert v-model="nameserver" dismissible color="cyan" border="left" elevation="1" colored-border icon="mdi-ip">
      Nameserver is running on <strong>{{ ip }}</strong> (your local ip)
    </v-alert>
    <v-alert v-model="certificate" dismissible :color="giveCertColor(certificateInfo)" border="left" elevation="1"
             colored-border icon="mdi-certificate">
      {{ certificateInfo.text }}
    </v-alert>
  </v-card>
</template>


<script>
import {ENDPOINT} from '../settings'
import axios from "axios";

export default {
  data: () => ({
    nameserver: true,
    certificate: true,
    ip: '',
    certificateInfo: ''
  }),
  async created() {
    const ip = await axios.get(`${ENDPOINT}/ip`);
    this.ip = ip.data;
    const certificate = await axios.get(`${ENDPOINT}/certificate`);
    this.certificateInfo = certificate.data;
  },
  methods: {
    giveCertColor(certificateInfo) {
      return certificateInfo.days > 0 ? 'green' : 'red';
    }
  }
}
</script>