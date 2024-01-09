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
      <div v-for="match in matches" v-if="matches" :key="match.date">
        <DataTable :value="matches" table-style="min-width: 50rem">
          <Column field="date" header="Code">{{ matches. }}</Column>
          <Column field="name" header="Name" />
          <Column field="category" header="Category" />
          <Column field="quantity" header="Quantity" />
        </DataTable>
      </div>
      <div v-else>Loading...</div>
    </div>
  </Suspense>
</template>
