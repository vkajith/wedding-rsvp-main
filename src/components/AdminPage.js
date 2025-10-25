import React, { useState, useEffect } from "react";
import {
  Heart,
  Clock,
  Users,
  Mail,
  Search,
  Download,
  Lock,
  X,
} from "lucide-react";
import { api } from "../utils/supabase";

export default function AdminPage() {
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [rsvps, setRsvps] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [invitationsSent] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    // Load RSVPs from Supabase
    const loadRSVPs = async () => {
      try {
        setIsLoading(true);
        setLoadError("");
        const data = await api.getRSVPs();
        setRsvps(data);
      } catch (error) {
        console.error("Error loading RSVPs:", error);
        setLoadError(
          "Failed to load RSVP data. Please check your connection and try again."
        );
        setRsvps([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadRSVPs();
  }, []);

  const accepted = rsvps.filter((r) => r.status === "accepted").length;
  const declined = rsvps.filter((r) => r.status === "declined").length;
  const notSure = rsvps.filter((r) => r.status === "not_sure").length;
  const totalAttendees = rsvps
    .filter((r) => r.status === "accepted")
    .reduce((sum, r) => sum + parseInt(r.guests), 0);

  const filteredRSVPs = rsvps
    .filter((r) => filterStatus === "all" || r.status === filterStatus)
    .filter(
      (r) =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.phone || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleExport = () => {
    api.exportRSVPs();
  };

  if (!isAdminAuth) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <Lock className="w-12 h-12 text-gray-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                const correctPassword =
                  process.env.REACT_APP_ADMIN_PASSWORD || "admin123";
                if (adminPassword === correctPassword) {
                  setIsAdminAuth(true);
                } else {
                  alert("Incorrect password");
                }
              }
            }}
            className="w-full px-4 py-3 rounded-lg border outline-none mb-2"
            placeholder="Password"
          />
          <p className="text-sm text-gray-500 mb-4">
            {process.env.REACT_APP_ADMIN_PASSWORD
              ? "Enter admin password"
              : "Demo: admin123"}
          </p>
          <button
            onClick={() => {
              const correctPassword =
                process.env.REACT_APP_ADMIN_PASSWORD || "admin123";
              if (adminPassword === correctPassword) {
                setIsAdminAuth(true);
              } else {
                alert("Incorrect password");
              }
            }}
            className="w-full bg-gray-800 text-white py-3 rounded-lg mb-2"
          >
            Login
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full text-gray-600"
          >
            Back to Invitation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">
          <h1 className="text-2xl font-bold">Wedding RSVP Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={() => (window.location.href = "/")}
              className="px-4 py-2 text-gray-600"
            >
              View Site
            </button>
            <button
              onClick={() => {
                setIsAdminAuth(false);
                setAdminPassword("");
              }}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loadError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {loadError}
            <button
              onClick={() => window.location.reload()}
              className="ml-4 text-red-600 underline hover:text-red-800"
            >
              Retry
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-gray-600">Loading RSVP data...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-5 gap-4 mb-8">
              {[
                {
                  icon: Heart,
                  color: "green",
                  value: accepted,
                  label: "Accepted",
                },
                { icon: X, color: "red", value: declined, label: "Declined" },
                {
                  icon: Clock,
                  color: "yellow",
                  value: notSure,
                  label: "Not Sure",
                },
                {
                  icon: Users,
                  color: "purple",
                  value: totalAttendees,
                  label: "Attendees",
                },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow">
                  <stat.icon
                    className={`w-8 h-8 text-${stat.color}-500 mb-2`}
                  />
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 shadow mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  {["all", "accepted", "not_sure", "declined"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilterStatus(f)}
                      className={`px-4 py-2 rounded-lg ${
                        filterStatus === f
                          ? f === "all"
                            ? "bg-gray-800 text-white"
                            : f === "accepted"
                            ? "bg-green-500 text-white"
                            : f === "not_sure"
                            ? "bg-yellow-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                  <button
                    onClick={handleExport}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    {[
                      "Name",
                      "Phone",
                      "Status",
                      "Events",
                      "Guests",
                      "Message",
                      "Date",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredRSVPs.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium">
                        {rsvp.name}
                      </td>
                      <td className="px-6 py-4 text-sm">{rsvp.phone || "-"}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            rsvp.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : rsvp.status === "not_sure"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {rsvp.status === "accepted"
                            ? "✓ Accepted"
                            : rsvp.status === "not_sure"
                            ? "? Not Sure"
                            : "✗ Declined"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {rsvp.status === "accepted" ? (
                          <div>
                            {rsvp.events?.wedding && (
                              <div className="text-xs">✓ Wedding</div>
                            )}
                            {rsvp.events?.reception && (
                              <div className="text-xs">✓ Reception</div>
                            )}
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">{rsvp.guests}</td>
                      <td className="px-6 py-4 text-sm max-w-xs">
                        <div className="truncate" title={rsvp.message || ""}>
                          {rsvp.message || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(rsvp.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredRSVPs.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No RSVPs found matching your criteria.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
