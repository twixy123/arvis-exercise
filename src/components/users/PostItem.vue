<template>
  <router-link
    tag="li"
    :to="`/user/${post.userId}/post/${post.id}`"
    class="user-page-body__item"
  >
    <h5 class="user-page-body__item__title ellipsis">
      {{ post.title }}
    </h5>
    <p class="user-page-body__item__content ellipsis">
      {{ post.body }}
    </p>
  </router-link>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>
