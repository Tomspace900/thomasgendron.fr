/** « Titre 1 » de Word : Arial gras, numéroté à la main. */
export function DocHeading({
  number,
  title,
  id,
}: {
  number: string;
  title: string;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className="mt-10 mb-3 scroll-mt-20 font-[Arial,Helvetica,sans-serif] text-[19px] font-bold"
    >
      {parseInt(number, 10)}.&nbsp;&nbsp;{title}
    </h2>
  );
}
