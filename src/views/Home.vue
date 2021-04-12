<template>
  <div>
    <div>
      <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
          <b-navbar-brand href="#">Kanban Gan</b-navbar-brand>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-button
              @click.prevent="doLogOut"
              size="sm"
              class="my-2 my-sm-0"
              type="button"
              >LOGOUT</b-button
            >
          </b-navbar-nav>
        </b-navbar>
      </div>
      <div
        class="container-fluid d-flex justify-content-around"
        style="margin: 0;"
      >
        <div v-for="(board, i) in boards" :key="i + 1">
          <div class="d-flex justify-content-center">
            <h3 style="padding: 1rem; color: green;">{{ board.name }}</h3>
          </div>
          <div style="text-align: center;">
            <b-button v-b-modal.modal-prevent-closing>ADD TASK</b-button>
          </div>
          <draggable
            v-model="board.tasks"
            @start="drag = true"
            @end="drag = true"
          >
            <Cards
              v-for="(task, i) in board.tasks"
              :key="i + 1"
              :task="task"
              @emitGetEdit="getEditPage"
              @emitGoDelete="goDelete"
            ></Cards>
          </draggable>
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
import Modal from "../components/Modal";
import { BModal, VBModal } from "bootstrap-vue";
import Cards from "../components/Cards";
import draggable from "vuedraggable";

export default {
  components: {
    Modal,
    BModal,
    Cards,
    draggable,
  },
  directives: {
    "b-modal": VBModal,
  },
  data() {
    return {
      boards: [
        { name: "backlog", tasks: [] },
        { name: "doing", tasks: [] },
        { name: "todo", tasks: [] },
        { name: "done", tasks: [] },
      ],
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
          this.boards = [
            { name: "backlog", tasks: [] },
            { name: "doing", tasks: [] },
            { name: "todo", tasks: [] },
            { name: "done", tasks: [] },
          ];
          response.data.tasks.forEach((e, i) => {
            e.dueDate = new Date(e.dueDate).toDateString();
            e.createdAt = new Date(e.createdAt).toDateString();
            this.boards.forEach((el) => {
              if (el.name === e.category) {
                el.tasks.push({
                  id: e.id,
                  title: e.title,
                  description: e.description,
                  category: e.category,
                  dueDate: e.dueDate,
                  user: e.User.name,
                  createdAt: e.createdAt,
                });
              }
            });
          });
          console.log(this.boards);
          this.$emit("emitHasToken", true);
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
          data.dueDate = new Date(data.dueDate).toISOString().split("T")[0];
          this.$emit("emitChangePage", data);
        })
        .catch((err) => {
          let splitedErr = err.message.split(" ");
          let status = splitedErr[splitedErr.length - 1];
          if (status === "401") {
            this.$swal("dont have access to edit this tasks");
          }
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
          let splitedErr = err.message.split(" ");
          let status = splitedErr[splitedErr.length - 1];
          if (status === "401") {
            this.$swal("dont have access to delete this tasks");
          }
        });
    },
    doLogOut() {
      this.$emit("emitDoLogout");
    },
  },
  created() {
    this.fetchTasks();
    // console.log(this.board, "this board di created ")
  },
};
</script>

<style></style>
