<template>
<div>
<div>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
  <div class="container d-flex justify-content-around">
      <div>
        <b-button v-b-modal.modal-prevent-closing>ADD TASK</b-button>
      </div>
    <div>
      <div class="d-flex justify-content-center">
        <h3 style="padding: 1rem; color: green;">Backlog</h3>
      </div>
      <Backlog
        v-for="(backlog, i) in backlogs"
        :key="i + 1"
        :backlog="backlog"
        @emitGetEdit="getEditPage" @emitGoDelete="goDelete">
      </Backlog>
    </div>
    <div>
      <div class="d-flex justify-content-center">
        <h3 style="padding: 1rem; color: green;">Doing</h3>
      </div>
      <Doing 
        v-for="(doing, i) in doings" 
        :key="i + 1" 
        :doing="doing"
        @emitGetEdit="getEditPage" @emitGoDelete="goDelete">
      </Doing>
      <div></div>
    </div>
    <div>
      <div class="d-flex justify-content-center">
        <h3 style="padding: 1rem; color: green;">Todo</h3>
      </div>
      <Todo v-for="(todo, i) in todos" 
        :key="i + 1" 
        :todo="todo"
        @emitGetEdit="getEditPage" @emitGoDelete="goDelete">
      </Todo>
    </div>
    <div>
      <div class="d-flex justify-content-center">
        <h3 style="padding: 1rem; color: green;">Done</h3>
      </div>
      <Done v-for="(done, i) in dones" 
        :key="i + 1"
        :done="done"
        @emitGetEdit="getEditPage" @emitGoDelete="goDelete">
      </Done>
    </div>

        <!-- The modal -->
        <div>
          <Modal @emitCreatedTask="fetchTasks"></Modal>
        </div>
</div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import Backlog from "../components/Backlog";
import Doing from "../components/Doing";
import Done from "../components/Done";
import Todo from "../components/Todo";
import Modal from "../components/Modal";
import { BModal, VBModal } from "bootstrap-vue";


export default {
  components: {
    Backlog,
    Doing,
    Done,
    Todo,
    Modal,
    BModal
  },
  directives: {
    "b-modal": VBModal,
  },
  data() {
    return {
      backlogs: [],
      todos: [],
      doings: [],
      dones: [],
      visibleModal: false,
    };
  },
  methods: {
    fetchTasks() {
      axios({
        method: "GET",
        url: "http://localhost:3000/tasks",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          this.backlogs = [];
          this.todos = [];
          this.doings = [];
          this.dones = [];
          response.data.tasks.forEach((e) => {
            switch (e.category) {
              case "backlog":
                this.backlogs.push(e);
                break;
              case "doing":
                this.doings.push(e);
                break;
              case "todo":
                this.todos.push(e);
                break;
              default:
                this.dones.push(e);
            }
            this.$emit('emitHasToken', true)
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEditPage(id) {
      console.log("GET EDIT PAGE")
      axios({
        method: 'GET',
        url: `http://localhost:3000/tasks/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({ data }) => {
        this.$emit('emitChangePage', data)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    goDelete(id) {
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/tasks/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({ data }) => {
        this.fetchTasks()
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  created() {
    this.fetchTasks();
  },
};
</script>

<style></style>
