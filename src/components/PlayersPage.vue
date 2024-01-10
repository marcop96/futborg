<script setup lang='ts'>
import api from '@/api'

const players = await api.player
</script>

<template>
  <pre v-if="players">{{ players }}</pre>
</template>
