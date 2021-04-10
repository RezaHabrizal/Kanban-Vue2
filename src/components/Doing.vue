<template>
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{ doing.title }}</h5>
      <p class="card-text">
        {{ doing.description }}
      </p>
      <button type="button" class="btn btn-outline-info" @click.prevent="goEdit(doing.id)">Edit</button>
      <button type="button" class="btn btn-outline-danger" @click.prevent="goDelete(doing.id)">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["doing"],
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
