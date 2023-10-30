<script setup lang="ts">
import gameSchema, { type Game } from "@/schemas/gameSchema";
import { ref } from "vue";

import GameBoard from "./components/GameBoard.vue";

const size = ref(4);
const max = ref(5);
const dim = ref(9);

const game = ref<Game | null>(null);

async function startGame() {
  const res = await fetch("http://localhost:3000/mmind", {
    method: "POST",
    body: JSON.stringify({
      size: size.value,
      max: max.value,
      dim: dim.value,
    }),
  });

  if (res.ok) {
    const data = gameSchema.safeParse(await res.json());

    if (data.success) game.value = data.data;
    else console.log(data.error);
  }
}
</script>

<template>
  <main
    class="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-100"
  >
    <h1 class="text-2xl font-bold">Welcome to mastermind!</h1>

    <div v-if="!game" class="flex flex-col gap-4">
      <label for="size">
        Size:
        <input
          type="number"
          name="size"
          v-model="size"
          class="rounded-md border border-black p-1"
        />
      </label>

      <label for="max">
        Max:
        <input
          type="number"
          name="max"
          v-model="max"
          class="rounded-md border border-black p-1"
        />
      </label>

      <label for="dim">
        Dim:
        <input
          type="number"
          name="dim"
          v-model="dim"
          class="rounded-md border border-black p-1"
        />
      </label>

      <button
        @click="startGame"
        class="rounded-md border border-green-600 bg-green-400 px-4 py-2 text-green-900 hover:bg-green-300 active:bg-green-400"
      >
        Start a Game!
      </button>
    </div>

    <GameBoard
      v-else
      :size="size"
      :max="max"
      :game-id="game.gameId"
      :round="game.round"
      :dim="dim"
    />
  </main>
</template>
