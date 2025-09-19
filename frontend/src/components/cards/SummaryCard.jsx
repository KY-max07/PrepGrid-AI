import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
    
  return (
    <div
      className="bg-white border border-gray-300/40 rounded-xl p-2 overflow-hidden group"
      onClick={onSelect}
    >
      <div
        className="rounded-lg p-4 cursor-pointer relative"
        style={{ background: colors.bgcolor }}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center">
            <span className="text-lg font-semibold text-black">{ getInitials(role) }</span>
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-[17px] font-medium text-black">{role}</h2>
                <p className="text-xs text-medium text-gray-900">
                  {topicsToFocus}
                </p>
              </div>
              <button
                className="hidden group-hover:flex items-center gap-2 text-xs text-rose-500"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                delete
              </button>
            </div>
            <div className="flex flex-col gap-1 mt-4">
              <div className="text-[10px] font-medium text-black px-3 py-1 border border-gray-300 rounded-md">
                Experience: {experience} {experience === 1 ? "Year" : "Years"}
              </div>
              <div className="text-[10px] font-medium text-black px-3 py-1 border border-gray-300 rounded-md">
                {questions} Q&A
              </div>
              <div className="text-[10px] font-medium text-black px-3 py-1 border border-gray-300 rounded-md">
                Last Updated: {lastUpdated}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 font-medium line-clamp-2 mt-4">
        {description}
      </p>
    </div>
  );
};

export default SummaryCard;
