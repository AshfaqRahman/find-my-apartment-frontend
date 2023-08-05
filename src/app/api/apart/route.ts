import { NextRequest, NextResponse } from 'next/server';




export async function GET(request: NextRequest) {
	console.log("here")
	const { searchParams } = request.nextUrl;
	const from = searchParams.get('from') || '';
	const to = searchParams.get('to') || '';
	const categories: any = searchParams.get('categories') || '';
}
