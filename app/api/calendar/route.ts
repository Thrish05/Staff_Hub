import pkg from "pg";
const { Pool } = pkg;
import { NextResponse } from "next/server.js";
import { NextRequest } from "next/server";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "faculty",
  password: "root",
  port: 5432,
});

// Test database connection
const testConnection = async () => {
  try {
    const client = await pool.connect();
    client.release();
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

testConnection();

// Create calendar_events table if it doesn't exist
const createTable = async () => {
  try {
    // First create the table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS calendar_events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        start_date TIMESTAMP NOT NULL,
        end_date TIMESTAMP NOT NULL,
        created_by VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Then check if task_type column exists and add it if it doesn't
    const columnExists = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'calendar_events' 
      AND column_name = 'task_type';
    `);

    if (columnExists.rows.length === 0) {
      await pool.query(`
        ALTER TABLE calendar_events 
        ADD COLUMN task_type VARCHAR(50) NOT NULL DEFAULT 'FACULTY';
      `);
      console.log("Added task_type column to calendar_events table");
    }

    console.log("Calendar events table is up to date");
  } catch (error) {
    console.error("Error setting up calendar_events table:", error);
  }
};

// Initialize table
createTable();

// Get all calendar events for a department
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const department = searchParams.get("department");
  const facultyName = searchParams.get("facultyName");
  const facultyPosition = searchParams.get("facultyPosition");

  if (!department || !facultyName || !facultyPosition) {
    return NextResponse.json(
      { error: "Department, faculty name, and position are required" },
      { status: 400 }
    );
  }

  try {
    let query = `
      SELECT * FROM calendar_events 
      WHERE department = $1 
    `;
    const params = [department];

    // Filter based on user role and position
    if (facultyPosition === "HOD") {
      // HODs see tasks they created
      query += ` AND created_by = $2`;
      params.push(facultyName);
    } else {
      // Faculty see their own tasks and HOD tasks, but not other faculty tasks
      query += ` AND (created_by = $2 OR (task_type = 'HOD' AND created_by != $2))`;
      params.push(facultyName);
    }

    query += ` ORDER BY start_date ASC`;

    const result = await pool.query(query, params);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return NextResponse.json(
      { error: "Database error", details: error.message },
      { status: 500 }
    );
  }
}

// Create a new calendar event
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received request body:", body);

    const {
      title,
      description,
      start_date,
      end_date,
      created_by,
      department,
      task_type,
    } = body;

    if (
      !title ||
      !start_date ||
      !end_date ||
      !created_by ||
      !department ||
      !task_type
    ) {
      console.error("Missing required fields:", {
        title: !title,
        start_date: !start_date,
        end_date: !end_date,
        created_by: !created_by,
        department: !department,
        task_type: !task_type,
      });
      return NextResponse.json(
        {
          error: "Missing required fields",
          details: "All fields are required",
        },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `INSERT INTO calendar_events 
             (title, description, start_date, end_date, created_by, department, task_type)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
      [
        title,
        description || "",
        start_date,
        end_date,
        created_by,
        department,
        task_type,
      ]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating calendar event:", error);
    return NextResponse.json(
      { error: "Database error", details: error.message },
      { status: 500 }
    );
  }
}

// Update an existing calendar event
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received update request body:", body);

    const { id, title, description, start_date, end_date, task_type } = body;

    if (!id || !title || !start_date || !end_date || !task_type) {
      console.error("Missing required fields:", {
        id: !id,
        title: !title,
        start_date: !start_date,
        end_date: !end_date,
        task_type: !task_type,
      });
      return NextResponse.json(
        {
          error: "Missing required fields",
          details: "All fields are required",
        },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `UPDATE calendar_events 
       SET title = $1, description = $2, start_date = $3, end_date = $4, task_type = $5
       WHERE id = $6
       RETURNING *`,
      [title, description || "", start_date, end_date, task_type, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Event not found", details: `No event found with id ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating calendar event:", error);
    return NextResponse.json(
      { error: "Database error", details: error.message },
      { status: 500 }
    );
  }
}

// Delete a calendar event
export async function DELETE(req: NextRequest) {
  try {
    const { id, created_by, task_type } = await req.json();

    if (!id || !created_by || !task_type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Delete the event only if the user is the creator
    const result = await pool.query(
      `DELETE FROM calendar_events 
       WHERE id = $1 AND created_by = $2 AND task_type = $3
       RETURNING *`,
      [id, created_by, task_type]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Event not found or unauthorized to delete" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting calendar event:", error);
    return NextResponse.json(
      { error: "Database error", details: error.message },
      { status: 500 }
    );
  }
}