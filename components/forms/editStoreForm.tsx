"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { updateStore } from "@/lib/action/updateSupabase";

interface ISocialMedia {
  name: string;
  url: string;
}

interface IStore {
  id: string;
  name: string;
  description: string;
  location: string;
  phone: string;
  whatsapp: string;
  contact_mail: string;
  social_media: ISocialMedia[];
}
interface IAddStoreForm {
  storeData: IStore;
}

export default function AddStoreForm({ storeData }: IAddStoreForm) {
  const {
    id,
    name,
    description,
    location,
    phone,
    whatsapp,
    contact_mail,
    social_media,
  } = storeData;

  const [formData, setFormData] = useState<IStore>({
    id: id ?? "",
    name: name ?? "",
    description: description ?? "",
    location: location ?? "",
    phone: phone ?? "",
    whatsapp: whatsapp ?? "",
    contact_mail: contact_mail ?? "",
    social_media: social_media ?? [{ name: "", url: "" }],
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const addSocialMediaField = () => {
    setFormData({
      ...formData,
      social_media: [...formData.social_media, { name: "", url: "" }],
    });
  };

  const removeSocialMediaField = (index: number) => {
    if (formData.social_media.length > 1) {
      setFormData({
        ...formData,
        social_media: formData.social_media.filter((_, i) => i !== index),
      });
    }
  };

  const handleSocialMediaChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const updatedSocialMedia = formData.social_media.map((item, i) => {
      if (i === index) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setFormData({ ...formData, social_media: updatedSocialMedia });
  };

  return (
    <div className="w-1/2 max-w-[500px]">
      <form
        action={() => updateStore(formData, id)}
        className="h-full flex flex-col gap-6 mt-6">
        <section className="bg-white p-6 rounded-lg flex flex-col gap-6">
          <h3 className="text-3xl">Name and Description</h3>
          <label htmlFor="name">
            <p>Name</p>
            <Input
              type="text"
              className="mt-2"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name of your store"
            />
          </label>
          <label htmlFor="description" className="text-3xl">
            <p>Description</p>
            <Input
              className="mt-2"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description of your store of some key word"
            />
          </label>
        </section>

        <section className="bg-white p-6 rounded-lg flex flex-col gap-6">
          <h3 className="text-3xl">Location</h3>
          <label htmlFor="location" className="mt-5">
            <p>Location</p>
            <Input
              className="mt-2"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Location of the product"
            />
          </label>
        </section>

        <section className="bg-white p-6 rounded-lg flex flex-col gap-6">
          <h3 className="text-3xl">Contact data</h3>
          <label htmlFor="phone" className="">
            <p>Phone to users can use to contact you</p>
            <Input
              className="mt-2"
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Contact phone"
            />
          </label>
          <label htmlFor="whatsapp" className="mt-5">
            <p>Whatsapp to contact to order</p>
            <Input
              className="mt-2"
              type="number"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleInputChange}
              placeholder="Whatsapp"
            />
          </label>
          <label htmlFor="contact_mail" className="mt-5">
            <p>Contact mail</p>
            <Input
              className="mt-2"
              type="email"
              name="contact_mail"
              value={formData.contact_mail}
              onChange={handleInputChange}
              placeholder="contact mail"
            />
          </label>
        </section>

        <section className="bg-white p-6 rounded-lg flex flex-col gap-6">
          <h3 className="text-3xl">Social media</h3>
          {formData.social_media.map((item, index) => (
            <div className="flex" key={index}>
              <div className="flex-col flex w-full">
                <label htmlFor="name" className="mt-5">
                  <p>Name</p>
                  <Input
                    className="mt-2"
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={(e) => handleSocialMediaChange(index, e)}
                    placeholder="Social media name"
                  />
                </label>
                <label htmlFor="url" className="mt-5">
                  <p>URL</p>
                  <Input
                    className="mt-2"
                    type="text"
                    name="url"
                    value={item.url}
                    onChange={(e) => handleSocialMediaChange(index, e)}
                    placeholder="Social media URL"
                  />
                </label>
              </div>
              <div className="mt-5">
                {formData.social_media.length > 1 && (
                  <Button
                    variant="ghost"
                    className="self-start"
                    type="button"
                    onClick={() => removeSocialMediaField(index)}>
                    <XIcon className="w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            className="self-start"
            type="button"
            onClick={addSocialMediaField}>
            <PlusIcon className="w-4" />
          </Button>
        </section>

        <Button
          className="text-base px-6 py-4 rounded-lg mt-5 self-end"
          type="submit">
          Save store
        </Button>
      </form>
    </div>
  );
}
