/** « Titre 1 » de Word : Arial gras, numéroté à la main. */
export function DocHeading({
  number,
  title,
  id,
}: {
  number: string;
  title: string;
  /** id de la section : le titre devient un lien partageable */
  id: string;
}) {
  return (
    <h2
      id={id}
      className="mt-10 mb-3 scroll-mt-20 font-[Arial,Helvetica,sans-serif] text-[19px] font-bold"
    >
      <a href={`#${id}`} className="text-inherit no-underline hover:underline">
        {parseInt(number, 10)}.&nbsp;&nbsp;{title}
      </a>
    </h2>
  );
}
