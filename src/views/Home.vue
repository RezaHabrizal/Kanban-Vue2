<template>
  <div>
    <div>
      <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
          <b-navbar-brand href="#">Kanban Gan</b-navbar-brand>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-button @click.prevent="doLogOut" size="sm" class="my-2 my-sm-0" type="button"
                >LOGOUT</b-button
              >
            </b-navbar-nav>
        </b-navbar>
      </div>
      <div
        class="container-fluid d-flex justify-content-around"
        style="margin: 0;"
      >
        <div>
          <div class="d-flex justify-content-center">
            <h3 style="padding: 1rem; color: green;">Backlog</h3>
          </div>
          <div style="text-align: center;">
            <b-button v-b-modal.modal-prevent-closing>ADD TASK</b-button>
          </div>
          <Backlog
            v-for="(backlog, i) in backlogs"
            :key="i + 1"
            :backlog="backlog"
            @emitGetEdit="getEditPage"
            @emitGoDelete="goDelete"
          >
          </Backlog>
        </div>
        <div>
          <div class="d-flex justify-content-center">
            <h3 style="padding: 1rem; color: green;">Doing</h3>
          </div>
          <div style="text-align: center;">
            <b-button v-b-modal.modal-prevent-closing>ADD TASK</b-button>
          </div>
          <Doing
            v-for="(doing, i) in doings"
            :key="i + 1"
            :doing="doing"
            @emitGetEdit="getEditPage"
            @emitGoDelete="goDelete"
          >
          </Doing>
          <div></div>
        </div>
        <div>
          <div class="d-flex justify-content-center">
            <h3 style="padding: 1rem; color: green;">Todo</h3>
          </div>
          <div style="text-align: center;">
            <b-button v-b-modal.modal-prevent-closing>ADD TASK</b-button>
          </div>
          <Todo
            v-for="(todo, i) in todos"
            :key="i + 1"
            :todo="todo"
            @emitGetEdit="getEditPage"
            @emitGoDelete="goDelete"
          >
          </Todo>
        </div>
        <div>
          <div class="d-flex justify-content-center">
            <h3 style="padding: 1rem; color: green;">Done</h3>
          </div>
          <div style="text-align: center;">
            <b-button v-b-modal.modal-prevent-closing>ADD TASK</b-button>
          </div>
          <Done
            v-for="(done, i) in dones"
            :key="i + 1"
            :done="done"
            @emitGetEdit="getEditPage"
            @emitGoDelete="goDelete"
          >
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
import axios from "../API/BaseURL";
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
    BModal,
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
        url: "/tasks",
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
            e.dueDate = new Date(e.dueDate).toDateString()
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
            this.$emit("emitHasToken", true);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEditPage(id) {
      axios({
        method: "GET",
        url: `/tasks/${id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          data.dueDate = new Date(data.dueDate).toISOString().split('T')[0]
          this.$emit("emitChangePage", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goDelete(id) {
      axios({
        method: "DELETE",
        url: `/tasks/${id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          this.fetchTasks();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    doLogOut() {
      this.$emit('emitDoLogout')
    }
  },
  created() {
    this.fetchTasks();
  },
};
</script>

<style></style>
