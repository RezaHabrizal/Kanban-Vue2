<template>
<div>
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{ backlog.title }}</h5>
      <p class="card-text">
        {{backlog.description}}
      </p>
      <button type="button" class="btn btn-outline-info" @click.prevent="goEdit(backlog.id)">Edit</button>
      <button type="button" class="btn btn-outline-danger" @click.prevent="goDelete(backlog.id)">Delete</button>
    </div>
  </div>
</template>

<script>

export default {
    props: ['backlog'],
    data() {
        return {}
    },
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
