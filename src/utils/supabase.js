import { createClient } from "@supabase/supabase-js";

// Supabase configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing Supabase environment variables. Please check your .env.local file."
  );
  throw new Error(
    "Supabase configuration is missing. Please set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY in your environment variables."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// RSVP data management functions
export const saveRSVP = async (rsvpData) => {
  try {
    const { data, error } = await supabase
      .from("rsvps")
      .insert([
        {
          name: rsvpData.name,
          phone: rsvpData.phone || "",
          status: rsvpData.status,
          guests: parseInt(rsvpData.guests),
          wedding: rsvpData.events?.wedding || false,
          reception: rsvpData.events?.reception || false,
          message: rsvpData.message || "",
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    return data[0];
  } catch (error) {
    console.error("Error saving RSVP:", error);
    throw error;
  }
};

export const getRSVPs = async () => {
  try {
    const { data, error } = await supabase
      .from("rsvps")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    // Transform data to match expected format
    return data.map((rsvp) => ({
      id: rsvp.id,
      name: rsvp.name,
      phone: rsvp.phone,
      status: rsvp.status,
      guests: rsvp.guests,
      events: {
        wedding: rsvp.wedding,
        reception: rsvp.reception,
      },
      message: rsvp.message,
      timestamp: rsvp.created_at,
    }));
  } catch (error) {
    console.error("Error loading RSVPs:", error);
    return [];
  }
};

export const exportRSVPs = async () => {
  try {
    const rsvps = await getRSVPs();
    const csvContent = convertToCSV(rsvps);
    downloadCSV(csvContent, "wedding-rsvps.csv");
  } catch (error) {
    console.error("Error exporting RSVPs:", error);
    alert("Error exporting data. Please try again.");
  }
};

const convertToCSV = (data) => {
  if (data.length === 0) return "";

  const headers = [
    "Name",
    "Phone",
    "Status",
    "Guests",
    "Wedding",
    "Reception",
    "Message",
    "Date",
  ];
  const csvRows = [headers.join(",")];

  data.forEach((rsvp) => {
    const row = [
      `"${rsvp.name || ""}"`,
      `"${rsvp.phone || ""}"`,
      `"${rsvp.status || ""}"`,
      rsvp.guests || 0,
      rsvp.events?.wedding ? "Yes" : "No",
      rsvp.events?.reception ? "Yes" : "No",
      `"${rsvp.message || ""}"`,
      `"${new Date(rsvp.timestamp).toLocaleDateString()}"`,
    ];
    csvRows.push(row.join(","));
  });

  return csvRows.join("\n");
};

const downloadCSV = (content, filename) => {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// API object for easy import
export const api = {
  saveRSVP: saveRSVP,
  getRSVPs: getRSVPs,
  exportRSVPs: exportRSVPs,
};
