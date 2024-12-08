"use client"
import DetailsPage from "@/components/layouts/DetailsPage";
import axios from "axios";
import { useEffect, useState } from "react";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
   

   
    return <DetailsPage params={params}/>
}
