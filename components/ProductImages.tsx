import { PlusIcon, Trash2Icon } from "lucide-react";
import React, { useEffect } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface IImageFile {
  file: File;
  rejected: boolean;
  preview?: string;
  errors?: FileRejection["errors"];
}

interface IProducts {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  collectionId: string;
  collectionName: string;
}

interface IProductImages {
  newImageFile: IImageFile[] | undefined;
  setNewImageFile: (file: IImageFile[] | undefined) => void;
  uploadedImage: string[] | undefined;
  handleDeleteUpdatedImage: (imageName: string) => void;
}

function ProductImages({
  newImageFile,
  setNewImageFile,
  uploadedImage,
  handleDeleteUpdatedImage,
}: IProductImages) {
  function sizeLengthValidator(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      return {
        code: "size-too-large",
        message: `Size is larger than 5MB`,
      };
    }

    return null;
  }

  const { getRootProps, getInputProps, open } = useDropzone({
    validator: sizeLengthValidator,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles, fileRejections) => {
      const imagesAccepted: IImageFile[] = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        rejected: false,
      }));
      const imagesRejected: IImageFile[] = fileRejections.map(
        ({ file, errors }) => ({
          file,
          rejected: true,
          errors,
        })
      );

      const updatedFiles = newImageFile
        ? [...newImageFile, ...imagesAccepted, ...imagesRejected]
        : [...imagesAccepted, ...imagesRejected];
      setNewImageFile(updatedFiles);
    },
  });

  const handleDelete = (nameFile: string) => {
    const filterFiles = newImageFile?.filter(
      (item) => item.file.name !== nameFile
    );
    setNewImageFile(filterFiles);
  };

  // Clean up the blob URLs when the component unmounts
  useEffect(() => {
    return () =>
      newImageFile &&
      newImageFile.forEach((file) => URL.revokeObjectURL(file.preview || ""));
  }, [newImageFile]);

  const findRejected = newImageFile?.find((item) => item.rejected) || null;
  return (
    <div>
      <section className="bg-white p-6 pb-8 rounded-lg flex flex-col my-4 gap-6 w-full">
        <h3 className="text-xl font-semibold">Images</h3>
        {(uploadedImage || newImageFile) && (
          <div>
            <h4>{findRejected ? "Rejected files:" : "Accepted files:"}</h4>
            <div className="flex items-center mt-6">
              <p
                className={`text-sm text-neutral-400 ${
                  findRejected ? "ml-0 w-52" : "ml-[80px] w-1/3"
                }`}>
                Name:
              </p>
            </div>
          </div>
        )}
        {uploadedImage &&
          uploadedImage.length &&
          uploadedImage.map((img) => {
            return (
              <li key={img} className="flex items-center gap-6 w-full">
                <img
                  src={img}
                  alt="image of the product"
                  className="w-14 rounded-lg"
                />
                <p className="w-1/3">{img}</p>
                <div className="flex flex-col w-1/3 items-end">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          type="button"
                          className=""
                          onClick={() => handleDeleteUpdatedImage(img || "")}>
                          <Trash2Icon className="w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Delete</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </li>
            );
          })}
        {newImageFile && newImageFile.length > 0 ? (
          <div className="flex-col flex">
            <ul className="flex flex-col gap-4">
              {newImageFile.map((file) => {
                if (file.rejected) {
                  return (
                    <li key={file.file.name} className=" w-full">
                      <div className="flex items-center gap-6">
                        <p
                          className="mb-1 w-52 truncate max-w-[250px]"
                          title={file.file.name}>
                          {file.file.name}{" "}
                        </p>
                        <Button
                          variant="ghost"
                          type="button"
                          className="py-0"
                          onClick={() => handleDelete(file.file.name)}>
                          <Trash2Icon className="w-4" />
                        </Button>
                      </div>
                      <ul>
                        {file.errors &&
                          file.errors.map((e) => (
                            <li
                              key={e.code}
                              className="text-sm text-red-500 leading-3">
                              {e.message}
                            </li>
                          ))}
                      </ul>
                    </li>
                  );
                }
                return (
                  <li
                    key={file.file.name}
                    className="flex items-center gap-6 w-full">
                    <img src={file.preview} className="w-14 rounded-lg" />
                    <p className="w-1/3">{file.file.name}</p>
                    <p className="w-1/3 ml-7">{file.file.size} bytes</p>
                    <div className="flex flex-col w-1/3 items-end">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              type="button"
                              className=""
                              onClick={() => handleDelete(file.file.name)}>
                              <Trash2Icon className="w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Delete</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <></>
        )}
        {uploadedImage || newImageFile ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="self-end"
                  onClick={open}>
                  <PlusIcon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Add new image</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div
            {...getRootProps()}
            className="border border-gray-400 bg-gray-100 h-28 rounded-lg w-full border-dashed">
            <label
              htmlFor="image"
              className="flex items-center justify-center h-full">
              <p>URL of the image</p>
              <input {...getInputProps()} name="image" />
            </label>
          </div>
        )}
      </section>
    </div>
  );
}

export default ProductImages;
