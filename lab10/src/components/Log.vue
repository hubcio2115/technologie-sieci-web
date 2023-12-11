<script setup>
/**
 * @type {{
 * history: import("../App.vue").Round[]
 * }}
 */
const { history } = defineProps({
  history: {
    required: true,
    type: Array,
  },
});
</script>

<template>
  <section id="log" class="container">
    <h2>Battle Log</h2>

    <ul v-for="({ who, what, byHowMuch }, index) in history">
      <li :key="index">
        <span :class="who === 'player' ? 'log--player' : 'log-opponent'"
          >{{ who }}
        </span>

        {{ what }} for

        <span :class="what === 'attacked' ? 'log--damage' : 'log-heal'">
          {{ byHowMuch }}</span
        >
      </li>
    </ul>
  </section>
</template>
