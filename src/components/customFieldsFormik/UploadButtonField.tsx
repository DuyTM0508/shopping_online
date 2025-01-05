import React, { useRef } from "react";
import { Camera } from "lucide-react";
import { get, isString } from "lodash";
import { AdditionalFormikProps } from "@/interfaces/common";
import { Input } from "../ui/input";

interface Props {
  className?: string;
  notIcon?: boolean;
  upload: (files: File) => void;
  text?: React.ReactNode;
  accept?: string;
}

const ButtonUploadField = ({
  className,
  notIcon,
  upload,
  text,
  form,
  field,
  accept,
}: Props & AdditionalFormikProps) => {
  const { name } = field;
  const { errors, touched } = form;
  const msgError = get(touched, name) && (get(errors, name) as string);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      upload(e.target.files[0]);
    }
  };
  return (
    <>
      <div className={className} onClick={() => inputRef?.current?.click()}>
        <Input
          accept={accept}
          className="hidden"
          ref={inputRef}
          type="file"
          onChange={handleChangeFile}
        />
        {text ? text : null}
        {!notIcon ? <Camera size={30} /> : null}
      </div>
      {isString(msgError) && <span className="invalid-text">{msgError}</span>}
    </>
  );
};

export default ButtonUploadField;
