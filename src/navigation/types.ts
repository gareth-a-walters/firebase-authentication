export type StackScreensDataParams<ScreensList, ScreenProps> = {
  name: keyof ScreensList,
  // eslint-disable-next-line no-undef
  component: (props: ScreenProps) => JSX.Element | null,
  options?: { [key: string]: string | boolean | Record<string, unknown> },
}[]
