// app/api/login/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';


export async function POST(req: Request) {
  try {
    const body = await req.json();

    const backendResponse = await axios.post(
      'https://mcp-request-backend.onrender.com/api/auth/login',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    console.log("backendResponse:",backendResponse.data)
    // Extract the Set-Cookie header
    const setCookie = backendResponse.headers['set-cookie'];

    const response = NextResponse.json(backendResponse.data, {
      status: backendResponse.status,
    });

    // Forward Set-Cookie to the client if it exists
    if (setCookie) {
      response.headers.set('Set-Cookie', setCookie.toString());
    }

    return response;
  } catch (err: any) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.message || 'Internal Server Error';
    return NextResponse.json({ message }, { status });
  }
}
