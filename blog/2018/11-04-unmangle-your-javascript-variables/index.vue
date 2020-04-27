
<template lang="md">
  There are many tools you can find for [unminifying](https://en.wikipedia.org/wiki/Minification_(programming))
  javascript code.  However, _most_ of these tools just add proper formatting and call it a day. Considering
  many minifiers [mangle](https://github.com/mishoo/UglifyJS2#cli-mangle-options) local identifiers to one or two
  characters and _reuse_ those identifiers frequently, this can result in some code that is still quite painful to read.
  I think we can do better.

  I've created this online tool to not only format code (using [prettier](https://prettier.io/)), but
  also go one step further by marking global variables and renaming mangled variables to be globally unique.
  It does this by renaming each variable to its type and the line number where it was defined (e.g.
  `let let99 = 10;` if defined on line 99).  It's not the best, but it's _better_.

  Give it a shot below.  I've also made a redirect to this page at <a href="/unminify">richsnapp.com/unminify</a>
  for convenience. If you think there's a better way to do this, found a bug, or think a feature would be easy to add,
  send a comment or <a :href="forkLink">pull-request</a> my way!

  <div class="unminify">
    <div class="alert alert-danger error" role="alert" v-if="error">{{ error }}</div>
    <figure class="right">
      <div>
        <header>
            <div><button class="btn btn-sm" @click="update">Unminify</button></div>
            <div class="input-group" :class="{disabled: !rename}">
              <span class="input-group-addon" @click="rename = !rename">
                <input type="checkbox" v-model="rename" /> unmangle <span class="hidden-xs">variable names</span> as a
              </span>
              <div class="input-group-btn" :class="{open: typeOpen}">
                <button type="button"
                  :disabled="!rename"
                  class="btn btn-sm dropdown-toggle"
                  @click="typeOpen = true">{{ typeSelected }}</button>
                <ul class="dropdown-menu">
                  <li><a @click="typeSelected = 'script';">script</a></li>
                  <li><a @click="typeSelected = 'module';">module</a></li>
                </ul>
              </div>
            </div>
        </header>
        <CodeEditor :code="code" :options="options" @input="setCode" @focus="clear"></CodeEditor>
      </div>
    </figure>
  </div>

</template>

<style lang="less" scoped>
  @import (reference) '~assets/site.less';

  .unminify {
    font-family: @font-family-sans-serif2;
    .error {
      font-size: 14px;
    }
    header {
      display: flex;
      padding: 5px 10px;
      background-color: #f7f7f7;
      border-bottom: 1px solid #ddd;
      align-items: flex-end;
      font-size: 14px;
      .btn {
        font-size: 14px;
        border: 1px solid  #ccc;
      }
      .input-group {
        width: 1%;
        .input-group-addon {
          cursor: pointer;
          font-size: 14px;
          background-color: #eee;
        }
        &.disabled {
          .opacity(.65);
        }
        .dropdown-menu {
          font-size: 14px;
        }
      }
      a {
        cursor: pointer;
      }
      div {
        flex: 0 0 auto;
        margin-left: 20px;
      }
    }
  }

</style>

<script>

  import * as _ from 'lodash';
  import CodeEditor from '~/components/CodeEditor.vue';

  import { format, util } from 'prettier/standalone';
  import * as babylon from 'prettier/parser-babylon';
  import traverse from '@babel/traverse';

  let exampleCode = "var Exported=(function c(w){var a='name';return w.component(a);})(Vue)";

  export default {
    tags: ['blog', 'programming', 'javascript', 'devtools'],
    data() {
      return {
        code: exampleCode,
        error: null,
        rename: true,
        typeOpen: false,
        typeSelected: "script",
        options: {
          tabSize: 2,
          mode: 'text/javascript',
          line: true,
          lineNumbers: true,
          foldGutter: true,
          styleActiveLine: true
        }
      }
    },
    mounted() {
      window.addEventListener('click', this.close, true);
    },
    destroyed() {
      window.removeEventListener('click', this.close, true);
    },
    components: {
      CodeEditor
    },
    computed: {
      forkLink() {
        return ['https://github.com/snapwich/richsnapp.com/blob/master/', this.$store.state.file.filepath].join("");
      }
    },
    methods: {
      close() {
        this.typeOpen = false;
      },
      setCode(code) {
        this.code = code;
        this.error = null;
      },
      clear() {
        if (this.code === exampleCode) {
          this.code = '';
        }
      },
      update() {
        let vm = this;

        function prettier(code, editAst = ast => ast) {
          function inner(code, edit) {
            try {
              code = format(code, {
                parser(code, {babylon}) {
                  code = babylon(code);
                  return edit ? edit(code) : code;
                },
                plugins: [babylon],
                printWidth: Number.MAX_SAFE_INTEGER
              })
            } catch (e) {
              vm.error = e.message;
            }
            return code;
          }

          code = inner(code);

          if (vm.rename) {
            return inner(code, editAst);
          }
          return code;
        }

        vm.code = prettier(vm.code, function(ast) {
          traverse(ast, {
            Scope(path) {
              let kindCount = {};
              function getName(kind, line) {
                kind = ({
                  hoisted: 'fn',
                  local: 'fn'
                })[kind] || kind;
                if (!kindCount[kind + line]) {
                  kindCount[kind + line] = 1;
                  return `${kind}${line}`;
                }
                return `${kind}${line}_${++kindCount[kind + line]}`;
              }
              _.forEach(path.scope.globals, (node, name) => {
                let tag = ' global ';
                if (
                  !Array.isArray(node.leadingComments) ||
                  !node.leadingComments.some(comment => comment.value === tag)
                ) {
                  util.addLeadingComment(node, {type: 'CommentBlock', value: tag});
                }
              });

              if (!(vm.typeSelected === 'script' && path.container.type === 'File')) {
                _.forEach(path.scope.bindings, (node, name) => {
                  let line = node.identifier.loc.start.line;
                  path.scope.rename(name, getName(node.kind, line));
                });
              }
            }
          });
          return ast;
        });
      }
    }
  }
</script>
