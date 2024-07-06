<template lang="md">
  I have had many debates on the best ways to build web applications and I have some strong opinions about it. However,
  some smart people have already come up with some guidelines that I think mirror my opinions pretty closely so I'm
  noting them here for future reference.

  ## The Twelve-Factor App
  [The Twelve-Factor App](https://12factor.net/) describes what I believe are some good recommendations for building
  a _mature_ web application. I don't think you need to follow all of these recommendations for every web application
  but as you grow in size, developers, and maturity you should probably be following them pretty closely.

  ## Minimum CD
  [Minimum Continuous Deployment](https://minimumcd.org/) describes a similar set of guidelines but with a focus on
  continuous deployment. I am actually not a huge fan of trunk-based development, but that being said I still
  think you should not stray _too far_ from trunk-based development. I think stressing a rigid requirement
  to deploy daily is a bit much, but I think using short-lived feature branches and a simple gitflow model
  can be a good compromise that still allows for a good release cadence.
</template>

<script lang="ts">
export default {
  tags: ["blog", "notes", "webdev", "devops"]
};
</script>
