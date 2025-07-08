"use client";

import { useState } from "react";
import EventCard from "./EventCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  photo?: string;
};

export default function EventHome({ events }: { events: Event[] }) {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const maxIndex = Math.max(0, events.length - itemsPerPage);

  const handleNext = () => {
    if (startIndex + itemsPerPage < events.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const visibleEvents = events.slice(startIndex, startIndex + itemsPerPage);

  if (events.length === 0) return null;

  return (
    <section className="bg-white rounded-xl p-6 shadow-md relative">
      <h2 className="text-2xl font-bold mb-6 text-red-800 text-center">Upcoming Events</h2>

      <div className="flex items-center justify-center gap-4 relative">
        {startIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-items-center">
          {visibleEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {startIndex + itemsPerPage < events.length && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </section>
  );
}
