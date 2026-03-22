import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    // Map Mongoose _id to id for frontend compatibility
    const mappedProjects = projects.map((p) => ({
      ...p.toObject(),
      id: p._id.toString(),
    }));
    return NextResponse.json(mappedProjects);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const project = await Project.create(body);
    return NextResponse.json({ ...project.toObject(), id: project._id.toString() });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
