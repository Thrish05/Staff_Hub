import pkg from 'pg';
const { Pool } = pkg;
import { NextResponse } from "next/server.js";

const pool = new Pool({
    user: "dinesh",
    host: "localhost",
    database: "faculty",
    password: "dinesh123",
    port: 5432
});

export async function POST(req) {
    try {
        const { id } = await req.json();
        const result = await pool.query(`
            Select status, COUNT(*) as status_count from patent_details where faculty_id = $1 GROUP BY status;
        `, [id]);

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Error fetching patent details:", error);
        return NextResponse.json({ message: "Error fetching patent details" }, { status: 500 });
    }
}
