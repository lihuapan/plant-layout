import { Text, TextProps } from '@mantine/core'
import useFitText, { TOptions } from 'use-fit-text'

export function FitText({
  children,
  option,
  ...rest
}: {
  option?: TOptions
} & import('@mantine/utils').PolymorphicComponentProps<'div', TextProps>) {
  const { ref, fontSize } = useFitText(option)

  return (
    <Text ref={ref} style={{ fontSize }} {...rest}>
      {children}
    </Text>
  )
}
