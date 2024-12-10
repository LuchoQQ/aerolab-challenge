"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import {toast} from 'react-hot-toast'
const BackButton = () => {
  return (
    <Link href="/" passHref className="flex items-center" onClick={() => toast.remove()}>
      <div className="flex items-center gap-3 mr-auto md:mr-auto">
        <ArrowLeft className="text-primary w-7 h-7" />
        <h2 className="text-primary font-primary font-bold text-lg">
          Back
        </h2>
      </div>
    </Link>
  );
};

export default BackButton;