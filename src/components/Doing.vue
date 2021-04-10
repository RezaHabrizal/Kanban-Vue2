<template>
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <label for="">Title</label>
      <h5 class="card-title">{{ doing.title }}</h5>
      <label for="">Description</label>
      <h6 class="card-text">
        {{ doing.description }}
      </h6>
      <label for="">Due Date</label>
      <h6 class="card-text">
        {{ doing.dueDate }}
      </h6>
      <label for="">author</label>
      <h6 class="card-text">
        {{ doing.User.name }}
      </h6>
      <button
        type="button"
        class="btn btn-outline-info"
        @click.prevent="goEdit(doing.id)"
      >
        Edit
      </button>
      <button
        type="button"
        class="btn btn-outline-danger"
        @click.prevent="goDelete(doing.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["doing"],
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
