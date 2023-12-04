import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = createApp({
  data() {
    return {
      playerHealth: 100,
      opponentHealth: 100,
      history: [],
    };
  },

  methods: {
    opponentAttack() {
      const value = getRandomValue(10, 20);

      this.playerHealth -= value;
      this.addToLog("opponent", "attacked", value);
    },

    playerAttack() {
      const value = getRandomValue(8, 15);

      this.opponentHealth -= value;

      this.addToLog("player", "attacked", value);

      this.opponentAttack();
    },

    specialAttack() {
      const value = getRandomValue(15, 20);

      this.opponentHealth -= value;

      this.addToLog("player", "attacked", value);

      this.opponentAttack();
    },

    playerHeal() {
      const value = getRandomValue(30, 50);
      if (this.playerHealth + value > 100) this.playerHealth = 100;
      else this.playerHealth += value;

      this.addToLog("player", "healed", value);

      this.opponentAttack();
    },

    playerConcede() {
      this.playerHealth = 100;
      this.opponentHealth = 100;
      this.history = [];
    },

    addToLog(who, what, byHowMuch) {
      this.history.push({
        who,
        what,
        byHowMuch,
      });
    },
  },

  computed: {
    opponentBarStyles() {
      return {
        width: `${this.opponentHealth}%`,
      };
    },

    playerBarStyles() {
      return {
        width: `${this.playerHealth}%`,
      };
    },

    isGameRunning() {
      return this.playerHealth > 0 && this.opponentHealth > 0;
    },
  },

  watch: {
    playerHealth(newValue) {
      console.log(`Player health: ${newValue}`);
    },

    opponentHealth(newValue) {
      console.log(`Opponent health: ${newValue}`);
    },
  },
});

app.mount("#game");
