// CORRETO
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }, // aqui você tipa corretamente
) {
  const { id } = await params; // ✅ sem warnings
  const cookie = request.headers.get("cookie") || "";

  const backendRes = await fetch(`http://localhost:8080/images/${id}`, {
    headers: { cookie },
  });

  if (!backendRes.ok) {
    return NextResponse.json(
      { error: "Não autorizado ou imagem não encontrada" },
      { status: backendRes.status },
    );
  }

  const arrayBuffer = await backendRes.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const contentType = backendRes.headers.get("content-type") || "image/png";

  return new NextResponse(buffer, {
    headers: { "Content-Type": contentType },
  });
}
