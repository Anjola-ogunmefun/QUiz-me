<template>
  <div id="modal-template">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>Welcome to Quiz Me!</h3>
          </div>

          <div class="modal-body text-center">
            <div>
              <p>What would you like to be called?</p>
              <input type="text" id="userName" v-model.trim="userName" />
            </div>
  
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-sm btn-primary"
              @click="saveName"
            >
              save
            </button>
            <button
              class="modal-default-button btn btn-sm btn-warning"
              @click="notNow"
            >
              Not now
            </button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      
    };
  },
  methods: {
    saveName() {
      localStorage.clear();
      localStorage.setItem("userName", this.userName);
      this.$emit('close')
     
      console.log(this.userName);
    },
    notNow() {
      localStorage.setItem("userName", 'User');
      this.userName = 'User'
      this.$emit('close')
    },
  },
};
</script>

<style scoped>
.modal-container {
  width: 250px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -5rem;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

@media only screen and (min-width: 768px) {
 .modal-container{
   width: 500px;
 }
 
}
</style>
