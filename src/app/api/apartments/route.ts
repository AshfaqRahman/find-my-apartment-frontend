import { NextRequest, NextResponse } from 'next/server';

// import { checkAuth } from 'lib/auth';
// import prisma from 'lib/prisma';

// import messages from 'constants/messages';



export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;
    console.log(searchParams)
}