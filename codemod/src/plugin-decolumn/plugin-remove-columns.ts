/* eslint-disable no-console */
import type { NodePath, PluginObj, PluginPass } from '@babel/core';
import { types as t } from '@babel/core';

type ElementPath = NodePath<t.JSXElement>;
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
                } else if (specifier.type === 'ImportNamespaceSpecifier') {
                  this.componentNames.add(specifier.local.name);
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

            let jsxElementPath: ElementPath | null = null;

            if (!parentPath) {
              continue;
            }

            if (parentPath.isJSXOpeningElement()) {
              // E.g. <Column>
              const jsxOpeningElement = parentPath;

              if (
                jsxOpeningElement.parentPath.isJSXElement() &&
                jsxOpeningElement.node.attributes.length === 0
              ) {
                jsxElementPath = jsxOpeningElement.parentPath;
              }
            } else if (parentPath.isJSXMemberExpression()) {
              // E.g. <Braid.Column>
              const expressionProperty = parentPath.node.property;

              if (componentsToGet.includes(expressionProperty.name)) {
                const jsxOpeningElementPath = parentPath.parentPath;

                if (
                  jsxOpeningElementPath.isJSXOpeningElement() &&
                  jsxOpeningElementPath.parentPath.isJSXElement()
                ) {
                  jsxElementPath = jsxOpeningElementPath.parentPath;
                }
              }
            }

            if (jsxElementPath) {
              // JSXText elements can't be the first item in a block, so we take them out
              const children = jsxElementPath.node.children.filter(
                (child) => !t.isJSXText(child),
              );

              // If a Column has multiple children, removing it would make them all columns
              if (children.length === 1) {
                jsxElementPath.replaceWithMultiple(children);
              }
            }
          }
        },
      },
    },
  };
}
