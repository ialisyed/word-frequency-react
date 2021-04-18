export function renderIf(condition: boolean) {
  return (jsx: JSX.Element | JSX.Element[]) => (condition ? jsx : null);
}
