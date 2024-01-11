<script setup lang='ts'>
import { RouterView } from 'vue-router'
</script>

<template>
  <router-link to="/">Matches</router-link>
  <router-link to="/players">Players</router-link>
  <RouterView />
</template>
