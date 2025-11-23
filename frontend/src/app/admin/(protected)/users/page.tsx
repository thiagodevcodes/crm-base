"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/inputField";
import Image from "next/image";
import { useRouter } from "next/navigation";

import axios from "axios";

const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(2, "A senha deve ter no mínimo 2 caracteres"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function Home() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="grid lg:grid-cols-2">
   

    </div>
  );
}
