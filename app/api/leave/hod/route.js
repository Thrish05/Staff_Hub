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

export async function GET() {
    try {
        const result = await pool.query(
            `SELECT la.id, la.faculty_id, la.user_name, la.leave_type, la.from_date, la.to_date, la.reason, la.status, la.department
             FROM leave_applications la WHERE la.designation = 'HOD'
             ORDER BY la.id DESC`
        );

        return NextResponse.json({ success: true, data: result.rows }, { status: 200 });

    } catch (error) {
        console.error("Error fetching HOD applications:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
