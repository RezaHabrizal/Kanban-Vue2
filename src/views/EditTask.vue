<template>
  <div class="d-flex justify-content-center flex-direction:column align-items-center" style="height: 800px;">
    <b-form @submit.prevent="$emit('getEdit')">
        <b-form-group
        id="input-group-1"
          label="Edit Task"
          label-for="Task-input"
          invalid-feedback="All field is required"
        >
          title
          <b-form-input
            v-model="editValue.title"
            required
          ></b-form-input>
          description
          <b-form-input
            label="description"
            id="description-input"
            v-model="editValue.description"
            required
          ></b-form-input>
          due date
          <b-form-input
          v-model="editValue.dueDate"
            label="due date"
            type="date"
            id="due_date-input"
            required
          ></b-form-input>
          category
          <b-form-select
            v-model="editValue.category"
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

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
  export default {
    props: ['editValue'],
    data() {
      return {}
    }
  }
</script>

<style>

</style>