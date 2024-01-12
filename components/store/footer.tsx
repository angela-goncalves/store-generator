import { getCollectionsOfStore } from "@/lib/action/getData";
import { capitalizeFirstLetter } from "@/lib/uppercase";
import {
  CopyrightIcon,
  Facebook,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import whatsapp from "@/app/public/whatsapp.png";

interface IStore {
  id: string;
  created_at: string;
  description: string | null;
  logo: string | null;
  location: string;
  name: string | null;
  social_media: any[];
  phone: string;
  whatsapp: string;
  contact_mail: string;
  store_id: string | null;
}

export default async function Footer({ storeData }: { storeData: IStore }) {
  return (
    <footer className="w-full p-4 flex mt-10 text-sm items-center gap-4 flex-col bg-slate-300 text-black">
      <p className="text-lg">{storeData.name}</p>
      <div className="flex">
        <Link href="#">
          <InstagramIcon className="w-5" />
        </Link>
        <Link href="#">
          <Facebook className="w-5" />
        </Link>
      </div>

      <div className="flex gap-2">
        <PhoneIcon className="w-5" />
        {storeData.phone !== "" ? (
          <p>{storeData.phone}</p>
        ) : (
          <p>00 00 000 000</p>
        )}
      </div>

      <div className="flex gap-2">
        <Image src={whatsapp} width={20} height={20} alt="whatsapp icon" />
        {storeData.whatsapp !== "" ? (
          <p>{storeData.whatsapp}</p>
        ) : (
          <p>00 00 000 000</p>
        )}
      </div>

      {storeData.contact_mail !== "" ? (
        <div className="flex gap-2">
          <MailIcon className="w-5" />
          <p>{storeData.contact_mail}</p>
        </div>
      ) : (
        <div className="flex gap-2">
          <MailIcon className="w-5" />
          <p>contact@email.com</p>
        </div>
      )}

      <Separator className="w-full bg-gray-400 mt-2" />
      <div className="flex items-center gap-1">
        <CopyrightIcon className="w-4" />
        <p>copyright-2024</p>
      </div>
    </footer>
  );
}
