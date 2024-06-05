import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get('filename');

  if (filename) {
    const filePath = path.join(process.cwd(), 'src/app/components', filename);
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return new NextResponse(fileContent, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename=${filename}`,
        },
      });
    } catch (error) {
      return new NextResponse(JSON.stringify({ error: 'Error reading file' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } else {
    const componentsDirectory = path.join(process.cwd(), 'src/app/components');
    const files = fs.readdirSync(componentsDirectory);

    const downloadableFiles = files.map(file => ({
      filename: file,
      path: path.join(componentsDirectory, file),
    }));

    return NextResponse.json({ downloadableFiles });
  }
}
