const LiveChatAudioAnimation = () => {
  return (
    <div className="liveChatAudioAnimation flex-center max-h-[0.75rem] gap-[0.3rem]">
      {Array.from({ length: 10 }, (_, index) => (
        <span
          key={index}
          className="liveChatAudioAnimation w-0.5 max-w-[2px] rounded-[1px] bg-white"
        />
      ))}
    </div>
  );
};

export default LiveChatAudioAnimation;
