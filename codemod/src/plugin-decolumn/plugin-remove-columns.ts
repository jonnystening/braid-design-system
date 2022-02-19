/* eslint-disable no-console */
import type { NodePath, PluginObj, PluginPass } from '@babel/core';
import { types as t } from '@babel/core';

interface Context extends PluginPass {
  componentNames: Set<string>;
}

const componentsToGet = ['Column'];

export default function (): PluginObj<Context> {
  return {
    pre() {
      this.componentNames = new Set<string>();
    },
    visitor: {
      Program: {
        enter(programPath) {
          const bodyPath = programPath.get('body');

          for (const { node: statement } of bodyPath) {
            // Scan all import statements in the file looking for braid imports
            if (
              t.isImportDeclaration(statement) &&
              /braid-design-system(?:\/css)?$/.test(statement.source.value)
            ) {
              const { specifiers } = statement;

              for (const specifier of specifiers) {
                if (specifier.type === 'ImportSpecifier') {
                  const { imported, local } = specifier;

                  if (imported.type === 'Identifier') {
                    // If the component is one to check, add the name it was imported as to the Set
                    if (componentsToGet.includes(imported.name)) {
                      this.componentNames.add(local.name);
                    }
                  }
                }
              }
            }
          }

          // Once all relevant Braid imports are found, get all the references to those imports
          const referencePaths = Array.from(this.componentNames).flatMap(
            (name) => programPath.scope.bindings[name].referencePaths,
          );

          // If the reference is being used in a JSXOpeningElement
          // and that exists within a JSXElement(which it should)
          // and that JSXElement doesn't have any attributes
          // then replace it with its own children
          for (const referencePath of referencePaths) {
            const parentPath = referencePath.parentPath;

            if (parentPath && parentPath.parentPath) {
              if (parentPath.type === 'JSXOpeningElement') {
                const jsxOpeningElement =
                  parentPath as NodePath<t.JSXOpeningElement>;

                if (
                  jsxOpeningElement.parentPath.type === 'JSXElement' &&
                  jsxOpeningElement.node.attributes.length === 0
                ) {
                  const jsxElementPath =
                    jsxOpeningElement.parentPath as NodePath<t.JSXElement>;

                  jsxElementPath.replaceWithMultiple(
                    jsxElementPath.node.children,
                  );
                }
              }
            }
          }
        },
      },
    },
  };
}
