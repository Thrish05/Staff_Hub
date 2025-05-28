"use client";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/sideBar";
import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

interface User {
  faculty_name: string;
  department: string;
  faculty_position: string;
}

interface CalendarEvent {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  created_by: string;
  department: string;
  task_type: "HOD" | "FACULTY" | "Associate Professor";
  start: Date;
  end: Date;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    task_type: "FACULTY" as "HOD" | "FACULTY" | "Associate Professor",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<CalendarEvent | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<View>("month");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    console.log("User state updated:", user);
  }, [])

  useEffect(() => {
    if (user?.department) {
      fetchEvents();
    }
  }, [user]);

  const fetchEvents = async () => {
    if (!user?.department) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/calendar?department=${user.department}&facultyName=${user.faculty_name}&facultyPosition=${user.faculty_position}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.details || "Failed to fetch events");
      }
      const data = await response.json();
      const formattedEvents = data.map((event: CalendarEvent) => ({
        ...event,
        start: new Date(event.start_date),
        end: new Date(event.end_date),
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/calendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newEvent,
          created_by: user.faculty_name,
          department: user.department,
          task_type: newEvent.task_type,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.details || "Failed to create event");
      }

      setShowModal(false);
      setNewEvent({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        task_type: "FACULTY",
      });
      fetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/calendar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingEvent.id,
          title: newEvent.title,
          description: newEvent.description,
          start_date: newEvent.start_date,
          end_date: newEvent.end_date,
          task_type: editingEvent.task_type,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.details || "Failed to update event");
      }

      setShowModal(false);
      setEditingEvent(null);
      setNewEvent({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        task_type: "FACULTY",
      });
      fetchEvents();
    } catch (error) {
      console.error("Error updating event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventClick = (event: CalendarEvent) => {
    if (event.created_by === user?.faculty_name) {
      setEditingEvent(event);
      setNewEvent({
        title: event.title,
        description: event.description,
        start_date: event.start_date,
        end_date: event.end_date,
        task_type: event.task_type,
      });
      setShowModal(true);
    }
  };

  const handleDeleteEvent = async (event: CalendarEvent) => {
    setEventToDelete(event);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/calendar", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: eventToDelete.id,
          created_by: eventToDelete.created_by,
          task_type: eventToDelete.task_type,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Failed to delete task");
      }

      setShowDeleteModal(false);
      setEventToDelete(null);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = "#4dabf7"; // Default faculty task color
    let borderColor = "transparent";

    if (event.task_type === "HOD") {
      backgroundColor = "#000000"; // Indigo color for HOD tasks
    } else if (event.created_by === user?.faculty_name) {
      backgroundColor = "#3b82f6"; // Same blue as Add Task button
      borderColor = "#2563eb"; // Darker blue border
    }

    return {
      style: {
        backgroundColor,
        border: `2px solid ${borderColor}`,
        borderRadius: "5px",
        opacity: 0.9,
        color: "white",
        padding: "2px 4px",
        margin: "1px 0",
        height: "auto",
        minHeight: "20px",
        display: "block",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    };
  };

  const CustomEvent = ({ event }: { event: CalendarEvent }) => {
    const canDelete = user?.faculty_name === event.created_by;
    const [showTooltip, setShowTooltip] = useState(false);

    return (
      <div
        className="relative w-full h-full group"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="flex items-center justify-between w-full">
          <span className="font-semibold truncate text-sm">{event.title}</span>
          <div className="flex items-center gap-1">
            <span
              className={`ml-1 text-xs italic ${
                event.task_type === "HOD"
                  ? "text-white"
                  : event.created_by === user?.faculty_name
                  ? "text-white"
                  : "text-gray-200"
              }`}
            >
              {user?.faculty_position === "HOD" ? event.task_type === "HOD" ? "(Department Task)" : "(My Task)"
                : event.task_type === "FACULTY"
                ? "(Your Task)"
                : "(Department Task)"}
            </span>
            {canDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteEvent(event);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 hover:bg-red-100 p-0.5 rounded-full flex-shrink-0"
                title="Delete task"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        {showTooltip && (
          <div className="absolute z-50 bg-white p-2 rounded shadow-lg text-black text-xs mt-1 w-48">
            <p className="font-semibold">{event.title}</p>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-gray-500 mt-1">Created by: {event.created_by}</p>
            <p className="text-gray-500">
              Type: {event.task_type === "HOD" ? "HOD Task" : "Faculty Task"}
            </p>
          </div>
        )}
      </div>
    );
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const dayPropGetter = (day: Date) => {
    const isOutsideMonth = day.getMonth() !== date.getMonth(); // Compare day's month with current calendar month

    if (isOutsideMonth) {
      return {
        style: {
          backgroundColor: "#f0f0f0", // Slightly lighter grey than default, or white if preferred
        },
      };
    } else {
      return {}; // Default styling for days within the current month
    }
  };

  return (
    <>
      <Header />
      {/* Render content only when not loading and user is available */}
      {!isLoading && user && (
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Department Calendar</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#3b82f6] rounded"></div>
                  <span>
                    {user?.faculty_position === "HOD"
                      ? "My Tasks"
                      : "My Tasks"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#000000] rounded border-2 border-[#000000]"></div>
                  <span>
                    {user?.faculty_position === "HOD"
                      ? "Department Tasks"
                      : "Department Tasks"}
                  </span>
                </div>
                {user && (
                  <button
                    onClick={() => {
                      setEditingEvent(null);
                      setNewEvent({
                        title: "",
                        description: "",
                        start_date: "",
                        end_date: "",
                        task_type:
                          user?.faculty_position === "HOD" ? "HOD" : "FACULTY",
                      });
                      setShowModal(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Add Task
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                onSelectEvent={handleEventClick}
                eventPropGetter={eventStyleGetter}
                components={{
                  event: CustomEvent,
                }}
                popup
                popupOffset={30}
                view={view}
                onView={handleViewChange}
                onNavigate={handleNavigate}
                date={date}
                dayPropGetter={dayPropGetter}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modals and Loading Indicator are rendered outside the conditional content */}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 z-60 relative shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingEvent
                ? "Edit Task"
                : `Add New Task`}
            </h2>
            <form onSubmit={editingEvent ? handleEditEvent : handleCreateEvent}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      description: e.target.value,
                    })
                  }
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  value={newEvent.start_date}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, start_date: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  End Date
                </label>
                <input
                  type="datetime-local"
                  value={newEvent.end_date}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, end_date: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* Task Type Selection for HOD */}
              {user?.faculty_position === "HOD" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Task Type
                  </label>
                  <select
                    value={newEvent.task_type}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        task_type: e.target.value as "HOD" | "FACULTY",
                      })
                    }
                    className="w-full border rounded px-3 py-2"
                    required
                  >
                    <option value="FACULTY">Personal Task</option>
                    <option value="HOD">
                      Department Task
                    </option>
                  </select>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingEvent(null);
                    setNewEvent({
                      title: "",
                      description: "",
                      start_date: "",
                      end_date: "",
                      task_type: "FACULTY",
                    });
                  }}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editingEvent ? "Update Task" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && eventToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 z-60 relative shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete the task:{" "}
              <span className="font-semibold">{eventToDelete.title}</span>?
            </p>
            {eventToDelete.description && (
              <p className="text-gray-700 text-sm mb-4">
                Description: {eventToDelete.description}
              </p>
            )}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setEventToDelete(null);
                }}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center text-white">
            <svg
              className="animate-spin h-10 w-10 text-white mb-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Loading...</span>
          </div>
        </div>
      )}

      {/* Handle cases where user is not logged in or loading */}
      {!isLoading && !user && (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">
            Please log in to view the calendar.
          </h1>
        </div>
      )}
    </>
  );
}