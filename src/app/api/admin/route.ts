import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'src/data/portfolio.json');

export async function GET() {
    try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading data file:', error);
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

const ADMIN_PASS_FILE = path.join(process.cwd(), 'src/data/adminpass.json');

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password, data } = body;

        // Read password from file
        let storedPassword = "";
        try {
            const passContent = await fs.readFile(ADMIN_PASS_FILE, 'utf-8');
            const passData = JSON.parse(passContent);
            storedPassword = passData.password;
        } catch (error) {
            console.error('Error reading password file:', error);
            // Fallback or error if password file is missing
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        // Basic authentication
        if (password !== storedPassword) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Validate data structure (conceptual - could use Zod here for better safety)
        if (!data || !data.navItems || !data.skills || !data.experience || !data.projects) {
            return NextResponse.json({ error: 'Invalid data structure' }, { status: 400 });
        }

        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');

        return NextResponse.json({ success: true, message: 'Data updated successfully' });
    } catch (error) {
        console.error('Error updating data file:', error);
        return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
    }
}
