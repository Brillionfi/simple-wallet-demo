export function shorten(str: string, chars: number): string {
  return `${str.slice(0, chars)}...${str.slice(str.length - chars, str.length)}`;
}
