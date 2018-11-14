<template>
  <div>
    <div class="btn-group btn-group-justified form-group social-links visible-xs visible-sm" role="group">
      <a href="https://twitter.com/snapwich" target="_blank" class="btn fa fa-twitter"></a>
      <a href="https://github.com/snapwich" target="_blank" class="btn fa fa-github-alt"></a>
      <a href="https://www.linkedin.com/in/richsnapp" target="_blank" class="btn fa fa-linkedin"></a>
    </div>
    <p>Feel free to contact by clicking the social icons above or using the form below. Be sure to include a return
      email address or some form of contact information in the message body if you'd appreciate a response.</p>
    <form name="contact" novalidate class="contact-form" v-on:submit.prevent>
      <div v-if="!submitted">
        <div class="row">
          <div class="form-group col-sm-6" :class="{'has-error': submitAttempted && errors.has('name')}">
            <label class="control-label">Name</label>
            <input name="name" class="form-control" v-model="name" type="text" placeholder="Your name"
                   v-validate="{required: true}" />
          </div>
          <div class="form-group col-sm-6" :class="{'has-error': submitAttempted && errors.has('email')}">
            <label class="control-label">Email</label>
            <input name="email" class="form-control" v-model="email" type="email"
                   placeholder="Your email address" v-validate="{required: true, email: true}" />
          </div>
        </div>
        <div class="form-group" :class="{'has-error': submitAttempted && errors.has('message')}">
          <label class="visible-xs control-label">Message</label>
          <textarea name="message" class="form-control" v-model="message"
                    placeholder="Your message of subtle adoration or admonishment"
                    v-validate="{required: true}"></textarea>
        </div>
        <div class="row">
          <div class="form-group form-group col-sm-8"
               :class="{'has-error': submitAttempted && errors.has('recaptcha')}">

          </div>
          <div class="form-group col-sm-4">
            <vue-recaptcha ref="captcha" @verify="onVerify" sitekey="6LdL9T4UAAAAALj9ztC5O1Unlh1Y-Mf8OjFBUpo0">
              <input type="submit" class="btn btn-default"/>
            </vue-recaptcha>
          </div>
        </div>
      </div>
      <div class="alert alert-danger" v-for="error in errorMessages">
        <strong>{{error.name}}</strong>: {{error.message}}
      </div>
      <div class="alert alert-danger" v-if="submitAttempted && errors.any()" role="alert">
        Please correct the marked fields and try again.
      </div>
      <div class="alert alert-success" v-if="submitted" role="alert">
        Your message has been successfully sent.
      </div>
    </form>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VeeValidate from 'vee-validate';
  import VueRecaptcha from 'vue-recaptcha';
  import * as _ from 'lodash';

  Vue.use(VeeValidate);

  export default {
    head() {
      return {
        script: [
          { src: "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit" }
        ]
      }
    },
    data() {
      return {
        name: null,
        email: null,
        message: null,
        recaptcha: false,
        submitted: false,
        submitAttempted: false,
        errorMessages: []
      };
    },
    methods: {
      onVerify(recaptcha) {
        this.submitAttempted = true;
        this.$validator.validateAll().then((valid) => {
          if (valid) {
            this.$axios.post('https://us-central1-richsnapp-174618.cloudfunctions.net/mail', {
              name: this.name,
              email: this.email,
              message: this.message,
              recaptcha
            }).then((result) => {
              this.submitted = true;
            }).catch((err) => {
              let message = _.get(err, 'data.message');
              if (!message) {
                message = 'There was an error submitting your message'
              }

              this.$refs.captcha.reset();

              if (err.status === 'fail') {
                _.forEach(err.data.data).forEach((message, name) => {
                  this.errorMessages.push({name, message});
                })
              } else {
                this.submitAttempted = false;
                this.errorMessages.push({name: "error", message});
              }
            });
          } else {
            this.$refs.captcha.reset();
          }
        });
      }
    },
    components: {
      VueRecaptcha
    }
  };
</script>

<style lang="less" scoped>
  @import "../assets/variables.less";

  .btn:active {
    box-shadow: none;
  }

  textarea {
    min-height: 250px;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }
  .social-links a {
    padding: 6px;
    font-size: 26px;
    color: @gray-lighter;
    &:hover {
      color: @brand-primary;
    }
  }
  form {
    input[type=submit] {
      width: 100%;
    }

    .has-error {
      .recaptcha {
        position: relative;
        :before {
          content: "*";
          position: absolute;
          font-size: 28px;
          font-weight: 700;
          color: #a94442;
          left: 3px;
          top: -11px;
        }
      }
    }
  }
</style>
