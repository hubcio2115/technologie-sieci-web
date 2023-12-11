<script setup>
import Header from "./components/Header.vue";
import Entity from "./components/Entity.vue";
import Button from "./components/Button.vue";
import { computed, ref } from "vue";
import { getRandomValue } from "./utils/getRandomValue.js";

const opponentHealth = ref(100);
const playerHealth = ref(100);
const isGameRunning = computed(
  () => playerHealth.value > 0 && opponentHealth.value > 0,
);

/**
 * @typedef {{who: "opponent" | "player"; what: "attacked" | "healed"; byHowMuch: number;}} Round
 * @type {import("vue").Ref<Round[]>}
 */
const history = ref([]);

/**
 * @param {Round['who']} who
 * @param {Round['what']} what
 * @param {Round['byHowMuch']} byHowMuch
 */
function addToLog(who, what, byHowMuch) {
  history.value.push({
    who,
    what,
    byHowMuch,
  });
}

function opponentAttack() {
  if (opponentHealth.value <= 0) return;

  const value = getRandomValue(10, 20);

  playerHealth.value -= value;
  addToLog("opponent", "attacked", value);
}

function playerAttack() {
  const value = getRandomValue(8, 15);

  opponentHealth.value -= value;

  addToLog("player", "attacked", value);

  opponentAttack();
}

function specialAttack() {
  const value = getRandomValue(15, 20);

  opponentHealth.value -= value;

  addToLog("player", "attacked", value);

  opponentAttack();
}

function playerHeal() {
  const value = getRandomValue(30, 50);
  if (playerHealth.value + value > 100) playerHealth.value = 100;
  else playerHealth.value += value;

  addToLog("player", "healed", value);

  opponentAttack();
}

function playerConcede() {
  playerHealth.value = 100;
  opponentHealth.value = 100;
  history.value = [];
}
</script>

<template>
  <Header />

  <div>
    <Entity id="opponent" :health="opponentHealth" />

    <Entity id="player" :health="playerHealth" />
  </div>

  <section id="controls" v-if="isGameRunning">
    <Button @click="playerAttack">attack</Button>

    <Button @click="specialAttack" :disabled="history.length % 3 === 0">
      attack++
    </Button>

    <Button @click="playerHeal" :disabled="history.length % 5 === 0">
      heal
    </Button>

    <Button @click="playerConcede">concede</Button>
  </section>

  <section id="controls" v-else>
    {{ playerHealth >= 0 ? "You won!" : "You lost!" }}
    <Button @click="playerConcede">Play Again?</Button>
  </section>
</template>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: "Jost", sans-serif;
}

body {
  margin: 0;
  background-color: aliceblue;
}

section {
  width: 90%;
  max-width: 40rem;
  margin: auto;
}

#controls {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
