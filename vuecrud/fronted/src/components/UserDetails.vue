<!-- filepath: /Users/adrianadiaconitei/Desktop/consultatie/vuecrud/src/components/UserDetails.vue -->
<template>
    <div v-if="currentUser" class="user-details-container row mt-4">
      <div class="col-md-4 text-center">
        <img
          :src="getPozaUrl(currentUser.poza)"
          alt="Poza utilizator"
          class="img-fluid rounded"
          style="max-width: 200px"
        />
      </div>
      <div class="col-md-8">
        <h3>{{ currentUser.nume }} {{ currentUser.prenume }}</h3>
        <p><strong>Email:</strong> {{ currentUser.email }}</p>
        <p><strong>Telefon:</strong> {{ currentUser.telefon }}</p>
        <p v-if="currentUser.cnp"><strong>CNP:</strong> {{ currentUser.cnp }}</p>
        <p>
          <strong>Data naștere:</strong> {{ formatDate(currentUser.datanastere) }}
        </p>
      </div>
    </div>
    <div v-else>
      <p>Nu am date</p>
    </div>
  </template>
  
  <script>
  import UserService from "../services/UserService";
  import { BASE_URL } from "../http-common";
  export default {
    name: "user-details",
    data() {
      return {
        currentUser: null,
      };
    },
    methods: {
      getUser(id) {
        UserService.get(id)
          .then((response) => {
            this.currentUser = response.data["data"];
          })
          .catch((e) => {
            console.log(e);
          });
      },
      getPozaUrl(poza) {
        if (!poza) return "";
        return BASE_URL + "/uploads/" + poza;
      },
      formatDate(dateStr) {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const zi = String(date.getDate()).padStart(2, "0");
        const luna = String(date.getMonth() + 1).padStart(2, "0");
        const an = date.getFullYear();
        return `${zi}-${luna}-${an}`;
      },
    },
    mounted() {
      this.getUser(this.$route.params.id);
    },
  };
  </script>
  
  <style scoped>
  .user-details-container {
    max-width: 100%;
    margin: auto;
    background: #f8f9fa;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  </style>
  