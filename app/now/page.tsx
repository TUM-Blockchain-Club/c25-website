import { useSession } from "@/hooks/useSession";
import Now from "@/app/now/now";
import { fetchSessions } from "@/components/service/contentStrapi_static";
import { fetchSpeakers } from "@/components/service/contentStrapi";

export default async function NowPage() {
  const sessions = await fetchSessions();
  const speakers = await fetchSpeakers();

  return (
    <Now
      sessions={sessions}
      speakers={speakers}
      simulatedDate={new Date("2024-09-12T09:00:00+02:00")}
    />
  );
}
