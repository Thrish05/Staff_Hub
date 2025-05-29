// app/api/facultySearch/route.js
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const department = searchParams.get('department');
  const designation = searchParams.get('designation');
  console.log("department: ", department);
  console.log("designation: ", designation);

  let baseQuery = `
    SELECT faculty_id, name, pan_number, aadhar_number, email, phone, department, designation,
    date_of_joining, qualification, specialization, phd_guideship, expertise_in_subjects, experience_years, research_papers_count,
    fdp_attended_count, award_achievement_activity, patents_count, photo
    FROM faculty
    WHERE LOWER(name) LIKE LOWER($1)
  `;

  const params = [`%${q}%`];
  let paramIndex = 2;

  if (department) {
    baseQuery += ` AND department = $${paramIndex++}`;
    params.push(department);
  }

  if (designation) {
    baseQuery += ` AND designation = $${paramIndex++}`;
    params.push(designation);
  }

  baseQuery += ` ORDER BY name ASC`;

  try {
    const result = await pool.query(baseQuery, params);
    
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('[facultySearch]', error);
    return NextResponse.json({ error: 'Error fetching faculty data' }, { status: 500 });
  }
}
