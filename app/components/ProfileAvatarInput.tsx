import { Avatar } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";

interface ProfileAvatarProps {
  avatar?: string;
  nameInitial: string;
  onChange?(file: File): void;
}

function ProfileAvatarInput({
  avatar,
  nameInitial,
  onChange,
}: ProfileAvatarProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative inline-block">
        {avatar ? (
          <Avatar src={avatar} className="w-28 h-28" />
        ) : (
          <div className="w-28 h-28 flex items-center justify-center rounded-full border-2 border-blue-gray-800 font-semibold text-xl">
            <span>{nameInitial}</span>
          </div>
        )}
        <label
          className="absolute top-2 right-0 rounded-full bg-white"
          htmlFor="avatar"
        >
          <input
            onChange={({ target }) => {
              const { files } = target;
              if (files) onChange && onChange(files[0]);
            }}
            type="file"
            id="avatar"
            hidden
            accept="image/*"
          />
          <PencilIcon className="h-6 w-6 p-1 cursor-pointer" />
        </label>
      </div>
    </div>
  );
}

export default ProfileAvatarInput;
