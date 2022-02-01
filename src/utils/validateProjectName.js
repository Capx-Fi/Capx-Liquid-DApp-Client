export function validateProjectName(name) {
  return name.length >= 2 && name.length<=26;
}
