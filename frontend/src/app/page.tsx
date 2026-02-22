import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image
        src="https://crm-base-storage.5b1082ca8d9def07cf0a0cb57b422d2f.r2.cloudflarestorage.com/uploads/e598f42c-4032-41b6-8f2a-f49dfecc6207-Banner_Lan%C3%A7amento_do_Aplicativo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260222T143837Z&X-Amz-SignedHeaders=host&X-Amz-Credential=ad73ee447e7090b774d9aedba3128b75%2F20260222%2Fauto%2Fs3%2Faws4_request&X-Amz-Expires=900&X-Amz-Signature=14cc7ff03a49326df01c3ff9324c22046586428fac7ad518ca5db86f2679e1e6"
        fill
        className="object-cover"
        alt="Logo"
      />
    </div>
  );
}
