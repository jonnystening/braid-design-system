import pluginTester from 'babel-plugin-tester';
import dedent from 'dedent';

import plugin from './plugin-remove-columns';

const tests: Parameters<typeof pluginTester>[0]['tests'] = [
  {
    title: 'Remove Braid Column component',
    code: dedent`
    import { Box, Column, Text } from 'braid-design-system';
    export default () => {
      return (
        <Box padding="large">
          <Column>
            <Text>This is a Column</Text>
          </Column>

          <Column width="1/3">
            <Text>This Column has attributes</Text>
          </Column>
        </Box>
      );
    };`,
    output: dedent`
    import { Box, Column, Text } from 'braid-design-system';
    export default () => {
      return (
        <Box padding="large">
          <Text>This is a Column</Text>

          <Column width="1/3">
            <Text>This Column has attributes</Text>
          </Column>
        </Box>
      );
    };`,
  },
  {
    title: 'Remove multiple Braid Column components',
    code: dedent`
    import { Box, Column, Text } from 'braid-design-system';
    export default () => {
      return (
        <Box padding="large">
          <Column>
            <Text>This is a Column</Text>
          </Column>
          <Column>
            <Text>This is a Column</Text>
          </Column>
          <Column>
            <Text>This is a Column</Text>
          </Column>
          <Column width="1/3">
            <Text>This Column has attributes</Text>
          </Column>
        </Box>
      );
    };`,
    output: dedent`
    import { Box, Column, Text } from 'braid-design-system';
    export default () => {
      return (
        <Box padding="large">
          <Text>This is a Column</Text>

          <Text>This is a Column</Text>

          <Text>This is a Column</Text>

          <Column width="1/3">
            <Text>This Column has attributes</Text>
          </Column>
        </Box>
      );
    };`,
  },
  {
    title: 'Remove Braid Column component with a different import',
    code: dedent`
    import { Box, Column as BraidColumn, Text } from 'braid-design-system';
    export default () => {
      return (
        <Box padding="large">
          <BraidColumn>
            <Text>This is a Column</Text>
          </BraidColumn>

          <BraidColumn width="1/3">
            <Text>This Column has attributes</Text>
          </BraidColumn>
        </Box>
      );
    };`,
    output: dedent`
    import { Box, Column as BraidColumn, Text } from 'braid-design-system';
    export default () => {
      return (
        <Box padding="large">
          <Text>This is a Column</Text>

          <BraidColumn width="1/3">
            <Text>This Column has attributes</Text>
          </BraidColumn>
        </Box>
      );
    };`,
  },
  {
    title: 'Remove namespaced Braid Column component',
    code: dedent`
    import * as Braid from 'braid-design-system';
    export default () => {
      return (
        <Braid.Box padding="large">
          <Braid.Column>
            <Text>This is a Column</Text>
          </Braid.Column>
        </Braid.Box>
      );
    };`,
    output: dedent`
    import * as Braid from 'braid-design-system';
    export default () => {
      return (
        <Braid.Box padding="large">
          <Text>This is a Column</Text>
        </Braid.Box>
      );
    };`,
  },
];

pluginTester({
  pluginName: 'babel-plugin-braid-remove-default-columns',
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
