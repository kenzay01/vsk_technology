export function escapeMarkdown(text: string): string {
  const specialChars = [
    "\\",
    "_",
    "*",
    "[",
    "]",
    "(",
    ")",
    "~",
    "`",
    ">",
    "#",
    "+",
    "-",
    "=",
    "|",
    "{",
    "}",
    ".",
    "!",
  ];

  let escapedText = text;
  specialChars.forEach((char) => {
    const regex = new RegExp(`\\${char}`, "g");
    escapedText = escapedText.replace(regex, `\\${char}`);
  });

  return escapedText;
}
