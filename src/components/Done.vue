<template>
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <label for="">Title</label>
      <h5 class="card-title">{{ done.title }}</h5>
      <label for="">Description</label>
      <h6 class="card-text">
        {{ done.description }}
      </h6>
      <label for="">Due Date</label>
      <h6 class="card-text">
        {{ done.dueDate }}
      </h6>
      <label for="">author</label>
      <h6 class="card-text">
        {{ done.User.name }}
      </h6>
      <button
        type="button"
        class="btn btn-outline-info"
        @click.prevent="goEdit(done.id)"
      >
        Edit
      </button>
      <button
        type="button"
        class="btn btn-outline-danger"
        @click.prevent="goDelete(done.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["done"],
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
