<template>
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <label for="">Title</label>
      <h5 class="card-title">{{ todo.title }}</h5>
      <label for="">Description</label>
      <h6 class="card-text">
        {{ todo.description }}
      </h6>
      <label for="">Due Date</label>
      <h6 class="card-text">
        {{ todo.dueDate }}
      </h6>
      <label for="">author</label>
      <h6 class="card-text">
        {{ todo.User.name }}
      </h6>
      <button
        type="button"
        class="btn btn-outline-info"
        @click.prevent="goEdit(todo.id)"
      >
        Edit
      </button>
      <button
        type="button"
        class="btn btn-outline-danger"
        @click.prevent="goDelete(todo.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["todo"],
  methods: {
    goEdit(id) {
      this.$emit("emitGetEdit", id);
    },
    goDelete(id) {
      this.$emit("emitGoDelete", id);
    },
  },
};
</script>

<style></style>
