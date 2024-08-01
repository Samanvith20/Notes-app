import { connectDb } from "@/app/lib/Database";
import { groupmodel } from "@/app/models/group.model";
import { ApiError } from "@/app/utils/Apierror";
import { ApiResponse } from "@/app/utils/Apiresponse";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDb();

  
  const { pathname } = new URL(req.url);
  const id = pathname.split('/').pop();

  if (!id) {
    return NextResponse.json(new ApiError(400, 'ID is required'));
  }

  try {
    const group = await groupmodel.findById(id);

    if (!group) {
      return NextResponse.json(new ApiError(404, 'Group not found'));
    }

    return NextResponse.json(new ApiResponse(200, group, 'Group fetched successfully'));
  } catch (error) {
    console.error('Error fetching group:', error);
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Group fetch failed';
    return NextResponse.json(new ApiError(statusCode, message, error));
  }
}
