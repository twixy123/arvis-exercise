<template>
  <router-link :to="`/user/${user.id}`" tag="li">
    {{ user.name }}
  </router-link>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
