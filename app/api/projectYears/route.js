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
        const { id } = await req.json();
        const result = await pool.query(`
            SELECT 
            year_of_award, COUNT(*) as projects_count 
            from project_details 
            where faculty_id = $1
            group by year_of_award;
        `, [id]);

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Error fetching patent details:", error);
        return NextResponse.json({ message: "Error fetching patent details" }, { status: 500 });
    }
}
