import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import os from 'os';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const foldername = searchParams.get('foldername');
  const listFiles = searchParams.get('listFiles');
  const downloadPath = path.join(os.homedir(), 'Downloads');

  if (foldername) {
    const folderPath = path.join(process.cwd(), 'src/app/components', foldername);

    if (listFiles === 'true') {
      try {
        const files = fs.readdirSync(folderPath);
        return NextResponse.json({ files });
      } catch (error) {
        return new NextResponse(JSON.stringify({ error: 'Error reading folder' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    } else {
      try {
        const zipPath = path.join(downloadPath, `${foldername}.zip`);
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', {
          zlib: { level: 9 }
        });

        archive.on('warning', function (err) {
          if (err.code === 'ENOENT') {
            console.warn(err);
          } else {
            throw err;
          }
        });

        archive.on('error', function (err) {
          throw err;
        });

        archive.pipe(output);
        archive.directory(folderPath, false);
        await archive.finalize();

        const fileContent = fs.readFileSync(zipPath);

        return new NextResponse(JSON.stringify({ filePath: zipPath }), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        return new NextResponse(JSON.stringify({ error: 'Error creating zip file' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    }
  } else {
    const componentsDirectory = path.join(process.cwd(), 'src/app/components');
    const folders = fs.readdirSync(componentsDirectory).filter(file => fs.statSync(path.join(componentsDirectory, file)).isDirectory());
    const downloadableFolders = folders.map(folder => ({
      foldername: folder,
      path: path.join(componentsDirectory, folder),
    }));
    return NextResponse.json({ downloadableFolders });
  }
}
