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

export async function POST(req  ) {
    try {
        const { id } = await req.json();
        const result = await pool.query(`
            SELECT 
            EXTRACT(YEAR FROM publication_date) AS publication_year,
            COUNT(*) AS research_paper_count
            FROM 
            research_details
            WHERE faculty_id = $1
            GROUP BY 
            publication_year;
        `, [id]);

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Error fetching research details:", error);
        return NextResponse.json({ message: "Error fetching research details" }, { status: 500 });
    }
}
