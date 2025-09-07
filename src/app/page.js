import MusicGridClient from "../Components/MusicGridClient";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function Page() {
  await sleep(2000);
  return <MusicGridClient />;
}
