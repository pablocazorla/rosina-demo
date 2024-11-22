const CurrentHourBar = ({ topCurrentHour }) => {
  return topCurrentHour >= 0 ? (
    <div
      className="absolute -left-1 h-[3px] right-0 bg-yellow-400 shadow-[0_0_2px_rgba(0,0,0,1)] opacity-70 pointer-events-none"
      style={{ top: `${topCurrentHour}px` }}
    >
      <div className="absolute -top-[5px] -left-3 h-3 w-3 bg-yellow-400 shadow-[0_0_2px_rgba(0,0,0,1)] rounded-full" />
    </div>
  ) : null;
};

export default CurrentHourBar;
