import { addMailServices, getMailServices } from "@/lib/Dao/mailDao";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log(data);

    const services = await addMailServices(data);
    return NextResponse.json({
      status: 201,
      message: "Service added successfully",
      data: services,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}

export async function GET(request: Request) {
  try {
    const data = await getMailServices();
    return NextResponse.json({
      status: 200,
      data,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
