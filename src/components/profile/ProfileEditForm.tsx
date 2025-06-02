
import React from 'react';
import { Button } from '@/components/ui/button';

interface ProfileEditFormProps {
  tempUserName: string;
  userBio: string;
  selectedEmoji: string;
  natureEmojis: string[];
  onNameChange: (name: string) => void;
  onBioChange: (bio: string) => void;
  onEmojiSelect: (emoji: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  tempUserName,
  userBio,
  selectedEmoji,
  natureEmojis,
  onNameChange,
  onBioChange,
  onEmojiSelect,
  onSave,
  onCancel
}) => {
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={tempUserName}
        onChange={(e) => onNameChange(e.target.value)}
        className="text-xl font-bold text-center bg-white rounded-2xl px-4 py-2 text-bright-green border-2 border-yellow-accent w-full"
        placeholder="Enter your name"
      />
      <textarea
        value={userBio}
        onChange={(e) => onBioChange(e.target.value)}
        className="w-full text-center bg-white rounded-2xl px-4 py-2 text-bright-green border-2 border-yellow-accent resize-none text-sm"
        rows={2}
      />
      <div className="flex flex-wrap justify-center gap-2 max-w-xs mx-auto">
        {natureEmojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => onEmojiSelect(emoji)}
            className={`text-2xl p-2 rounded-full ${
              selectedEmoji === emoji ? 'bg-yellow-accent scale-125' : 'bg-white'
            }`}
          >
            {emoji}
          </button>
        ))}
      </div>
      <div className="flex space-x-3 justify-center">
        <Button
          onClick={onSave}
          className="bg-yellow-accent text-bright-green font-bold px-6 py-2 rounded-full"
        >
          ✅ Save
        </Button>
        <Button
          onClick={onCancel}
          className="bg-gray-500 text-white font-bold px-6 py-2 rounded-full"
        >
          ❌ Cancel
        </Button>
      </div>
    </div>
  );
};

export default ProfileEditForm;
