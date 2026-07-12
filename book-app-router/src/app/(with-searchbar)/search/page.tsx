import BookItem from "@/components/book-item";
import { BookData } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`;

  const response = await fetch(url);
  const result: BookData[] = await response.json();

  return (
    <div>
      {result.map((result) => (
        <BookItem key={result.id} {...result} />
      ))}
    </div>
  );
}
