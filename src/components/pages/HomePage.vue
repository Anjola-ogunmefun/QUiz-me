<template>
  <main>
    <undraw-header></undraw-header>
    <section id="about">
      <div class="container">
        <div class="row">
          <div class="col-md-6 down">
            <h1 class="heading">Quiz me</h1>

            <p class="lead">
              <span>Quiz me</span> gives you free access to over 5,000 practice
              questions to prepare adequately for your UTME, WASSCE and
              POST-UTME
            </p>
            <!-- <p class="lead">
              there’s room for everyone to exert themselves, test their ideas,
              and go wrong. This allows you to figure out what you know, what
              you don’t, what you need to focus on, and how to improve.
            </p> -->
            <p class="lead">
              The app can be used anytime, anywhere, at home, work, or even on
              the go on multiple devices – whether that’s a smartphone, tablet,
              laptop, or desktop device. It Provides instant grading and dynamic
              feedback to address common misconceptions and errors, reinforce
              key points, and close the knowledge gaps.
            </p>
          </div>

          <div class="col-md-6">
            <base-button to="/quiz" class="btn-primary">Take Quiz</base-button>

            <img
              src="../../utils/undraw_book_lover_mkck.svg"
              class="img-fluid"
              alt="girl reading"
            />
          </div>
        </div>
        <hr />
      </div>
    </section>

    <section id="usage">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <img
              src="../../utils/undraw_online_test_gba7.svg"
              class="img-fluid"
              alt="online test"
            />
          </div>

          <div class="col-md-6">
            <h1 class="heading">Want to get the best out of Quiz me?</h1>
            <p class="lead">
              We recommend that students take the following steps in order to
              maximize Quize me;
            </p>
            <ul>
              <li class="lead">
                Carve out a quiet test-taking spot with minimal distractions
              </li>
              <li class="lead">
                Gather all that you’ll need to take the test.
              </li>
              <li class="lead">Take a deep breath!</li>
              <li class="lead">Keep an eye on the clock.</li>
              <li class="lead">Don’t leave the test page!</li>
              <li class="lead">Check your work before you submit it.</li>
              <li class="lead">Check your grade.</li>
              <li class="lead">
                Ask yourself how you can improve on the next exam.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="ready">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h3><strong>We are ready whenever You are!</strong></h3>
            <base-button to="/quiz" class="btn-primary put"
              >Take Quiz</base-button
            >
          </div>
        </div>
      </div>
    </section>

    <undraw-footer></undraw-footer>
  </main>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

main {
  font-family: "Times New Roman", Times, serif;
}

body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
.heading {
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
}
#about span {
  font-size: 25px;
}
#about {
  margin-bottom: 30px;
}
#usage {
  margin-bottom: 30px;
}
#ready h3 {
  text-align: center;
}

.put {
  margin-left: auto;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  #about img {
    margin: 35px 0;
  }
  #usage img {
    margin: 35px 0;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  #about img {
    margin-left: 30px;
    margin-top: 60px;
  }
  #usage img {
    margin-right: 40px;
    margin-top: 60px;
  }
}
@media only screen and (min-width: 768px) {
  .down {
    margin-top: 150px;
  }
}
</style>
