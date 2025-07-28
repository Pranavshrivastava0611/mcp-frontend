import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("req.body", body);

    // Extract token from cookies
    const token = req.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized: No token found' }, { status: 401 });
    }

    // Forward the token to backend via header or cookie
    const backendRes = await axios.post(
      'https://mcp-request-backend.onrender.com/api/leads',
      body,
      {
        headers: {
          'Content-Type': 'application/json',

          Authorization: `Bearer ${token}`,
          Cookie: `token=${token}`
        },
        withCredentials: true
      }
    );
    return NextResponse.json(backendRes.data);
  } catch (error: any) {
    console.error('Error proxying request:', error || error.message);
    return NextResponse.json(
      {
        success: false,
        message: error?.response?.data?.message || 'Internal Server Error'
      },
      { status: 500 }
    );
  }
}
