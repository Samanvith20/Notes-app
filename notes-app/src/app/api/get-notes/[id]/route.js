import { connectDb } from "@/app/lib/Database";
import { NoteModel } from "@/app/models/notes.model";
import { ApiError } from "@/app/utils/Apierror";
import { ApiResponse } from "@/app/utils/Apiresponse";

export async function GET(req, res) {
  await connectDb();

  try {
     
  const { pathname } = new URL(req.url);
  const groupId = pathname.split('/').pop();
  console.log(groupId);

    if (!groupId) {
      throw new ApiError(400, 'GroupId is required');
    }

    const notes = await NoteModel.find({ groupId });
    return Response.json(new ApiResponse(200, notes, 'Notes fetched successfully'));
  } catch (error) {
    console.error('Error fetching notes:', error);
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Notes fetch failed';
    return Response.json(new ApiError(statusCode, message, error.errors));
  }
}
