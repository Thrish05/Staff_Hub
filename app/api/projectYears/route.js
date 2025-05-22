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
        const graph = await pool.query(`
            SELECT 
            year_of_award, COUNT(*) as projects_count 
            from project_details 
            where faculty_id = $1
            group by year_of_award;
        `, [id]);

        const details = await pool.query(`
            SELECT *
            FROM project_details
            WHERE faculty_id = $1`, [id]);

        return NextResponse.json({graph: graph.rows, details: details.rows}, {
            status:200,
            headers: {
                'Content-Type' : "application/json"
            }
        });
        
    } catch (error) {
        console.error("Error fetching patent details:", error);
        return NextResponse.json({ message: "Error fetching patent details" }, { status: 500 });
    }
}
