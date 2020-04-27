
<template lang="md">
  One of the most important features that a website can have is a method to effectively search its content.
  There's no denying that there's such an overload of information on websites these days that helping people find what
  they need can be a monumental task. That's where a _well designed_ site searching functionality can swoop in to save
  the day and today I'm going to show _you_ how to deploy this superhero feature on your very own static website, no
  backend required.

  Now you're probably saying to yourself "This guy barely has any content on his website... does he really need search
  functionality?  Can't his visitors [_sic_] just hit `Ctrl-F` or `⌘-F`?"  However, you would be remiss in
  reminding yourself that not all users are technical, nor do they all possess the appropriate number of digits required
  to simultaneous press two keys.  Then you might say to me "Hey buddy, your site is already indexed by google... Why
  can't your users just go to Google and search for what they want there?" to which I'd respond: please hold all your
  questions and feedback until the end.

  Now that we've clarified the _why_, let's work on the _how_ and jump right in!  We know that Google is the king of
  search, so we'll kick off this project by discovering what products they have available to solve our problem
  for us.  We'll do this by [typing exactly what we want into google.com](http://lmgtfy.com/?q=google+search+site),
  clicking search, and then clicking on the first link.  While you may choose to simplify the process with the _I'm
  feeling lucky_ button, I find the added work of a multi-step process can often pay dividends in the
  feelings-of-accomplishment department.

  Straight out of the gate we'll see that Google has a tool with a feature list capable of scratching our every
  itch: [Google Site Search](https://enterprise.google.com/search/products/gss.html). However, before getting too
  excited it's important to scan _every_ Google product page for the ominous shutdown notice, and with our cursory glance
  we'll see that our product is indeed deprecated. An unfortunate sight, but rather than being filled with disappointment
  we should consider the hours we might have poured into the ill-fated Google product had we been unaware of the
  impending shutdown.

  <figure class="scale right">
    <img src="./google-site-search.png" />
    <figcaption>Yup, it's a Google product.</figcaption>
  </figure>

  Repeating our search again with  "Google Site Search Alternatives" will lead us to another, slightly less spectacular
  solution: [Google Custom Search](http://www.google.com/cse).  While lacking many of the bells and whistles of our first
  solution, it does provide search; and with the claims of basic configuration and a copy/paste installation, the setup
  process seems simple enough.  Let's give it a shot.

  We'll create a little spot at the top of our page for the `<gcse:searchbox-only>` tag, paste the `cse.js` loading
  javascript snippet somewhere into the document, and away we go!

  <figure>
  <img src="./first-attempt.png" />
  <figcaption>Behold the beauty of Goggle Costom Sorch!</figcaption>
  </figure>

  It's a thing of beauty, isn't it...?  I figured it'd take some work to get it looking the way we wanted, but this
  thing just looks plain broken...  Let's dig into the DOM that was added to our site to see what created
  this monstrosity.

  <figure class="scale">
  <img src="./google-dom.png" />
  </figure>

  The first thing you may notice is that this thing was inserted directly into our page.  No
  [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM) (which is odd, considering
  Google's push for modern [Web Components](https://www.polymer-project.org/2.0/docs/devguide/feature-overview)), not
  even an iFrame; it's just... out there. You may also notice this thing is still using _all kinds_ of html tags
  (including the classic [`table` layout](https://stackoverflow.com/questions/83073/why-not-use-tables-for-layout-in-html)).

  What's wrong with the above?  Well, many web designers these days use [CSS resets](https://cssreset.com/what-is-a-css-reset/)
  to start from a blank slate when creating their website.  In my case, I'm using [Twitter Bootstrap](http://getbootstrap.com/)
  which includes [Normalize.css](https://necolas.github.io/normalize.css/) (similar to a reset, but not quite), so when
  our site's CSS defaults cascade into the search widget we are left with something that most would describe as awful.
  At [Needle](http://www.needle.com), while working on their in-the-page chat, I solved problems like this by using
  only `div` tags wherever possible and namespacing all class names (e.g. `<div class=".needle-h1">`, which Google does
  do here, luckily).  Additionally, I created a container for our widget that instituted css defaults similar to
  [cleanslate.css](http://cleanslatecss.com/) which guarded against most cascading and universal selector issues that
  could affect our widget.  Since we don't have control over the Google search widget in this case, we'll have to find
  another solution to this problem.

  Google Custom Search touts customization, but looking at the customization panel will reveal that it's mostly just
  color and font-size changes; and currently our search has a few more problems than a simple color problem.  Let's see
  if we can manually fix our problem and add some better styling while we're at it.

  ```less {.smallest .right}
  // Just a little bit of styling...
  .search-box {
    margin-right: 0;
    color: @gray-dark;
    position: relative;
    display: inline-block;
    width: 200px;
    border-bottom: 2px solid @gray-lighter;
    min-height: 30px;
    line-height: normal;
    a {
      font-size: inherit;
    }
    *, *:after, *:before {
      box-sizing: content-box;
    }
    .gsc-control-searchbox-only {
      border: 0 !important;
      padding: 0 !important;
      background: transparent !important;
      .gsc-search-box {
        margin-bottom: 0 !important;
        * {
          background: transparent !important;
          box-shadow: none !important;
        }
        .gsc-input-box {
          border: 0 !important;
        }
        input {
          color: @gray-lighter;
          border: 0 !important;
          appearance: textfield;
          border-radius: 0;
          text-indent: 0 !important;
        }
        td {
          vertical-align: bottom;
          padding-left: 0;
          padding-right: 0;
        }
        .gsc-search-button {
          display: none;
        }
        .gsib_b {
          display: none;
        }
      }
    }
  }
  ```

  With some javascript to clear the placeholder text and a slight smattering of `!important` tags we end up with
  something that looks like it belongs on our site a little bit better:

  <img class="bordered-content styled-search" src="./styled-search.png" />

  A respectable looking search bar, if I do say so myself.

  Normally I avoid the `!important` modifier like the plague, however in this case it becomes somewhat of a necessity
  due to Google's use of the `style` attribute to directly style some elements along with a few other
  [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) battles involved with the process.

  At this point some of you may be wondering what happens if Google ends up changing the html markup or styling
  of their widget... Couldn't it end up looking even worse than it did originally?  Couldn't it end up looking something
  like this?

  <div class="bordered-content messed-up-search">
    <input disabled type="text" ref="messedUpSearchText" />
    <button disabled>
      <i class="fa fa-search"></i>
    </button>
  </div>

  Yes, yes it could.  However, it looks like that's just the risk we're going to have to take.  Code doesn't update that
  frequently these days, right?  And it's always backwards compatible when it does!

  We haven't checked out the search results page yet; I wonder what that looks like?  Google Custom Search has a nice
  overlay option which means we don't have to worry about where the results will fit into our page and it ends up looking
  pretty good on my desktop machine.  Let's see how it looks on a mobile device... It is 2018 and everything is
  [responsive](https://en.wikipedia.org/wiki/Responsive_web_design) these days, so hopefully Google has implemented
  some sort of responsive behavior.

  <figure class="center scale">
    <img src="./iphone-search.png" />
    <figcaption>Mobile leaves something to be desired</figcaption>
  </figure>

  Optimistic as I was that we were almost done, it looks like we have a problem... In addition to looking pretty bad,
  the mobile results don't scroll properly; and unfortunately for an overlay that decides to shove all the ads
  above the fold this basically renders our search results as a giant popup advertisement on mobile devices. Google
  Custom Search does have a configuration option that allows us to open the search results in a separate page... but
  then how is that better than just manually redirecting our visitors to a google search results page to begin with?

  <div class="lightbulb" v-repaint>
    <svg width="140" height="140">
      <line stroke-linecap="round"
            stroke-width="5"
            stroke="currentColor"
            x1="40" y1="110" x2="20" y2="125" />
      <line stroke-linecap="round"
            stroke-width="5"
            stroke="currentColor"
            x1="30" y1="80" x2="5" y2="80" />
      <line stroke-linecap="round"
            stroke-width="5"
            stroke="currentColor"
            x1="40" y1="50" x2="20" y2="35" />
      <line stroke-linecap="round"
            stroke-width="5"
            stroke="currentColor"
            x1="70" y1="15" x2="70" y2="40" />
      <line stroke-linecap="round"
            stroke-width="5"
            stroke="currentColor"
            x1="100" y1="50" x2="120" y2="35" />
      <line stroke-linecap="round"
            stroke-width="5"
            stroke="currentColor"
            x1="110" y1="80" x2="135" y2="80" />
      <line stroke-linecap="round"
            stroke-width="5"
            stroke="currentColor"
            x1="100" y1="110" x2="120" y2="125" />
    </svg>
    <i class="fa fa-lightbulb-o"></i>
  </div>

  Wait, that's _genius_!  We can give our visitors the same experience they would have had with Google Custom Search
  (without any of the headache and third-party code inclusions) by just creating a search box that manually redirects
  them to a pre-populated Google search results page.

  <figure class="search-figure center">
    <div>

    ```html
    <template>
      <div class="google-search">
        <button @click="search(text)">
          <i class="fa fa-search"></i>
        </button>
        <input ref="input"
               title="Site Search"
               v-on:keyup.13="search(text)"
               v-model="text" />
      </div>
    </template>

    <script>
      export default {
        props: [
          'site'
        ],
        data() {
          return {
            text: ''
          }
        },
        methods: {
          search(str) {
            if (str) {
              window.open([
                'https://www.google.com/search?q=',
                this.site ? 'site:' + this.site + '+' : '',
                encodeURIComponent(str)
              ].join(''));
            } else {
              this.$refs.input.focus();
            }
          }
        }
      }
    </script>
    ```
    <div><google-search site="richsnapp.com"></google-search></div>
    </div>
    <figcaption>Our google search vue component</figcaption>
  </figure>


  Simple, effective, and overall works well enough!  It even has less ads, for whatever reason.  I think we have a
  winner!

  And that is how you add google search to a static website!
</template>

<script>
  import GoogleSearch from '~/components/GoogleSearch.vue';

  function messedUpSearch(elem) {
    type("Hey Google, what's wrong with this site?");

    function type(str) {
      let keys = str.split('');
      let key = 0;
      let timeout;
      setInterval(function() {
        if (keys[key]) {
          elem.value = elem.value + keys[key++];
        } else if (!timeout) {
          timeout = setTimeout(function () {
            elem.value = '';
            key = 0;
            timeout = null;
          }, 4000);
        }
      }, 75);
    }
  }

  export default {
    title: 'How to add search to your static website',
    tags: ['web design', 'vue.js', 'search'],
    mounted() {
      messedUpSearch(this.$refs.messedUpSearchText);
    },
    components: {
      GoogleSearch
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/variables.less';

  .lightbulb {
    position: relative;
    display: flex;
    color: @gray;
    font-size: 100px;
    margin: 40px auto 20px;
    width: 60px;
    svg {
      left: -42px;
      top: -45px;
      position: absolute;
      color: #edef3f;
    }
  }

  .search-figure {
    & > div {
      display: flex;
      flex-direction: column;
      code {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom: 1px solid @gray-lighter;
      }
    }
    .google-search {
      margin: 20px auto 40px;
    }
  }

  .styled-search {
    display: block;
    margin: 20px auto;
  }

  .regular-search {
    width: 300px;
    margin: 0 auto 20px;
    display: flex;
    input {
      flex: 1 0 auto;
    }
  }

  .messed-up-search {
    position: relative;
    overflow: auto;
    padding: 30px;
    width: 300px;
    margin: 0 auto 20px;
    background: url(./messed-up-search.png) -45px 0;
    input {
      position: absolute;
      left: 35px;
      top: 30px;
      transform-origin: top center;
      animation: swing 5s infinite;
      background: none;
      font-size: 12px;
      width: 240px;
      height: 30px;
      border: 0;
      border-bottom: 2px solid @gray-lighter;
    }
    button {
      position: relative;
      left: -15px;
      top: -15px;
      animation: spin 4s linear infinite;
    }
  }

  @keyframes swing {
    20% {
      transform: rotate3d(0, 0, 1, 13deg);
    }
    40% {
      transform: rotate3d(0, 0, 1, -10deg);
    }
    60% {
      transform: rotate3d(0, 0, 1, 5deg);
    }
    80% {
      transform: rotate3d(0, 0, 1, -5deg);
    }
    100% {
      transform: rotate3d(0, 0, 1, 0deg);
    }
  }

  @keyframes spin {
    from {
      transform:rotate(0deg);
    }
    to {
      transform:rotate(359deg);
    }
  }

</style>
