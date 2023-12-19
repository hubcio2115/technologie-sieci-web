<script setup>
import { computed } from "vue";

const props = /** @type {{
 *   readonly id: "opponent" | "player";
 *   readonly health: number;
 * }}
 */ (
  defineProps({
    health: {
      required: true,
      type: Number,
    },
    id: {
      required: true,
      type: String,
      /**
       * @param {string} value
       * @returns {boolean}
       */
      validator(value) {
        return ["opponent", "player"].includes(value);
      },
    },
  })
);

const barStyle = computed(() => {
  return {
    width: `${props.health >= 0 ? props.health : 0}%`,
  };
});
</script>

<template>
  <section :id="props.id" class="container">
    <h2 class="player_tag">{{ props.id }}</h2>

    <div class="healthbar">
      <span class="healthvalue">{{ props.health }}%</span>
      <div class="healthbar__value" :style="barStyle"></div>
    </div>
  </section>
</template>

<style scoped>
.container {
  text-align: center;
  padding: 0.5rem;
  margin: 1rem auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
}

.player_tag {
  text-transform: capitalize;
}

.healthbar {
  width: 100%;
  height: 40px;
  border: 1px solid #575757;
  margin: 1rem 0;
  background: #d8d8d8;
  position: relative;
}

.healthvalue {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.healthbar__value {
  background-color: #00a876;
  width: 100%;
  height: 100%;
}

#opponent h2,
#player h2 {
  margin: 0.25rem;
}
</style>
