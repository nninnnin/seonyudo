import { redirect } from "next/navigation";

export default function Home() {
  const introWatched = true;

  if (!introWatched) {
    return redirect("/intro");
  }

  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta eaque
      tenetur eos, inventore hic a minima placeat ipsum quam earum natus quae
      iusto, mollitia maxime ullam esse molestias, quasi sed itaque accusamus
      quibusdam. Possimus deserunt quia, quam ipsam fugiat cupiditate adipisci
      optio totam, beatae repellendus pariatur id impedit voluptatibus nam?
    </div>
  );
}
