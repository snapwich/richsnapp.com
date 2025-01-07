<template>
  <div class="unminify">
    <div class="alert alert-danger error" role="alert" v-if="error">
      {{ error }}
    </div>
    <figure class="right">
      <div>
        <header>
          <div>
            <button class="btn btn-sm" @click="update">Unminify</button>
          </div>
          <div class="input-group" :class="{ disabled: !rename }">
            <span class="input-group-addon" @click="rename = !rename">
              <input type="checkbox" v-model="rename" /> unmangle
              <span class="hidden-xs">variable names</span> as a
            </span>
            <div class="input-group-btn" :class="{ open: typeOpen }">
              <button
                type="button"
                :disabled="!rename"
                class="btn btn-sm dropdown-toggle"
                @click="typeOpen = true"
              >
                {{ typeSelected }}
              </button>
              <ul class="dropdown-menu">
                <li><a @click="typeSelected = 'script'">script</a></li>
                <li><a @click="typeSelected = 'module'">module</a></li>
              </ul>
            </div>
          </div>
        </header>
        <div class="code-editor-wrapper">
          <CodeEditor
            :code="code"
            :options="options"
            @input="setCode"
            @focus="clear"
          >
          </CodeEditor>
        </div>
      </div>
    </figure>
  </div>
</template>

<style lang="less" scoped>
@import (reference) "styles/site.less";

.unminify {
  font-family: @font-family-sans-serif2;
  .error {
    font-size: 14px;
  }
  .code-editor-wrapper {
    display: grid;
    min-height: 400px;
    overflow-x: hidden;
  }
  header {
    display: flex;
    padding: 5px 10px;
    background-color: #f7f7f7;
    border-bottom: 1px solid #ddd;
    align-items: flex-end;
    font-size: 14px;
    html.dark-mode & {
      background-color: var(--background-color);
      border-bottom: 1px solid #393b3f;
    }
    .btn {
      font-size: 14px;
      border: 1px solid #ccc;
    }
    .input-group {
      width: 1%;
      .input-group-addon {
        cursor: pointer;
        font-size: 14px;
        background-color: #eee;
      }
      &.disabled {
        .opacity(0.65);
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

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import { forEach } from "lodash-es";

let exampleCode =
  "var Exported=(function c(w){var a='name';return w.component(a);})(Vue)";

export default defineComponent({
  tags: ["tools", "programming", "javascript", "devtools"],
  data() {
    return {
      code: exampleCode,
      error: null,
      rename: true,
      typeOpen: false,
      typeSelected: "script",
      options: {
        tabSize: 2,
        mode: "text/javascript",
        line: true,
        lineNumbers: true,
        foldGutter: true,
        styleActiveLine: true,
      },
    };
  },
  mounted() {
    window.addEventListener("click", this.close, true);
  },
  destroyed() {
    window.removeEventListener("click", this.close, true);
  },
  components: {
    CodeEditor: defineAsyncComponent({
      loader: () => import("components/CodeEditor/CodeEditor.vue"),
    }),
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
        this.code = "";
      }
    },
    async update() {
      let vm = this;

      // Mock process.env for @babel/traverse
      globalThis.process = {
        env: {},
      };

      Promise.all([
        import("prettier/standalone"),
        import("prettier/parser-babylon"),
        import("@babel/traverse"),
      ]).then(([{ format, util }, babylon, traverse]) => {
        function prettier(code, editAst = (ast) => ast) {
          function inner(code, edit) {
            try {
              code = format(code, {
                parser(code, { babylon }) {
                  code = babylon(code);
                  return edit ? edit(code) : code;
                },
                plugins: [babylon],
                printWidth: Number.MAX_SAFE_INTEGER,
              });
            } catch (e) {
              vm.error = typeof e === "object" && e.message ? e.message : e;
            }
            return code;
          }

          code = inner(code);

          if (vm.rename) {
            return inner(code, editAst);
          }
          return code;
        }

        vm.code = prettier(vm.code, function (ast) {
          traverse.default(ast, {
            Scope(path) {
              let kindCount = {};
              function getName(kind, line) {
                kind =
                  {
                    hoisted: "fn",
                    local: "fn",
                  }[kind] || kind;
                if (!kindCount[kind + line]) {
                  kindCount[kind + line] = 1;
                  return `${kind}${line}_`;
                }
                return `${kind}${line}_${++kindCount[kind + line]}`;
              }
              forEach(path.scope.globals, (node, name) => {
                let tag = " global ";
                if (
                  !Array.isArray(node.leadingComments) ||
                  !node.leadingComments.some((comment) => comment.value === tag)
                ) {
                  util.addLeadingComment(node, {
                    type: "CommentBlock",
                    value: tag,
                  });
                }
              });

              if (
                !(
                  vm.typeSelected === "script" && path.container.type === "File"
                )
              ) {
                forEach(path.scope.bindings, (node, name) => {
                  let line = node.identifier.loc.start.line;
                  path.scope.rename(name, getName(node.kind, line));
                });
              }
            },
          });
          return ast;
        });
      });
    },
  },
});
</script>
