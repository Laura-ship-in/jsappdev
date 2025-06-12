<template>
    <div class="submit-form">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="nume">Nume</label>
          <input
            type="text"
            class="form-control"
            id="nume"
            required
            v-model="user.nume"
            name="nume"
          />
        </div>
        <div class="form-group">
          <label for="prenume">Prenume</label>
          <input
            type="text"
            class="form-control"
            id="prenume"
            required
            v-model="user.prenume"
            name="prenume"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            class="form-control"
            id="email"
            required
            v-model="user.email"
            name="email"
            type="email"
          />
        </div>
        <div class="form-group">
          <label for="telefon">Telefon</label>
          <input
            class="form-control"
            id="telefon"
            required
            v-model="user.telefon"
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
            v-model="user.datanastere"
            name="datanastere"
            type="date"
          />
        </div>
        <div class="form-group">
          <label for="cnp">CNP</label>
          <input
            class="form-control"
            id="cnp"
            required
            v-model="user.cnp"
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
        <button @click="saveUser" class="btn btn-success">Submit</button>
      </div>
      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newUser">Add user</button>
      </div>
    </div>
  </template>
  <script>
  import UserService from "../services/UserService";
  export default {
    name: "add-user",
    data() {
      return {
        user: {
          id: null,
          nume: "",
          prenume: "",
          email: "",
          telefon: "",
          datanastere: "",
          cnp: "",
        },
        poza: null,
        submitted: false,
      };
    },
    methods: {
      onFileChange(e) {
        this.poza = e.target.files[0];
      },
      saveUser() {
        const formData = new FormData();
        formData.append("nume", this.user.nume);
        formData.append("prenume", this.user.prenume);
        formData.append("email", this.user.email);
        formData.append("telefon", this.user.telefon);
        formData.append("datanastere", this.user.datanastere);
        formData.append("cnp", this.user.cnp);
        if (this.poza) {
          formData.append("poza", this.poza);
        }
        UserService.create(formData)
          .then((response) => {
            this.user.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch((e) => {
            console.log(e);
          });
      },
  
      newUser() {
        this.submitted = false;
        this.user = {
          id: null,
          nume: "",
          prenume: "",
          email: "",
          telefon: "",
          datanastere: "",
          cnp: "",
        };
        this.poza = null;
      },
    },
  };
  </script>
  <style>
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>
  