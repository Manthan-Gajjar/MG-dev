import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    const body = await req.json();
    
    const project = await Project.findByIdAndUpdate(id, body, { new: true });
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ ...project.toObject(), id: project._id.toString() });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    
    const project = await Project.findByIdAndDelete(id);
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
