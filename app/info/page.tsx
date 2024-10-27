export const dynamic = "force-dynamic";

import { getInfos } from "@/lib/Dao/becDao";
import View from "./View";
export default async function Home() {
  const getInfo = await getInfos();
  return (
    <div className="p-10">
      <View info={getInfo} />
    </div>
  );
}
