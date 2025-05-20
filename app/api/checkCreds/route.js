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
        console.log("Incoming login request:");
        const body = await req.json();
        const { email, password } = body;

        console.log("Received login request:", email, password);

        const result = await pool.query(
            'SELECT * FROM credentials WHERE email = $1 AND pwd = $2',
            [email, password]
        );

        if(result.rows.length == 0)
        {
            return NextResponse.json(
                {message: "Invalid login credentials provided"},
                {status: 401}
            );
        }

        const user = result.rows[0];
        delete user.pwd;
        return NextResponse.json(user);
    }
    catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
        { message: 'Server error during login' },
        { status: 500 }
        );
    }

}