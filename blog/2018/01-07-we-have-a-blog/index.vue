
<template lang="md">
  One of my goals with this new year has been to start writing more frequently, be it technical articles or just my
  thoughts and ramblings.  I've considered [Medium](http://www.medium.com/@snapwich) in the past (and still might
  duplicate some of my writing there), but felt the platform just isn't quite there yet for the purpose of writing
  technical articles. I have read many well-written technical articles there that I felt were held back by the
  limitations of the platform. I'm of the strong opinion that **learning is doing**, and limiting educational writing
  to text and graphics isn't the best medium for doing.

  <figure class="small right">
    <img src="./fireworks.gif" />
    <figcaption>With new years comes new resolutions.</figcaption>
  </figure>

  So... after much struggle and some consistent head to desk interactions I have successfully added blog functionality
  to my static website!  Since each of my articles on this website are [Single File Vue Components](https://vuejs.org/v2/guide/single-file-components.html)
  , the mingling of text and technical code examples should be a seamless experience.  Also, since [this website is hosted
  on Github Pages](https://github.com/snapwich/richsnapp.com/blob/master/blog/2018/01-07-we-have-a-blog/index.vue),
  readers have a way to provide easy feedback and hopefully updates to my more-than-likely buggy demonstrations.  I like
  my code to be open source, so why not my articles?

  I still have some things on my wish list to hopefully make my writing and these articles as productive as possible, so
  hopefully I'll get to these soon:
  * Add a comments section at the end of each article (most likely with [Disqus](http://www.disqus.com))
  * Add sharing capabilties and RSS functionality (where Medium shines)
  * Add a search feature
  * Update the blog index page to be a little more robust.  Currently it's loading the pages using the [preval babel plugin](https://github.com/kentcdodds/babel-plugin-preval)
  which, as cool as it is, seems to behave a bit flakey at times and also have some issues with caching when I'm doing
  dev work.  Also those little blog previews don't currently allow for nice things such as displaying vue components
  since I'm being naughty with the `v-html` attribute.

  This site has already proven to be a valuable learning experience as I've developed it.  Hopefully, with a few
  articles under its belt and some new features, it can prove to be a valuable learning resource for others as well!
</template>

<script>
  module.exports = {
    head() {
      return {
        meta: [
          { hid: 'keywords', name: 'keywords', content: 'vue.js, blog, technical writing' }
        ]
      }
    },
    fetch({ store }) {
      store.commit('meta', {
        title: 'Houston, we have a blog!'
      });
    }
  }
</script>
