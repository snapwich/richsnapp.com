<template>
  <div class="tools">
    <h2>Investing</h2>
    <a href="/tools/lazy-portfolio" class="media panel panel-default">
      <div class="media-left">
        <img
          class="media-object"
          src="/tools/lazy-portfolio/icons/portfolio-96.png"
        />
      </div>
      <div class="media-body">
        <h3 class="media-heading">
          <a>Lazy Portfolio Rebalancing Calculator</a>
        </h3>
        A simple calculator for rebalancing lazy portfolios. Also available
        offline and as a progressive web app.
      </div>
    </a>
    <h2>Coding</h2>
    <a href="/tools/code-unmangler" class="media panel panel-default">
      <div class="media-left">
        <img
          class="media-object"
          src="/tools/code-unmangler/icons/unmangler-96.png"
        />
      </div>
      <div class="media-body">
        <h3 class="media-heading"><a>Code Unmangler</a></h3>
        A basic text editor that can prettify
        <a href="https://en.wikipedia.org/wiki/Name_mangling" target="_blank"
          >name mangled</a
        >
        and minified javascript code. Useful for debugging code minified for
        production.
      </div>
    </a>
  </div>
</template>

<style lang="less">
a.media {
  display: block;
  clear: both;
  text-decoration: none;
  box-shadow: none;
  padding: 10px;
  img {
    width: 96px;
    height: 96px;
  }
  &:hover {
    color: inherit;
    background: none;
  }
}
</style>
