import fs from 'fs';
import { parse, print } from 'recast';
import {
  transformFromAstSync,
  parseSync,
  BabelFileMetadata,
} from '@babel/core';
import prettier from 'prettier';
// @ts-expect-error
import jsxSyntax from '@babel/plugin-syntax-jsx';
// @ts-expect-error
import typescriptSyntax from '@babel/plugin-syntax-typescript';

import atomsPlugin from './plugin-deprecate/plugin-deprecate-atoms';
import propsPlugin from './plugin-deprecate/plugin-deprecate-props';
import varsPlugin from './plugin-deprecate/plugin-deprecate-vars';
import importUpdatePlugin from './plugin-deprecate/plugin-import-update';
import removeColumnsPlugin from './plugin-decolumn/plugin-remove-columns';

const pluginsForVersion = {
  v31: [propsPlugin, atomsPlugin, varsPlugin, importUpdatePlugin],
  'v31.6': [removeColumnsPlugin],
};

type Version = keyof typeof pluginsForVersion;
interface BraidUpgradeMetadata extends BabelFileMetadata {
  warnings?: Array<string>;
  hasChanged?: boolean;
}

export function babelRecast({
  version,
  code,
  filePath,
}: {
  version: Version;
  code: string;
  filePath: string;
}) {
  try {
    const ast = parse(code, {
      parser: {
        parse: (source: string) =>
          parseSync(source, {
            plugins: [jsxSyntax],
            overrides: [
              {
                test: [`**/*.ts`, `**/*.tsx`],
                plugins: [[typescriptSyntax, { isTSX: true }]],
              },
            ],
            filename: filePath,
            parserOpts: {
              tokens: true,
            },
          }),
      },
    });

    const options = {
      cloneInputAst: false,
      configFile: false,
      babelrc: false,
      code: false,
      ast: true,
      filename: filePath,
      plugins: pluginsForVersion[version],
    };

    const transformResult = transformFromAstSync(ast, code, options);

    if (!transformResult || (transformResult && !transformResult.ast)) {
      return {
        warnings: [],
        error: 'Error transforming code',
        hasChanged: false,
        source: code,
      };
    }

    const { ast: transformedAST } = transformResult;
    const metadata = (transformResult.metadata || {}) as BraidUpgradeMetadata;

    return {
      warnings:
        'warnings' in metadata && Array.isArray(metadata.warnings)
          ? metadata.warnings
          : [],
      hasChanged:
        'hasChanged' in metadata && typeof metadata.hasChanged === 'boolean'
          ? metadata.hasChanged
          : false,
      // @ts-expect-error
      source: print(transformedAST).code,
    };
  } catch (e) {
    return {
      warnings: [],
      error: `${e}`,
      hasChanged: false,
      source: code,
    };
  }
}

export interface CodemodResult {
  updated: boolean;
  warnings: Array<string>;
  error?: string;
  filePath: string;
}
export default async ({
  version,
  filePath,
}: {
  version: Version;
  filePath: string;
}) => {
  const code = await fs.promises.readFile(filePath, { encoding: 'utf-8' });

  const {
    source: newSource,
    warnings,
    error,
    hasChanged,
  } = babelRecast({ version, code, filePath });

  const result: CodemodResult = {
    filePath,
    updated: hasChanged,
    warnings,
    error,
  };

  if (hasChanged) {
    await fs.promises.writeFile(
      filePath,
      prettier.format(newSource, {
        parser: 'babel-ts',
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
      }),
      { encoding: 'utf-8' },
    );
  }

  return result;
};
