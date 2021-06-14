<template>
  <main class="container">
    <undraw-header></undraw-header>
    <!-- use the modal component -->
    <transition name="modal">
      <name-modal v-if="showModal" @close="showModal = false"> </name-modal>
    </transition>

    <transition name="modal">
      <welcome-modal
        v-if="welcomeModal && !showModal"
        @close="welcomeModal = false"
        @name-modal="showModal = true"
        :userName="userName"
      ></welcome-modal>
    </transition>

    <transition name="modal">
      <confirm-modal
        v-if="confirmModal"
        @close="confirmModal = false"
        @end="endQuiz()"
      ></confirm-modal>
    </transition>

      <transition name="modal">
      <refresh-modal
        v-if="refreshModal"
        @close="refreshModal = false"
        @refresh="recall"
      ></refresh-modal>
    </transition>

    <section id="selections" v-if="!showModal">
      <div class="container">
        <div class="row">
          <h2 class="text-center">Get Started!</h2>
          <p class="para">Select subject and year below</p>

          <transition>
            <div v-if="timeChecked">
              <p class="para fadeIn">
                Your time starts once you click the
                <strong>START</strong> button
              </p>
              <p class="para">
                <strong>50</strong> minutes is the allotted time
              </p>
            </div>
          </transition>

          <div class="selection">
            <div class="container d-grid gap-3">
              <div class="col-12">
                <select
                  @change="selectSubject($event)"
                  class="form-select"
                  aria-label="select subject"
                  :disabled="showQuestion"
                >
                  <option selected>Subject</option>

                  <option v-for="subject in subjects" :key="subject[0]">{{
                    subject
                  }}</option>
                </select>
              </div>

              <div class="col-12">
                <select
                  @change="selectYear($event)"
                  class="form-select"
                  aria-label="select year"
                  :disabled="showQuestion"
                >
                  <option selected>Year</option>
                  <option
                    v-for="year in years"
                    :key="year[0]"
                    :value="year.examyear"
                    >{{ year.examyear }}</option
                  >
                </select>
              </div>

              <div class="form-check" v-if="!showQuestion">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="timeChecked"
                  id="time"
                  @click="toggleChecked"
                />
                <label class="form-check-label" for="time">
                  Would you like a timed Quiz?
                </label>
              </div>

              <div class="timer para" v-if="timeChecked && showQuestion">
                <h3>Time left</h3>
                {{ prettyTime }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section style="margin-left:35px; margin-top:10px">
      <div class="container">
        <div class="row col-12">
          <base-button
            to="/quiz"
            class="btn-success"
            @click="fetchQuestion"
            v-if="isActive && !showQuestion"
            >Start</base-button
          >
        </div>
      </div>
    </section>

    <section id="question">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <base-spinner v-if="isLoading"></base-spinner>

            <ol v-else-if="showQuestion && questions && !isLoading">
              <h2>Question {{ index + 1 }} of {{ questions.length }}</h2>
              <li class="unstyle">
                <p v-if="section !== null">
                  <strong>{{ questions[index].section }}</strong>
                </p>

                <strong>{{ index + 1 }}.</strong><span>&nbsp; &nbsp;</span
                >{{ questions[index].question }}

                <ul>
                  <li v-for="(value, ind) in options" :key="ind">
                    <div>
                      ({{ ind }}) <span>&nbsp;</span>

                      <input
                        class="form-check-input"
                        type="radio"
                        name="answer"
                        :id="index + '-' + ind"
                        :key="index"
                        :value="ind"
                        aria-label="options"
                        v-model="chosenAnswers[index]"
                      />

                      <label
                        class="form-check-label"
                        :for="index + '-' + ind"
                        >{{ value }}</label
                      >
                    </div>
                  </li>
                </ul>
              </li>
            </ol>

            <score-board
              v-else-if="!showQuestion && questions && end"
              class="slideUp"
              :attemptedQuestions="attemptedQuestions"
              :length="questions.length"
              :score="score"
              :userName="userName"
            >
            </score-board>

            <base-dialog @close="handleError" :open="!!error">
              <p>{{ error }}</p>
              <button class="btn" @click="handleError">Close it!</button>
            </base-dialog>
          </div>
        </div>
      </div>
    </section>

    <section id="navigation">
      <div class="container">
        <div class="row">
          <div class="col-12 selection align">
            <div class="col-6 right">
              <base-button
                to="/quiz"
                class="btn-sm btn-primary"
                v-if="showQuestion"
                @click="prevQuestion"
              >
                Previous</base-button
              >
            </div>

            <div class="col-4 offset-2 ">
              <base-button
                to="/quiz"
                class="btn-sm btn-primary"
                v-if="showQuestion"
                @click="nextQuestion"
                >Next</base-button
              >
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-12 align">
            <div class="col-6 right">
              <base-button
                to="/quiz"
                class="btn-sm btn-outline-success"
                v-if="showQuestion"
                @click="confirmModal = true"
                >Submit</base-button
              >
            </div>

            <div class="col-4 offset-2">
              <base-button
                to="/quiz"
                class="btn-sm btn-outline-warning"
                v-if="showQuestion"
                @click="refreshModal = true"
              >
                Reset
              </base-button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <undraw-footer></undraw-footer>
  </main>
</template>

<script>
import axios from "axios";
import ScoreBoard from "../modals/ScoreBoard.vue";
import NameModal from "../modals/NameModal.vue";
import WelcomeModal from "../modals/WelcomeModal.vue";
import ConfirmModal from "../modals/ConfirmModal.vue";
import RefreshModal from"../modals/RefreshModal.vue";

export default {
  components: {
    ScoreBoard,
    NameModal,
    WelcomeModal,
    ConfirmModal,
    RefreshModal
  },
  data() {
    return {
      subjects: null,
      selectedSubject: "",
      selectedYear: "",
      years: null,
      questions: "",
      showQuestion: false,
      buttonVisible: false,
      options: null,
      score: 0,
      index: 0,
      isLoading: false,
      end: false,
      error: null,
      isChecked: false,
      section: null,
      answers: [],
      chosenAnswers: [],
      attemptedQuestions: 0,
      userName: "",
      showModal: true,
      welcomeModal: false,
      confirmModal: false,
      refreshModal:false,
      timeChecked: false,
      time: 3000,
      timer: null,
    };
  },
  computed: {
    isActive() {
      return this.selectedYear && this.selectedSubject !== "" ? true : false;
    },
    prettyTime() {
      let time = this.time / 60;
      let minutes = parseInt(time);
      let seconds = Math.round((time - minutes) * 60);
      return minutes + ":" + seconds;
    },
  },

  async mounted() {
    localStorage.getItem("userName");
    if (localStorage.getItem("userName")) {
      this.userName = localStorage.getItem("userName");
      this.showModal = false;
      this.welcomeModal = true;
    } else {
      this.showModal = true;
      this.welcomeModal = false;
    }
    setTimeout(() => {
      this.welcomeModal = false;
    }, 4000);
    try {
      const response = await axios.get(
        "https://questions.aloc.ng/api/metrics/list-subjects"
      );
      this.subjects = response.data.data;
    } catch (error) {
      this.loading = false;
      this.error = error.message || "Something went wrong, try again later!";
    }
  },
  methods: {
    async selectSubject(event) {
      this.selectedSubject = event.target.value;
      try {
        const response = await axios.get(
          `https://questions.aloc.ng/api/metrics/years-available-for/${this.selectedSubject}`
        );
        this.years = response.data.data;
      } catch (error) {
        this.loading = false;
        this.error =
          "Could not load subject, ensure a valid subject is selected";
      }
    },
    selectYear(event) {
      this.selectedYear = event.target.value;
    },
    calculateScore() {
      this.chosenAnswers.forEach((res, index) => {
        if (res !== undefined) {
          this.attemptedQuestions++;
        }
        if (this.questions[index].answer === res) {
          this.score = this.score + 1;
        }
      });
    },
    async fetchQuestion() {
      this.showQuestion = true;
      this.isLoading = true;
      this.score = 0;
      this.index = 0;

      try {
        const response = await axios.get(
          `https://questions.aloc.ng/api/m?subject=${this.selectedSubject}`
        );

        this.questions = response.data.data;
        console.log(this.questions[this.index]);
        this.options = this.questions[this.index].option;
        if (this.timeChecked) {
          this.time = 3000;
          this.start();
        }
        let i;
        for (i = 0; i < this.questions.length; i++) {
          this.answers.push(this.questions[i].answer);
        }

        this.isLoading = false;
        if (this.questions[this.index].section !== "") {
          this.section = this.questions[this.index].section;
        }
      } catch (error) {
        this.isLoading = false;
        this.error = error.message || "Something went wrong!";
      }
    },
    nextQuestion() {
      if (this.index >= 0 && this.index !== 39) {
        this.index++;
        this.options = this.questions[this.index].option;
      } else {
        this.endQuiz();
      }
    },
    prevQuestion() {
      if (this.index > 0 && this.index < this.questions.length) {
        this.index--;
        this.options = this.questions[this.index].option;
      }
      return this.index;
    },
    toggleChecked() {
      this.timeChecked = !this.timeChecked;
    },
    recall(){
      this.refreshModal = false;
      this.chosenAnswers = [];
      this.fetchQuestion()
    },
    start() {
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.time > 0) {
            this.time--;
          } else {
            clearInterval(this.timer);
            this.stop();
          }
        }, 1000);
      }
    },
    stop() {
      this.timer = null;
      this.endQuiz();
    },
    endQuiz() {
      this.showQuestion = false;
      this.end = true;
      this.confirmModal = false;
      this.calculateScore();
    },
    handleError() {
      this.error = null;
    },
  },
  watch: {
    userName(val) {
      this.userName = val;
    },
  },
};
</script>

<style scoped>
#question {
  margin: 5px 20px;
}

.central {
  padding: 0 100px;
}
.para {
  text-align: center;
}
.selection {
  margin: 30px 0px;
}
.start {
  width: 400px;
}
li {
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
  list-style: numeric;
}
.unstyle {
  box-shadow: none !important;
}
.right {
  margin-left: 23px;
}
.left {
  margin-right: 20px;
}
ol,
li {
  list-style: none;
  margin-right: 10px;
  margin-left: -20px;
}
input {
  margin-right: 20px;
}
.align {
  display: flex;
}
.timer {
  font-size: 1.7em;
}
button {
  font: inherit;
  padding: 0.5rem 2rem;
  border: 1px solid #810032;
  border-radius: 30px;
  background-color: #692d44;
  color: white;
  cursor: pointer;
}
.slideUp {
  font-size: 40px;
  text-align: center;
  margin-top: 20px;

  animation: fadeIn;
  animation-duration: 1s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-active {
  text-align: center;
  animation: fadeIn;
  animation-duration: 1s;
}
.v-leave-active {
  text-align: center;
  animation: fadeOut;
  animation-duration: 1s;
}
</style>
