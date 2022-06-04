import { server } from "../config";
import { Page } from "../type";

export async function getPages(): Promise<Page[]> {
  const res = await fetch(`${server}/api/pages`);
  const json = await res.json();

  return json.pages;
}
