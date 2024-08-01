import { connectDb } from "@/app/lib/Database";
import { NoteModel } from "@/app/models/notes.model";
import { ApiError } from "@/app/utils/Apierror";
import { ApiResponse } from "@/app/utils/Apiresponse";

export async function POST(req, res) {
  await connectDb();

  try {
    const { content, groupId } =  await req.json();

    if (!content || !groupId) {
      throw new ApiError(400, 'Content and groupId are required');
    }

    const note = await NoteModel.create({ content, groupId });
    return Response.json(new ApiResponse(201, note, 'Note created successfully'));
  } catch (error) {
    console.error('Error creating note:', error);
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Note creation failed';
    return Response.json(new ApiError(statusCode, message, error.errors));
  }
}
