<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import type { Player } from '@/types'
import api from '@/api'

const players = ref<null | Player[]>(null)

onMounted(async () => {
  players.value = await api.player('name')
})
</script>

<template>
  <div class="text-green-4">PLAYERS PAGE</div>
  <Suspense>
    <table class="w[750px] border-collapse border border-gray-300">
      <thead class="bg-gray-200">
        <tr>
          <th class="w-[25%]">Player</th>
          <th class="w-[25%]">Matches</th>
          <th class="w-[25%]">Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in players" :key="player.name" class="odd:bg-gray-100 even:bg-white">
          <td class="w-1/3">{{ player.name }}</td>
          <td class="w-1/3">{{ player.matches }}</td>
          <td class="w-1/3">{{ player.score }}</td>
        </tr>
      </tbody>
    </table>
  </Suspense>
</template>
