<template>
  <router-link
    :to="`/user/${user.id}`"
    tag="li"
    class="users-menu__item"
    active-class="is_active"
  >
    {{ user.name }}
    <span v-if="user.email" class="users-menu__item__email">{{
      user.email
    }}</span>
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
