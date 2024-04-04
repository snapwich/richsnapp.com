<template>
  <div>
    <a
      href="https://www.linkedin.com/in/richsnapp/"
      class="social"
      target="_blank"
    >
      <div class="social-left">
        <i class="fa-brands fa-linkedin" />
      </div>
      <div class="social-body">
        <h4>LinkedIn</h4>
        @richsnapp
      </div>
    </a>
    <a
      href="https://www.facebook.com/rich.snapp"
      class="social"
      target="_blank"
    >
      <div class="social-left">
        <i class="fa-brands fa-facebook" />
      </div>
      <div class="social-body">
        <h4>Facebook</h4>
        @rich.snapp
      </div>
    </a>
    <a href="https://www.twitter.com/snapwich" class="social" target="_blank">
      <div class="social-left">
        <i class="fa-brands fa-twitter" />
      </div>
      <div class="social-body">
        <h4>Twitter</h4>
        @snapwich
      </div>
    </a>
    <a href="https://www.github.com/snapwich" class="social" target="_blank">
      <div class="social-left">
        <i class="fa-brands fa-github" />
      </div>
      <div class="social-body">
        <h4>Github</h4>
        @snapwich
      </div>
    </a>
    <a href="https://medium.com/@snapwich" class="social" target="_blank">
      <div class="social-left">
        <i class="fa-brands fa-medium" />
      </div>
      <div class="social-body">
        <h4>Medium</h4>
        @snapwich
      </div>
    </a>
    <a href="https://hachyderm.io/@snapwich" class="social" target="_blank">
      <div class="social-left">
        <i class="fa-brands fa-mastodon" />
      </div>
      <div class="social-body">
        <h4>Mastodon</h4>
        @snapwich
      </div>
    </a>
    <a
      href="https://www.instagram.com/britishgracie"
      class="social"
      target="_blank"
    >
      <div class="social-left">
        <i class="fa-brands fa-instagram" />
      </div>
      <div class="social-body">
        <h4>Cats of Instagram</h4>
        @britishgracie
      </div>
    </a>
  </div>
</template>

<style lang="less" scoped>
a.social {
  display: flex;
  margin-bottom: 15px;
  padding: 15px 20px;
  border-radius: 10px;
  background: #f8f8f8;
  &:hover {
    background: #f0f0f0;
  }
  i {
    font-size: 50px;
    width: 80px;
  }
  h4 {
    margin: 0;
  }
  .social-body {
    align-content: flex-end;
  }
}
a.social,
a.social a {
  text-decoration: none;
  border-bottom: 0 !important;
  box-shadow: none !important;
}
</style>
