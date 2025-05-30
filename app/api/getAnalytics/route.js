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
        const { id } = await req.json();
        const hero = await pool.query(`
            SELECT 
            experience_years, research_papers_count, fdp_attended_count, patents_count 
            FROM faculty 
            WHERE faculty_id = $1;
        `, [id]);

        const patentDetails = await pool.query(`
            SELECT *
            FROM patent_details
            WHERE faculty_id = $1;`, [id]);

        const patentStatus = await pool.query(`
            Select status, COUNT(*) as status_count from patent_details where faculty_id = $1 GROUP BY status;
        `, [id]);

        const patentsAcrossYears = await pool.query(`SELECT 
            EXTRACT(YEAR FROM publication_date) AS publication_year,
            COUNT(*) AS patents_count
            FROM 
            patent_details
            WHERE faculty_id = $1
            GROUP BY 
            publication_year
            ORDER BY 
            publication_year;`, [id]);

        const researchGraph = await pool.query(`
            SELECT 
            EXTRACT(YEAR FROM publication_date) AS publication_year,
            COUNT(*) AS research_paper_count
            FROM 
            research_details
            WHERE faculty_id = $1
            GROUP BY 
            publication_year
            ORDER BY
            publication_year;
        `, [id]);

        const researchDetails = await pool.query(`
            SELECT *
            FROM research_details
            WHERE faculty_id = $1;`, [id]);

        const projectGraph = await pool.query(`
            SELECT 
            year_of_award, COUNT(*) as projects_count 
            from project_details 
            where faculty_id = $1
            group by year_of_award
            order by year_of_award;
        `, [id]);

        const projectDetails = await pool.query(`
            SELECT *
            FROM project_details
            WHERE faculty_id = $1`, [id]);

        const fdpGraph = await pool.query(`
            SELECT fdp_category, COUNT(*) AS count
            FROM fdp_details
            WHERE faculty_id = $1
            GROUP BY fdp_category;
            `, [id]);

        const fdpDetails = await pool.query(`
            SELECT *
            FROM fdp_details
            WHERE faculty_id = $1;`, [id]);


        return NextResponse.json({
            hero: hero.rows[0], patentDetails: patentDetails.rows, patentStatus: patentStatus.rows, patentsAcrossYears: patentsAcrossYears.rows,
            researchGraph: researchGraph.rows, researchDetails: researchDetails.rows, projectGraph: projectGraph.rows, projectDetails: projectDetails.rows, fdpGraph: fdpGraph.rows, fdpDetails: fdpDetails.rows
        },

            {
                status: 200,
                headers: {
                    'Content-Type': "application/json"
                }
            });
    }
    catch (error) {
        console.error("Error fetching details:", error);
        return NextResponse.json({ message: "Error fetching details" }, { status: 500 });
    }
}