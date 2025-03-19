"use client";
import { Bell, Gift, PartyPopper, Cloud } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export function EventReminders() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/notifications/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Group events by date
  const groupedEvents = events.reduce((acc, event) => {
    const date = new Date(event.eventDate);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      weekday: 'long'
    });

    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(event);
    return acc;
  }, {});

  return (
    <Card className="bg-zinc-900 p-6 h-full mx-6 mt-1">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold text-white">Events</h2>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-400">Loading events...</span>
          </div>
        ) : error ? (
          <Card className="bg-red-900/20 border border-red-700">
            <CardContent className="pt-6">
              <p className="text-red-400">Error loading events: {error}</p>
              <p className="text-sm text-gray-400 mt-2">Please check your API server is running at http://localhost:3000</p>
            </CardContent>
          </Card>
        ) : Object.keys(groupedEvents).length === 0 ? (
          <Card className="bg-gray-800 border border-gray-700">
            <CardContent className="pt-6">
              <p className="text-gray-400">No events found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedEvents).map(([date, dateEvents]) => (
              <Card key={date} className="bg-black border border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">{date}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dateEvents.map((event, index) => (
                    <div key={index} className="border-t border-gray-700 pt-4 first:border-0 first:pt-0">
                      <h3 className="font-semibold text-white">{event.eventTitle}</h3>
                      <p className="text-sm text-gray-400 mt-1">{event.eventDescription}</p>
                      {event.venue && (
                        <p className="text-xs text-gray-500 mt-2">
                          <span className="font-medium">Location:</span> {event.venue}
                        </p>
                      )}
                      {event.time && (
                        <p className="text-xs text-gray-500">
                          <span className="font-medium">Time:</span> {event.time}
                        </p>
                      )}
                    </div>
                  ))}
                  <Button>Register</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Fallback static content (will show if no API data is available) */}
        {!loading && Object.keys(groupedEvents).length === 0 && !error && (
          <div className="space-y-4">
            <Card className="bg-black border border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Feb 18, Tuesday</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-white">
                  Recruitment Notice: Chitkara University Toastmasters International Club
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Dear All, Please find attached notice and brochure of Recruitment for Chitkara University
                  Toastmasters International Club...
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Feb 17, Monday</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-white">Chitkara Circle Style Kabaddi Cup 2025</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Dear All, Please find the attachment for the notice of the Chitkara Circle Style Kabaddi Cup 2025...
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Card>
  );
}