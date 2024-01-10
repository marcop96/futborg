<script setup lang="ts">
import { onMounted, ref } from 'vue'
import api from '@/api'
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
    <div v-if="matches && matches.length > 0" class="flex flex-col pt-7">
      <h2 class="text-2xl font-bold mx-auto pb-5">Matches</h2>
      <table class=" w-2/3  border-collapse border border-gray-300 mx-auto">
        <thead class="bg-gray-200">
          <tr>
            <th class="min-w-[20%]">Date</th>
            <th class="min-w-[20%]">Team 1</th>
            <th class="min-w-[20%]">Team 2</th>
            <th class="min-w-[20%]">Goals Team 1</th>
            <th class="min-w-[20%]">Goals Team 2</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="match in matches" :key="match.date" class="odd:bg-gray-100 even:bg-white">
            <td class="max-w-1/5">{{ match.date }}</td>
            <td class="w-1/5">{{ match.team1 }}</td>
            <td class="w-1/5">{{ match.team2 }}</td>
            <td class="w-1/5 text-right"
              :class="{ 'text-green-500': match.goals1 > match.goals2, 'text-red-500': match.goals1 < match.goals2 }">
              {{ match.goals1 }}
            </td>
            <td class="w-1/5 text-right p-5"
              :class="{ 'text-green-500': match.goals2 > match.goals1, 'text-red-500': match.goals2 < match.goals1 }">
              {{ match.goals2 }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>Loading...</div>
  </Suspense>
</template>

```
