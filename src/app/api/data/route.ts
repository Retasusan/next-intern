import { NextResponse, NextRequest } from "next/server";

import { Pool } from "pg";

const pool = new Pool({
  user: process.env.NEXT_USER,
  password: process.env.NEXT_PASSWORD,
  host: process.env.NEXT_HOST,
  port: Number(process.env.NEXT_PORT),
  database: process.env.NEXT_DATABASE,
  max: 20,
  connectionTimeoutMillis: 30000,
});

export async function GET() {
  try {
    const client = await pool.connect();
    const ret = await client.query("SELECT * FROM job");
    client.release();

    return NextResponse.json(ret.rows);
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, category, salary } = await request.json();
    const now = new Date().toISOString();
    const client = await pool.connect();
    const result = await client.query(
      `
        INSERT INTO job (title, category, salary, created_at, update_at) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *
        `,
      [title, category, salary, now, now]
    );

    client.release();
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Database insertion error:", error);
    return NextResponse.json(
      { error: "An error occurred while inserting data" },
      { status: 500 }
    );
  }
}
