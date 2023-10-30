<script setup lang="ts">
import { type Game } from "@/schemas/gameSchema";
import roundSchema, { type Round } from "@/schemas/roundSchema";
import clsx from "clsx";
import { onMounted, onUnmounted, ref } from "vue";

interface GameBoardProps extends Game {}

const { size, gameId } = defineProps<GameBoardProps>();

const currendIndex = ref(0);
const answer = ref(Array.from(Array(size).keys()).map(() => ""));

const rounds = ref<Round[]>([]);
const endGameMessage = ref<null | { message: string }>(null);

async function submitRound(answer: number[]) {
  const res = await fetch("http://localhost:3000/mmind", {
    method: "PATCH",
    body: JSON.stringify([gameId, ...answer]),
  });

  if (res.ok) {
    const data = await res.json();
    const round = roundSchema.safeParse(data);

    if (round.success) rounds.value.push({ move: answer, ...round.data });
    else if (data["message"]) {
      endGameMessage.value = data;
    }
  }
}

function handleKeyDown(e: KeyboardEvent) {
  if (endGameMessage.value) return;

  switch (e.key) {
    case "Backspace":
      if (currendIndex.value > 0) currendIndex.value--;

      answer.value[currendIndex.value] = "";
      break;
    case "Enter":
      if (answer.value.includes("")) break;

      submitRound(answer.value.map((digit) => +digit));
      break;
    default:
      if (/[0-9]/.test(e.key) && currendIndex.value < size) {
        const idx = currendIndex.value++;
        answer.value[idx] = e.key;
      }
      break;
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <div class="flex min-w-[250px] justify-between gap-4">
    <div
      v-for="(digit, i) in answer"
      :key="i"
      :class="
        clsx(
          'flex min-h-[50px] min-w-[50px] items-center justify-center rounded-md border p-2',
          currendIndex === i ? 'border-blue-400' : 'border-black',
        )
      "
    >
      {{ digit }}
    </div>
  </div>

  <div v-if="rounds.length">
    <div v-for="(round, i) in rounds" :key="i">
      <span>{{ round.move }},</span>
      <span> ⬜: {{ round.white }} ⬛: {{ round.black }} </span>
    </div>
  </div>

  <div v-if="endGameMessage">
    {{ endGameMessage.message }}
  </div>
</template>
