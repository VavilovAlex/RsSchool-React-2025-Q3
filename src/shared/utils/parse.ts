export function parseIntOrDefault(value: string | null, defaultValue: number) {
  return parseInt(value ?? "", 10) || defaultValue;
}
