<template>
    <div v-if="currentUser" class="edit-form">
      <h4>User</h4>
      <form>
        <div class="form-group">
          <label for="nume">Nume</label>
          <input
            type="text"
            class="form-control"
            id="nume"
            v-model="currentUser.nume"
          />
        </div>
        <div class="form-group">
          <label for="prenume">Prenume</label>
          <input
            type="text"
            class="form-control"
            id="prenume"
            v-model="currentUser.prenume"
          />
        </div>
        <div class="form-group">
          <label for="telefon">Telefon</label>
          <input
            class="form-control"
            id="telefon"
            required
            v-model="currentUser.telefon"
            name="telefon"
            type="text"
          />
        </div>
        <div class="form-group">
          <label for="datanastere">Data nastere</label>
          <input
            class="form-control"
            id="datanastere"
            required
            v-model="currentUser.datanastere"
            name="datanastere"
            type="date"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="currentUser.email"
          />
        </div>
        <div class="form-group">
          <label for="cnp">CNP</label>
          <input
            class="form-control"
            id="cnp"
            required
            v-model="currentUser.cnp"
            name="cnp"
            type="text"
          />
        </div>
        <div class="form-group">
          <label for="poza">Poza</label>
          <input
            class="form-control"
            id="poza"
            name="poza"
            type="file"
            @change="onFileChange"
          />
        </div>
        <img
          style="max-width: 100px"
          :src="BASE_URL + '/uploads/' + currentUser.poza"
          alt=""
        />
      </form>
  
      <button
        type="submit"
        class="btn btn-success ms-2 mt-2"
        @click="updateUser"
      >
        Update
      </button>
      <p>{{ message }}</p>
    </div>
    <div v-else>
      <br />
      <p>Nu am date</p>
    </div>
  </template>
  <script>
  import UserService from "../services/UserService";
  import { BASE_URL } from "../http-common";
  export default {
    name: "profil-user",
    data() {
      return {
        currentUser: null,
        message: "",
        BASE_URL,
        poza:''
      };
    },
    methods: {
      formatDateForBackend(dateStr) {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const zi = String(date.getDate()).padStart(2, "0");
        const luna = String(date.getMonth() + 1).padStart(2, "0");
        const an = date.getFullYear();
        return `${an}-${luna}-${zi}`;
      },
      onFileChange(e) {
        this.poza = e.target.files[0];
      },
      getUser(id) {
        UserService.get(id)
          .then((response) => {
            const user = response.data["data"];
            // Formatează data pentru input type="date"
            if (user.datanastere) {
              const date = new Date(user.datanastere);
              const luna = String(date.getMonth() + 1).padStart(2, "0");
              const zi = String(date.getDate()).padStart(2, "0");
              user.datanastere = `${date.getFullYear()}-${luna}-${zi}`;
            }
            this.currentUser = user;
            console.log(response.data["data"]);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      updatePublished(status) {
        var data = {
          id: this.currentUser.id,
          title: this.currentUser.title,
          description: this.currentUser.description,
          published: status,
        };
  
        UserService.update(this.currentUser.id, data)
          .then((response) => {
            console.log(response.data);
            this.currentUser.published = status;
            this.message = "The status was updated successfully!";
          })
          .catch((e) => {
            console.log(e);
          });
      },
      updateUser(e) {
        e.preventDefault(); // oprește refresh-ul formularului
  
        const formData = new FormData();
        formData.append("id", this.currentUser.id);
        formData.append("nume", this.currentUser.nume);
        formData.append("prenume", this.currentUser.prenume);
        formData.append("telefon", this.currentUser.telefon);
        formData.append("email", this.currentUser.email);
        formData.append("cnp", this.currentUser.cnp);
        formData.append(
          "datanastere",
          this.formatDateForBackend(this.currentUser.datanastere)
        );
        if (this.poza) {
          formData.append("poza", this.poza);
        }
  
        UserService.update(this.currentUser.id, formData)
          .then((response) => {
            console.log(response.data);
            this.message = "The user was updated successfully!";
            // opțional: actualizează poza local
            if (response.data.poza) {
              this.currentUser.poza = response.data.poza;
            }
          })
          .catch((e) => {
            console.log(e);
          });
      },
      // updateUser() {
      //   // Creezi o copie ca să nu modifici direct currentUser
      //   const userToUpdate = { ...this.currentUser };
      //   userToUpdate.datanastere = this.formatDateForBackend(
      //     userToUpdate.datanastere
      //   );
      //   UserService.update(userToUpdate.id, userToUpdate)
      //     .then((response) => {
      //       console.log(response.data);
      //       this.message = "The user was updated successfully!";
      //     })
      //     .catch((e) => {
      //       console.log(e);
      //     });
      // },
    },
    mounted() {
      this.message = "";
      this.getUser(this.$route.params.id);
    },
  };
  </script>
  <style>
  .edit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>
  