import { connectDb } from "@/app/lib/Database";
import { groupmodel } from "@/app/models/group.model";

import { ApiError } from "@/app/utils/Apierror";
import { ApiResponse } from "@/app/utils/Apiresponse";

export async function POST(req, res) {
    await connectDb();
  
    try {
        const body = await req.json();
       const { name, color } = body;
  
      if (!name || !color) {
        throw new ApiError(400, 'Name and color are required');
      }
  
      const group = await groupmodel.create({ name, color });
      return Response.json(new ApiResponse(201, group, 'Group created successfully'));
    } catch (error) {
      console.error('Error creating group:', error);
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Group creation failed';
      return Response.json(new ApiError(statusCode, message, error.errors));
    }
  }
  

