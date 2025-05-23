import pkg from "pg";
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
        const result = await pool.query(`SELECT 
        EXTRACT(YEAR FROM publication_date) AS publication_year,
        COUNT(*) AS patents_count
        FROM 
        patent_details
        WHERE faculty_id = $1
        GROUP BY 
        publication_year
        ORDER BY 
        publication_year;`, [id])

        return NextResponse.json(result.rows);
    }
    catch (error) {
        console.error("Error fetching patent years:", error);
        return NextResponse.json({ message: "Error fetching patent years" }, { status: 500 });
    }
}