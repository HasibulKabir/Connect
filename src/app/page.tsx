"use client";

import AboutSection from "@/components/about/AboutSection";
import HeroSection from "@/components/HeroSection";
import NoticeBoard from "@/components/NoticeBoard";
import EventHome from "@/components/EventHomeRotate";
import { config } from "@/lib/config";
import { useEffect, useState } from "react";

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  photo?: string;
};

export default function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUpcomingEvents() {
      try {
        const res = await fetch(`${config.apiBaseUrl}/v1/events/list`);
        const data = await res.json();
        setUpcomingEvents(data.upcoming || []);
      } catch (err) {
        console.error("Failed to load events", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUpcomingEvents();
  }, []);

  return (
    <div className="space-y-16">
      <HeroSection />

      <div className="flex flex-col lg:flex-row gap-6">
        <main className="flex-1 space-y-16">
          <section className="bg-white rounded-xl p-6 shadow-md">
            <AboutSection />
          </section>

          {!loading && upcomingEvents.length > 0 && (
            <EventHome events={upcomingEvents} />
          )}

          <NoticeBoard />
        </main>
      </div>
    </div>
  );
}
