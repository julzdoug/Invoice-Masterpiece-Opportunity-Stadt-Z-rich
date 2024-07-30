<script setup>
  import { supabase } from '../utils/supabase'
  const todos = ref([])

  async function getTodos() {
    const { data } = await supabase.from('todos').select()
    todos.value = data
  }

  onMounted(() => {
    getTodos()
  })
</script>
<template>

  <div class="max-w-7xl p-10 m-auto">
    <router-view />
  </div>
</template>
