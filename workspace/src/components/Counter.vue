<script setup lang="ts">
const store = useCounterStore()
</script>

<template>
  <section class="flex items-center gap-20 text-20">
    <span class="w-50">{{ store.count }}</span>
    <button
      class="flex items-center justify-center bg-transparent"
      @click="store.increment"
    >
      <IconAdd />
    </button>
  </section>
</template>
