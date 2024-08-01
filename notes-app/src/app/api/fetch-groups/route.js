import { connectDb } from "@/app/lib/Database";
import { groupmodel } from "@/app/models/group.model";
import { ApiError } from "@/app/utils/Apierror";
import { ApiResponse } from "@/app/utils/Apiresponse";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDb();

  try {
    const groups = await groupmodel.find();
    return NextResponse.json(new ApiResponse(200, groups, 'Groups fetched successfully'));
  } catch (error) {
    console.error('Error fetching groups:', error);
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Groups fetch failed';
    return NextResponse.json(new ApiError(statusCode, message, error));
  }
}
