import {
  AllHTMLAttributes,
  FormEvent,
  Fragment,
  UIEvent,
  useCallback,
} from 'react';
import React, { forwardRef, useRef } from 'react';
import { Box } from '../Box/Box';
import type { FieldBaseProps, FieldLabelVariant } from '../private/Field/Field';
import { Field } from '../private/Field/Field';
import { ClearField } from '../private/Field/ClearField';
import { getCharacterLimitStatus } from '../private/Field/getCharacterLimitStatus';
import type { HighlightRange } from '../private/Field/formatRanges';
import { formatRanges } from '../private/Field/formatRanges';
import * as styles from './TextField.css';

const validTypes = {
  text: 'text',
  password: 'password',
  email: 'email',
  search: 'search',
  number: 'number',
  tel: 'tel',
  url: 'url',
};

const defaultInputModesForType: Record<
  keyof typeof validTypes,
  InputProps['inputMode']
> = {
  text: 'text',
  password: 'text',
  email: 'email',
  search: 'search',
  number: 'numeric',
  tel: 'tel',
  url: 'url',
};

type InputProps = AllHTMLAttributes<HTMLInputElement>;

export type TextFieldBaseProps = Omit<
  FieldBaseProps,
  'value' | 'labelId' | 'secondaryMessage'
> & {
  value: NonNullable<InputProps['value']>;
  type?: keyof typeof validTypes;
  inputMode?: InputProps['inputMode'];
  step?: InputProps['step'];
  onChange: NonNullable<InputProps['onChange']>;
  onBlur?: InputProps['onBlur'];
  onFocus?: InputProps['onFocus'];
  onClear?: () => void;
  placeholder?: InputProps['placeholder'];
  highlightRanges?: HighlightRange;
  characterLimit?: number;
  clearLabel?: string;
};
export type TextFieldLabelProps = FieldLabelVariant;
export type TextFieldProps = TextFieldBaseProps & TextFieldLabelProps;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      value,
      type = 'text',
      onChange,
      onBlur,
      onFocus,
      onClear,
      placeholder,
      characterLimit,
      highlightRanges: highlightRangesProp = [],
      id,
      clearLabel,
      inputMode,
      step,
      ...restProps
    },
    forwardedRef,
  ) => {
    // We need a ref regardless so we can imperatively
    // focus the field when clicking the clear button
    const defaultRef = useRef<HTMLInputElement | null>(null);
    const highlightsRef = useRef<HTMLDivElement>(null);
    const inputRef = forwardedRef || defaultRef;
    const updateScroll = useCallback(
      (scrollLeft: number) => {
        if (highlightsRef.current) {
          highlightsRef.current.scrollLeft = scrollLeft;
        }
      },
      [highlightsRef],
    );

    const clearable = Boolean(
      typeof onClear !== 'undefined' &&
        !restProps.disabled &&
        typeof value === 'string' &&
        value.length > 0,
    );

    const inputLength = String(value).length;
    const excessCharactersRange =
      characterLimit && inputLength > characterLimit
        ? [{ start: characterLimit }]
        : [];
    const highlightRanges = [...excessCharactersRange, ...highlightRangesProp];
    const hasHighlights = highlightRanges.length > 0;

    return (
      <Field
        {...restProps}
        id={id}
        value={value}
        labelId={undefined}
        secondaryMessage={
          characterLimit
            ? getCharacterLimitStatus({
                value,
                characterLimit,
              })
            : null
        }
        secondaryIcon={
          onClear ? (
            <ClearField
              id={`${id}-clear`}
              hide={!clearable}
              onClear={onClear}
              label={clearLabel}
              inputRef={inputRef}
            />
          ) : null
        }
      >
        {(
          overlays,
          { className, borderRadius, background, ...styleProps },
          fieldProps,
          icon,
          secondaryIcon,
          prefix,
        ) => (
          <Fragment>
            {icon}
            {prefix}
            <Box position="relative" display="flex" width={styleProps.width}>
              {hasHighlights ? (
                <Box
                  ref={highlightsRef}
                  position="absolute"
                  overflow="hidden"
                  pointerEvents="none"
                  aria-hidden="true"
                  top={0}
                  left={0}
                  right={0}
                  {...styleProps}
                  className={[styles.highlights, className]}
                >
                  {formatRanges(String(value), highlightRanges)}
                </Box>
              ) : null}
              <Box
                component="input"
                position="relative"
                zIndex={1}
                type={validTypes[type]}
                value={value}
                onChange={(e: FormEvent<HTMLInputElement>) => {
                  if (typeof onChange === 'function') {
                    onChange(e);
                  }

                  if (hasHighlights) {
                    updateScroll(e.currentTarget.scrollLeft);
                  }
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                onScroll={
                  hasHighlights
                    ? (event: UIEvent<HTMLInputElement>) =>
                        updateScroll(event.currentTarget.scrollLeft)
                    : undefined
                }
                placeholder={!restProps.disabled ? placeholder : undefined}
                {...fieldProps}
                {...styleProps}
                className={className}
                inputMode={inputMode || defaultInputModesForType[type]}
                step={step}
                ref={inputRef}
              />
            </Box>
            {overlays}
            {secondaryIcon}
          </Fragment>
        )}
      </Field>
    );
  },
);

TextField.displayName = 'TextField';
