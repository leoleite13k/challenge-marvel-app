export function removeHTML(message: string | undefined): string | undefined {
  const regex = /(<([^>]+)>)/gi;

  return message ? message.replace(regex, '') : undefined;
}
