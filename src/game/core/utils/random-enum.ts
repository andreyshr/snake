export function randomEnum<T>(anEnum: T, exclude?: T[keyof T][]): T[keyof T] {
  const enumValues = Object.values(anEnum).filter(
    (value: T[keyof T]) => !exclude?.includes(value)
  ) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}
