<template>
  <div id="cardd" class="card" style="width: 18rem;">
    <div class="card-body">
      <label for="">Title</label>
      <h5 class="card-title">
        {{ task.title }}
        <div class="container d-flex flex-row-reverse" style="font-size: 12px;">
          by: {{ task.user }}
        </div>
        <div class="container d-flex flex-row-reverse" style="font-size: 12px;">
          created at: {{ task.createdAt }}
        </div>
      </h5>
      <label for="">Description</label>
      <h6 class="card-text">
        {{ task.description }}
      </h6>
      <label for="">Due Date</label>
      <h6 class="card-text">
        {{ task.dueDate }}
      </h6>
      <label for="">category</label>
      <h6 class="card-text">
        {{ task.category }}
      </h6>
      <button
        type="button"
        class="btn btn-outline-info"
        @click.prevent="goEdit(task.id)"
      >
        Edit
      </button>
      <button
        type="button"
        class="btn btn-outline-danger"
        @click.prevent="goDelete(task.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["task"],
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

<style>

</style>
