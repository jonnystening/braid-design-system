import pluginTester from 'babel-plugin-tester';
import dedent from 'dedent';

import plugin from './plugin-import-update';

const tests: Parameters<typeof pluginTester>[0]['tests'] = [
  {
    title: 'Updates component import path with single import',
    code: dedent/* ts */ `
      import { BraidTestProvider } from 'braid-design-system';
      import { foo } from 'other-package';
    `,
    output: dedent/* ts */ `
      import { BraidTestProvider } from 'braid-design-system/test';
      import { foo } from 'other-package';
    `,
  },
  {
    title: 'Skip matching component import from non-Braid package',
    code: dedent/* ts */ `
      import { BraidTestProvider } from 'other-package';
    `,
    output: dedent/* ts */ `
      import { BraidTestProvider } from 'other-package';
    `,
  },
  {
    title:
      'Moves component to separate import when multiple things are imported',
    code: dedent/* ts */ `
      import { vars, BraidTestProvider } from 'braid-design-system';
      import { foo } from 'other-package';
    `,
    output: dedent/* ts */ `
      import { vars } from 'braid-design-system';
      import { BraidTestProvider } from 'braid-design-system/test';
      import { foo } from 'other-package';
    `,
  },
  {
    title: 'Handle import aliasing of component',
    code: dedent/* ts */ `
      import { vars, BraidTestProvider as TestProvider } from 'braid-design-system';
      import { foo } from 'other-package';
    `,
    output: dedent/* ts */ `
      import { vars } from 'braid-design-system';
      import { BraidTestProvider as TestProvider } from 'braid-design-system/test';
      import { foo } from 'other-package';
    `,
  },
  {
    title: 'Updates Playroom imports',
    code: dedent/* ts */ `
      import { foo } from 'some-package';
      import FrameComponent from 'braid-design-system/lib/playroom/FrameComponent';
      import components from 'braid-design-system/lib/playroom/components';
      import snippets from 'braid-design-system/lib/playroom/snippets';
      import { bar } from 'other-package';
    `,
    output: dedent/* ts */ `
      import { foo } from 'some-package';
      import FrameComponent from 'braid-design-system/playroom/FrameComponent';
      import components from 'braid-design-system/playroom/components';
      import snippets from 'braid-design-system/playroom/snippets';
      import { bar } from 'other-package';
    `,
  },
];

pluginTester({
  pluginName: 'babel-plugin-import-update',
  plugin,
  babelOptions: {
    filename: 'test-file.tsx',
    plugins: [
      '@babel/plugin-syntax-jsx',
      ['@babel/plugin-syntax-typescript', { isTSX: true }],
    ],
  },
  tests,
});
