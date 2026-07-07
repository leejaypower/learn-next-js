import { BookData } from "@/types";

export default async function fetchOneBook(
  id: number,
): Promise<BookData | null> {
  const url = `http://localhost:12345/book/${id}`;

  try {
    const reponse = await fetch(url);
    if (!reponse.ok) {
      throw new Error();
    }
    return await reponse.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
