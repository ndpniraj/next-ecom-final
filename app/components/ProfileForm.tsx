"use client";
import React, { useState, useTransition } from "react";
import { Button, Input } from "@material-tailwind/react";
import ProfileAvatarInput from "@components/ProfileAvatarInput";
import { toast } from "react-toastify";
import { uploadImage } from "../utils/helper";
import { updateUserProfile } from "../(private_route)/profile/action";
import { UserProfileToUpdate } from "../types";
import { useRouter } from "next/navigation";

interface Props {
  avatar?: string;
  name: string;
  email: string;
  id: string;
}

export default function ProfileForm({ id, name, avatar, email }: Props) {
  const [isPending, startTransition] = useTransition();
  const [avatarFile, setAvatarFile] = useState<File>();
  const [userName, setUserName] = useState(name);
  const router = useRouter();

  const avatarSource = avatarFile ? URL.createObjectURL(avatarFile) : avatar;
  const showSubmitButton = avatarSource !== avatar || userName !== name;

  const updateUserInfo = async () => {
    if (userName.trim().length < 3) return toast.error("Name is invalid!");

    const info: UserProfileToUpdate = { id, name: userName };

    if (avatarFile) {
      const avatar = await uploadImage(avatarFile);
      info.avatar = avatar;
    }

    await updateUserProfile(info);
    router.refresh();
  };

  return (
    <form
      action={() => {
        startTransition(async () => {
          await updateUserInfo();
        });
      }}
      className="space-y-6"
    >
      <ProfileAvatarInput
        onChange={setAvatarFile}
        nameInitial={name[0]}
        avatar={avatarSource}
      />
      <div className="text-sm">Email: {email}</div>
      <Input
        onChange={({ target }) => setUserName(target.value)}
        label="Name"
        value={userName}
        className="font-semibold"
      />
      {showSubmitButton ? (
        <Button
          type="submit"
          className="w-full shadow-none hover:shadow-none hover:scale-[0.98]"
          color="blue"
          disabled={isPending}
        >
          Submit
        </Button>
      ) : null}
    </form>
  );
}
