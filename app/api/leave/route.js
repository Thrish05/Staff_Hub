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

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            userId,
            userName,
            department,
            leaveType,
            approver,
            fromDate,
            toDate,
            reason
        } = body;

        const result = await pool.query(
            `INSERT INTO leave_applications
            (user_id, user_name, department, leave_type, approver, from_date, to_date, reason, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *`,
            [userId, userName, department, leaveType, approver, fromDate, toDate, reason, 'pending']
        );

        return NextResponse.json({ success: true, data: result.rows[0] }, { status: 201 });

    } catch (error) {
        console.error("Error saving leave application:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("faculty_id");
    const department = searchParams.get("department");

    if (!userId || !department) {
        return NextResponse.json({ error: "Missing query parameters" }, { status: 400 });
    }

    try {
        const result = await pool.query(
            `SELECT id, leave_type, from_date, to_date, reason, status
             FROM leave_applications
             WHERE user_id = $1 AND department = $2
             ORDER BY id DESC`,
            [userId, department]
        );

        return NextResponse.json(result.rows, { status: 200 });

    } catch (error) {
        console.error("Error fetching leave applications:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
