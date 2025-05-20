import pkg from 'pg';
const { Pool } = pkg;
import {NextResponse} from "next/server.js";

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "faculty",
    password: "root",
    port: 5432
});

export async function POST(req) {
    try{
        const { id } = await req.json();
        const result = await pool.query(`
            SELECT 
            experience_years, research_papers_count, fdp_attended_count, patents_count 
            FROM faculty 
            WHERE faculty_id = $1;
        `, [id]);
        console.log(result);
        return NextResponse.json(result.rows[0]);
    }
    catch (error) {
        console.error("Error fetching hero details:", error);
        return NextResponse.json({ message: "Error fetching hero details" }, { status: 500 });
    }

}