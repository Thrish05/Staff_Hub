// app/api/facultySearch/route.js
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';

  try {
    const result = await pool.query(
      `SELECT faculty_id, name, pan_number, aadhar_number, email, phone, department, designation,
      date_of_joining, qualification, specialization, phd_guideship, expertise_in_subjects, experience_years, research_papers_count,
      fdp_attended_count, award_achievement_activity, patents_count, photo
       FROM faculty
       WHERE LOWER(name) LIKE LOWER($1)
       ORDER BY name ASC`,
      [`%${q}%`]
    );

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('[facultySearch]', error);
    return NextResponse.json({ error: 'Error fetching faculty data' }, { status: 500 });
  }
}
