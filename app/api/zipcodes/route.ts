import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const zipCodesFilePath = path.join(process.cwd(), "zipcodes.json");

export async function GET() {
  try {
    const data = await fs.readFile(zipCodesFilePath, "utf-8");
    const zipCodes = JSON.parse(data);
    return NextResponse.json(zipCodes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Помилка сервера ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { zipCode } = await req.json();
    if (!zipCode || !/^\d{5}$/.test(zipCode)) {
      return NextResponse.json({ error: "Невалідний зіпкод" }, { status: 400 });
    }

    const data = await fs.readFile(zipCodesFilePath, "utf-8");
    const zipCodes = JSON.parse(data);
    if (zipCodes.zipCodes.includes(zipCode)) {
      return NextResponse.json({ error: "Зіпкод вже існує" }, { status: 400 });
    }

    zipCodes.zipCodes.push(zipCode);
    await fs.writeFile(zipCodesFilePath, JSON.stringify(zipCodes, null, 2));
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Помилка сервера ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { zipCode } = await req.json();
    if (!zipCode) {
      return NextResponse.json({ error: "Зіпкод не вказано" }, { status: 400 });
    }

    const data = await fs.readFile(zipCodesFilePath, "utf-8");
    const zipCodes = JSON.parse(data);
    zipCodes.zipCodes = zipCodes.zipCodes.filter(
      (code: string) => code !== zipCode
    );
    await fs.writeFile(zipCodesFilePath, JSON.stringify(zipCodes, null, 2));
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Помилка сервера ${error}` },
      { status: 500 }
    );
  }
}
