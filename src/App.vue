<!-- eslint-disable vue/attribute-hyphenation -->
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
    <div v-if="matches">
      <DataTable :value="matches" show-grid-lines table-style=" min-width: 50rem" w-250 flex justify-center text-right>
        <Column field="date" header="Date" />
        <Column field="team1" header="Players team 1" />
        <Column field="team2" header="Players team 2" />
        <Column field="goals1" header="Goals team 1" />
        <Column field="goals2" header="Goals team 2" />
      </DataTable>
    </div>

    <div v-else>Loading...</div>
  </Suspense>
</template>
