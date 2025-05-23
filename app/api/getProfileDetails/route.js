import pkg from 'pg';
const { Pool } = pkg;
import { NextResponse } from 'next/server.js';

const pool = new Pool({
    host: "localhost",
    user: "dinesh",
    password: "dinesh123",
    database: "faculty",
    port: 5432
})

export async function POST(req) {
    const { id } = await req.json();
    try {
        const result = await pool.query(`
            SELECT *
            FROM faculty
            WHERE faculty_id = $1;`,
            [id]);

        if (result.rows.length == 0) {
            return NextResponse.json(
                { message: "No such user found" },
                { status: 401 }
            );
        }

        const details = result.rows[0];
        return NextResponse.json(details);
    }
    catch (error) {
        console.error("Error fetching profile details:", error);
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}