import { addInfos, updateInfos } from "@/lib/Dao/becDao";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const event = await addInfos(data);
    return NextResponse.json({
      status: 201,
      message: "info added successfully",
      data: event,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
export async function PATCH(request: Request) {
  try {
    const data = await request.json();

    const info = await updateInfos(data);

    return NextResponse.json({
      status: 200,
      message: "info updated successfully",
      data: {},
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
