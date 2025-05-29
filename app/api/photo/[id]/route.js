import { pool } from '../../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const facultyId = params.id;
  console.log("ID: ", facultyId);

  try {
    const result = await pool.query(
    `SELECT photo FROM faculty WHERE faculty_id = $1`,
      [facultyId]
    );
    console.log("Result: ", result.rows);
    if (result.rows.length === 0 || result.rows[0].photo === null) {
      const baseUrl = new URL(request.url).origin;
      return NextResponse.redirect(`${baseUrl}/images/placeholder.jpg`, 302);
    }

    const imageBuffer = result.rows[0].photo;

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg', // or image/png if needed
        'Content-Length': imageBuffer.length,
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse('Server error', { status: 500 });
  }
}
