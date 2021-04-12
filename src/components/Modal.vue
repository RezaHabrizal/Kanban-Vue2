<template>
  <!-- Modal -->
  <div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Task"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Add Task"
          label-for="Task-input"
          invalid-feedback="All field is required"
          :state="allState"
        >
          title
          <b-form-input
            
            v-model="title"
            :state="allState"
            required
          ></b-form-input>
          description
          <b-form-input
            label="description"
            id="description-input"
            v-model="description"
            :state="allState"
            required
          ></b-form-input>
          due date
          <b-form-input
            label="due date"
            type="date"
            id="due_date-input"
            v-model="due_date"
            :state="allState"
            required
          ></b-form-input>
          category
          <b-form-select
            v-model="category"
            class="form-select"
            aria-label="Default select example"
          >
            <option selected>Open this select menu</option>
            <option value="backlog">Backlog</option>
            <option value="doing">Doing</option>
            <option value="todo">Todo</option>
            <option value="done">Done</option>
          </b-form-select>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "../API/BaseURL";
export default {
 
  data() {
    return {
      title: "",
      description: "",
      category: "",
      priority: "",
      due_date: "",
      // name: "",
      allState: null,
      // submittedNames: [],
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    createTask() {},
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.allState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.allState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      axios({
        method: "POST",
        url: "/tasks",
        data: {
          title: this.title,
          description: this.description,
          category: this.category,
          priority: this.priority,
          dueDate: this.due_date,
        },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          this.$emit("emitCreatedTask");
        })
        .catch((err) => {
          console.log(err);
        });
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      // this.submittedNames.push(this.name);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    getTitle(title) {
      this.title = this.task.title
    }
  },
};
</script>

<style></style>
