<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8">
          <div class="input-group mb-3">
            <!-- <input
              type="text"
              class="form-control"
              placeholder="Search by name"
              v-model="nameUser"
            /> -->
            <!-- <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                v-on:click="searchName"
              >
                Search
              </button>
            </div> -->
          </div>
        </div>
      </div>
      <div class="row">
        <div
          class="col-sm-3"
          v-for="(user, index) in users.filter(u=> u.status===1)"
          :key="index"
          @click="setActiveUser(user, index)"
        >
          <div v-if="user.status" class="card">
            <div class="card-body">
              <h5 class="card-title">{{ user.nume }} {{ user.prenume }}</h5>
              <p class="card-text">{{ user.telefon }}</p>
              <p v-if="user.cnp" class="card-text">CNP: {{ user.cnp }}</p>
              <p v-if="user.status" class="card-text">Status: Vizibil</p>
              <p class="card-text">{{ formatDate(user.datanastere) }}</p>
              <p class="card-text">Emil: {{ (user.email) }}</p>
              <img :src="BASE_URL + '/uploads/' + user.poza" alt="" />
              <router-link
                :to="'/userdetails/' + user.id"
                class="btn btn-outline-primary me-2 mt-2"
                >View more</router-link
              >
              <!-- <router-link
                :to="{ name: 'user-details', params: { id: user.id } }"
              >
                Vezi profil
              </router-link> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script lang="ts">
  import { BASE_URL } from "../http-common";
  import UserService from "../services/UserService";
  export default {
    name: "users-list",
    data() {
      return {
        users: [],
        currentUser: null,
        currentIndex: -1,
        nameUser: "",
        BASE_URL,
      };
    },
    methods: {
      retrieveUsers() {
        UserService.getAll()
          .then((response) => {
            this.users = response.data["data"];
            console.log(response.data["data"]);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      deleteuser() {
        UserService.delete(this.currentUser.id)
          .then((response) => {
            console.log(response.data);
            this.$router.push({ name: "users" });
          })
          .catch((e) => {
            console.log(e);
          });
      },
      refreshList() {
        this.retrieveUsers();
        this.currentUser = null;
        this.currentIndex = -1;
      },
      setActiveUser(user, index) {
        this.currentUser = user;
        this.currentIndex = user ? index : -1;
      },
      removeAllUsers() {
        UserService.deleteAll()
          .then((response) => {
            console.log(response.data);
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
      },
  
      searchName() {
        UserService.findByName(this.nume)
          .then((response) => {
            this.users = response.data;
            this.setActiveUser(null);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      formatDate(dateStr: string) {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const zi = String(date.getDate()).padStart(2, "0");
        const luna = String(date.getMonth() + 1).padStart(2, "0");
        const an = date.getFullYear();
        return `${zi}-${luna}-${an}`;
      },
    },
    mounted() {
      this.retrieveUsers();
    },
  };
  </script>
  <style scoped>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
  .card-body img {
    max-width: 100%;
    height: auto;
  }
  </style>
  