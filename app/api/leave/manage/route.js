import pkg from 'pg';
const { Pool } = pkg;
import { NextResponse } from "next/server.js";

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "faculty",
    password: "root",
    port: 5432
});

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const department = searchParams.get("department");

    if (!department) {
        return NextResponse.json({ success: false, message: "Missing department" }, { status: 400 });
    }

    try {
        const result = await pool.query(
            `SELECT id, user_id, user_name, leave_type, from_date, to_date, reason, status
             FROM leave_applications
             WHERE department = $1
             ORDER BY id DESC`,
            [department]
        );

        return NextResponse.json({ success: true, data: result.rows }, { status: 200 });

    } catch (error) {
        console.error("Error fetching department applications:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
