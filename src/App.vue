<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { api } from '@/api'
import type { Match } from '@/types'

const matches = ref<null | Match[]>(null)

onMounted(async () => {
  try {
    matches.value = await api.list()
  }
  catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>

<template>
  <Suspense>
    <div v-if="matches && matches.length > 0">
      <table class="w[750px] border-collapse border border-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th class="w-[25%]">Date</th>
            <th class="w-[25%]">Team 1</th>
            <th class="w-[25%]">Team 2</th>
            <th class="w-[25%]">Goals Team 1</th>
            <th class="w-[25%]">Goals Team 2</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="match in matches" :key="match.date" class="odd:bg-gray-100 even:bg-white">
            <td class="w-[25%]">{{ match.date }}</td>
            <td class="w-[25%]">{{ match.team1 }}</td>
            <td class="w-[25%]">{{ match.team2 }}</td>
            <td :class="{ 'text-green-500': match.goals1 > match.goals2, 'text-red-500': match.goals1 < match.goals2 }">{{
              match.goals1 }}</td>
            <td :class="{ 'text-green-500': match.goals2 > match.goals1, 'text-red-500': match.goals2 < match.goals1 }">{{
              match.goals2 }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>Loading...</div>
  </Suspense>
</template>
