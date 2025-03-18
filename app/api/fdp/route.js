import pkg from 'pg';
const { Pool } = pkg;
import { NextResponse } from "next/server.js";

const pool = new Pool({
    user: "dinesh",
    host: "localhost",
    database: "faculty_db",
    password: "dinesh123",
    port: 5432
});

export async function GET() {
    try {
        const result = await pool.query(`
            SELECT name AS faculty_name, fdp_attended_count AS fdp_count
            FROM faculty
        `);

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Error fetching fdp details:", error);
        return NextResponse.json({ message: "Error fetching fdp details" }, { status: 500 });
    }
}
