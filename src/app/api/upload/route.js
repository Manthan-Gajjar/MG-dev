import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files');
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const uploadedUrls = [];

    for (const file of files) {
      // Convert file to base64 for cloudinary upload
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Data = buffer.toString('base64');
      const fileUri = `data:${file.type};base64,${base64Data}`;

      const res = await cloudinary.uploader.upload(fileUri, {
        folder: 'projects',
      });
      
      uploadedUrls.push(res.secure_url);
    }

    return NextResponse.json({ urls: uploadedUrls });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
