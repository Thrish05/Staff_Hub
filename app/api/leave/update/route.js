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
        const { id, status, user_name } = await req.json();

        if (!id || !user_name || !["pending", "sanctioned", "rejected"].includes(status)) {
            return NextResponse.json(
                { success: false, message: "Invalid input parameters" },
                { status: 400 }
            );
        }

        const query = `
            UPDATE leave_applications
            SET status = $1
            WHERE id = $2 AND user_name = $3
            RETURNING *;
        `;

        const result = await pool.query(query, [status, id, user_name]);

        if (result.rowCount === 0) {
            return NextResponse.json(
                { success: false, message: "No matching application found or user name mismatch" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: result.rows[0] }, { status: 200 });
    } catch (error) {
        console.error("Error updating application status:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
