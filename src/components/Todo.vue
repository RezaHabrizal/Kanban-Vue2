<template>
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{ todo.title }}</h5>
      <p class="card-text">
        {{ todo.description }}
      </p>
      <button type="button" class="btn btn-outline-info" @click.prevent="goEdit(todo.id)">Edit</button>
      <button type="button" class="btn btn-outline-danger" @click.prevent="goDelete(todo.id)">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["todo"],
  methods: {
    goEdit(id) {
      this.$emit('emitGetEdit', id)
    },
    goDelete(id) {
      this.$emit('emitGoDelete', id)
    }
  }
};
</script>

<style></style>
