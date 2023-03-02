import React from 'react';
import type { Snippets } from '../private/Snippets';
import {
  TextField,
  TextLink,
  IconSearch,
  IconHelp,
} from '../../playroom/components';
import source from '../../utils/source.macro';

export const snippets: Snippets = [
  {
    name: 'Standard',
    code: source(<TextField label="Label" />),
  },
  {
    name: 'With additional labels',
    code: source(
      <TextField
        label="Label"
        secondaryLabel="optional"
        tertiaryLabel={
          <TextLink href="#">
            <IconHelp /> Help
          </TextLink>
        }
      />,
    ),
  },
  {
    name: 'With a description',
    code: source(
      <TextField
        label="Label"
        description="More detailed description of field."
      />,
    ),
  },
  {
    name: 'With an icon',
    code: source(
      <TextField label="Label" icon={<IconSearch />} placeholder="Search" />,
    ),
  },
  {
    name: 'With a prefix',
    code: source(
      <TextField label="Label" prefix="Prefix" placeholder="Search" />,
    ),
  },
  {
    name: 'With a critical message',
    code: source(
      <TextField label="Label" tone="critical" message="Critical message" />,
    ),
  },
  {
    name: 'With a positive message',
    code: source(
      <TextField label="Label" tone="positive" message="Positive message" />,
    ),
  },
  {
    name: 'With a neutral message',
    code: source(
      <TextField label="Label" tone="neutral" message="Neutral message" />,
    ),
  },
  {
    name: 'With character limit',
    code: source(
      <TextField
        label="Label"
        description="Character limit of 100"
        characterLimit={100}
      />,
    ),
  },
  {
    name: 'With a highlighted range',
    code: source(
      <TextField
        label="Label"
        description="Characters 11-20 are highlighted"
        tone="critical"
        message="Critical message"
        highlightRanges={[{ start: 11, end: 20 }]}
      />,
    ),
  },
];
