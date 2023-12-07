"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { handleInsertCollections } from "@/lib/insertSupabase";
import { Button } from "../ui/button";
import { v4 as uuidv4 } from "uuid";

type FormDataType = {
  name: string;
  description: string;
  id: string;
};

export default function AddCollectionsForm({ storeId }: { storeId: string }) {
  const myUUID = uuidv4();
  const [inputs, setInputs] = useState<FormDataType[]>([
    { name: "", description: "", id: myUUID },
  ]);

  const handleInputChange = (
    index: number,
    field: "name" | "description",
    value: string
  ) => {
    const updatedPairs = [...inputs];
    updatedPairs[index][field] = value;
    setInputs(updatedPairs);
  };

  const addInputs = () => {
    setInputs([...inputs, { name: "", description: "", id: myUUID }]);
  };

  return (
    <div className="w-1/2 max-w-[500px]">
      <form
        action={() => handleInsertCollections(inputs, storeId)}
        className="flex flex-col">
        {inputs.map((item, index) => (
          <div key={item.id}>
            <div className="text-2xl mt-6">
              <label htmlFor={item.name}>Name</label>
              <Input
                type="text"
                name={item.name}
                className="mt-2"
                value={item.name}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
                placeholder="Name of the collection"
                required
              />
            </div>
            <div className="text-2xl mt-6">
              <label htmlFor={item.description}>Description</label>
              <Input
                type="text"
                name={item.description}
                className="mt-2"
                value={item.description}
                onChange={(e) =>
                  handleInputChange(index, "description", e.target.value)
                }
                placeholder="Name of the collection"
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          className="my-6 px-6 rounded-lg py-4 self-start bg-transparent border-primary"
          onClick={addInputs}
          variant="outline">
          add one more
        </Button>
        <Button
          className="border max-w-[200px] self-end rounded-lg px-6 py-4 my-6"
          type="submit">
          submit
        </Button>
      </form>
    </div>
  );
}
